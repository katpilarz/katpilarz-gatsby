import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import gsap from "gsap/dist/gsap"
import * as styles from "./briefForm.module.scss"
import ArrowIcon from "../globalComponents/arrow"
import briefQuestions from "./briefQuestions"
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"

// Netlify picks the form up from the built HTML by this name, and files the
// answers under it. The subject is the subject line of the email it sends.
const FORM_NAME = "project-brief"
const SUBJECT = "New project brief from katarzynapilarz.com.pl"
const CONTACT_EMAIL = "kat.pilarz@proton.me"

// Answers are kept for the tab's lifetime, so a reload or a click away and
// back doesn't cost anyone the brief they were halfway through. Session, not
// local, storage: on a shared computer nothing outlives the tab.
const DRAFT_KEY = "katpilarz-brief-draft"

// The HTML spec's email pattern, the same one the browser checks against.
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const fieldId = (question) => `brief-${question.name}`

const formatStep = (number) => String(number).padStart(2, "0")

const emptyValues = () =>
  briefQuestions.reduce((values, question) => ({ ...values, [question.name]: "" }), {})

function problemWith(question, value) {
  if (!value.trim()) return "Please answer this question to carry on."
  if (question.type === "email" && !EMAIL_RE.test(value.trim()))
    return "That email address doesn't look right. It should look like name@company.com."
  return null
}

function readDraft() {
  try {
    const saved = window.sessionStorage.getItem(DRAFT_KEY)
    return saved ? JSON.parse(saved) : null
  } catch (e) {
    return null
  }
}

function saveDraft(draft) {
  try {
    window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  } catch (e) {}
}

function clearDraft() {
  try {
    window.sessionStorage.removeItem(DRAFT_KEY)
  } catch (e) {}
}

// The header is fixed over the top of the window. When the top of the form
// has gone up under it, or the field being moved to sits below the bottom
// edge, scroll the form back to just under the header. On a wide screen the
// page doesn't scroll, only the form's column on a short window, and a new
// step starts at the top of it.
function bringIntoView(top, target) {
  if (!top) return
  const column = top.closest("[data-brief-column]")
  if (column && column.scrollHeight > column.clientHeight) {
    column.scrollTop = 0
    return
  }
  const header = document.querySelector("nav")
  const clearance = (header ? header.getBoundingClientRect().bottom : 0) + 24
  const start = top.getBoundingClientRect().top
  const end = target ? target.getBoundingClientRect().bottom : start
  if (start >= clearance && end <= window.innerHeight) return
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top: window.scrollY + start - clearance, behavior: reduceMotion ? "auto" : "smooth" })
}

function autoGrow(el) {
  el.style.height = "auto"
  el.style.height = `${el.scrollHeight}px`
}

/**
 * The project brief, one question at a time, then every answer on one list
 * to check before it's sent. Netlify receives it as the "project-brief" form.
 *
 * The list slides in from the right over the photo side, as a full-height
 * panel, in a native <dialog> shown with showModal():
 * it sits above the fixed header, the page behind it can't be reached, and
 * Escape closes it. It scrolls on its own, with Send always in view at the
 * bottom. The dialog is inside the form, so Send submits every field.
 *
 * Every question is in the server-rendered HTML, the ones not being asked
 * just hidden, because that markup is what Netlify reads at deploy to learn
 * the form's fields.
 */
const BriefForm = () => {
  const total = briefQuestions.length

  const [step, setStep] = useState(0)
  const [values, setValues] = useState(emptyValues)
  const [fieldError, setFieldError] = useState(null)
  const [status, setStatus] = useState("idle") // idle | sending | sent | failed
  const [ready, setReady] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  // Set by Edit on the list of answers: the edited question then leads
  // straight back to the list instead of on through the rest.
  const [returnToReview, setReturnToReview] = useState(false)

  const topRef = useRef(null)
  const stepsRef = useRef(null)
  const dialogRef = useRef(null)
  const openReviewRef = useRef(null)
  const reviewHeadingRef = useRef(null)
  const sentHeadingRef = useRef(null)
  const isFirstStep = useRef(true)

  // Set by whatever moved the form on, and read once the new step has
  // rendered. Empty on a render nobody navigated into, so focus is never
  // taken from where the visitor put it.
  const pendingFocus = useRef(false)

  const reviewStep = step === total
  const current = briefQuestions[step]
  const completion = reviewStep ? 100 : ((step + 1) / (total + 1)) * 100

  // Bring back a draft from earlier in this tab. Anything typed before the
  // page came to life is still in the fields, so that is taken as well.
  useEffect(() => {
    const draft = readDraft()
    const typed = {}
    briefQuestions.forEach((question) => {
      const el = document.getElementById(fieldId(question))
      if (el?.value) typed[question.name] = el.value
    })
    setValues((now) => ({ ...now, ...(draft?.values || {}), ...typed }))
    if (draft && Number.isInteger(draft.step)) {
      setStep(Math.max(0, Math.min(total, draft.step)))
    }
    setReady(true)
  }, [total])

  useEffect(() => {
    if (ready && status !== "sent") saveDraft({ values, step })
  }, [ready, values, step, status])

  // A long answer brought back from a draft needs its height set again.
  useEffect(() => {
    if (!current || current.type !== "textarea") return
    const el = document.getElementById(fieldId(current))
    if (el) autoGrow(el)
  }, [current, ready])

  // Before the focus effect below: closing the dialog hands focus back to
  // whatever had it before, and the field being moved to must win.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (reviewOpen && !dialog.open) {
      dialog.showModal()
      dialog.querySelector(`.${styles.reviewBody}`)?.scrollTo(0, 0)
      reviewHeadingRef.current?.focus({ preventScroll: true })
    } else if (!reviewOpen && dialog.open) {
      dialog.close()
    }
  }, [reviewOpen])

  // Nothing behind the list scrolls while it's open, on a phone included.
  useEffect(() => {
    if (!reviewOpen) return
    const root = document.documentElement
    const before = root.style.overflow
    root.style.overflow = "hidden"
    return () => {
      root.style.overflow = before
    }
  }, [reviewOpen])

  useEffect(() => {
    if (!pendingFocus.current) return
    pendingFocus.current = false
    const target = current ? document.getElementById(fieldId(current)) : reviewHeadingRef.current
    bringIntoView(topRef.current, target)
    target?.focus({ preventScroll: true })
  }, [current])

  useEffect(() => {
    if (status !== "sent") return
    bringIntoView(topRef.current)
    sentHeadingRef.current?.focus({ preventScroll: true })
  }, [status])

  // Each new question comes in from below. Not the first one: the page's
  // own entrance brings that in. Opacity, not autoAlpha: autoAlpha starts
  // the step at visibility: hidden, and a hidden field can't take the focus
  // the effect above gives it.
  useIsomorphicLayoutEffect(() => {
    if (isFirstStep.current) {
      isFirstStep.current = false
      return
    }
    if (!stepsRef.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const active = stepsRef.current.querySelector('[data-active="true"]')
    if (!active) return
    const tween = gsap.fromTo(
      active,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", clearProps: "opacity,transform" }
    )
    return () => tween.kill()
  }, [step])

  function updateValue(name, value) {
    setValues((now) => ({ ...now, [name]: value }))
    setFieldError((now) => (now?.name === name ? null : now))
  }

  function goTo(index) {
    setFieldError(null)
    pendingFocus.current = true
    setStep(Math.max(0, Math.min(total, index)))
  }

  function openReview() {
    setReturnToReview(false)
    goTo(total)
    setReviewOpen(true)
  }

  function editAnswer(index) {
    setReturnToReview(true)
    setReviewOpen(false)
    goTo(index)
  }

  function advance(question) {
    const problem = problemWith(question, values[question.name])
    if (problem) {
      setFieldError({ name: question.name, message: problem })
      document.getElementById(fieldId(question))?.focus()
      return
    }
    if (returnToReview || step === total - 1) openReview()
    else goTo(step + 1)
  }

  function handleKeyDown(event, question) {
    if (event.key !== "Enter") return
    // A line break in a long answer is Enter; moving on from one is
    // Ctrl or Cmd with Enter.
    if (question.type === "textarea" && !(event.metaKey || event.ctrlKey)) return
    event.preventDefault()
    advance(question)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (status === "sending") return

    // An answer can only be emptied from its own step, but check them all
    // before sending and go back to the first one that needs attention.
    const unanswered = briefQuestions.findIndex((question) => problemWith(question, values[question.name]))
    if (unanswered >= 0) {
      const question = briefQuestions[unanswered]
      setReviewOpen(false)
      setReturnToReview(true)
      goTo(unanswered)
      setFieldError({ name: question.name, message: problemWith(question, values[question.name]) })
      return
    }

    setStatus("sending")
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(event.currentTarget)).toString(),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Netlify answered ${response.status}`)
        clearDraft()
        setReviewOpen(false)
        setStatus("sent")
      })
      .catch(() => setStatus("failed"))
  }

  if (status === "sent") {
    return (
      <div ref={topRef} className={styles.sent}>
        <p className={`${styles.label} text-uppercase`}>Brief sent</p>
        <h2 ref={sentHeadingRef} tabIndex={-1} className={styles.question}>
          Thank you, your brief is with me.
        </h2>
        <p className={styles.sentText}>
          I'll read it and reply to <strong>{values.email.trim()}</strong>.
        </p>
        <div className={styles.sentLinks}>
          <Link className={`${styles.action} text-uppercase`} to="/">
            Back to home
            <ArrowIcon arrowIconClass="linkIcon" />
          </Link>
          <Link className={`${styles.action} text-uppercase`} to="/projects/">
            See my work
            <ArrowIcon arrowIconClass="linkIcon" />
          </Link>
        </div>
      </div>
    )
  }

  const sendButton = (
    <button
      type="submit"
      className={`${styles.primary} text-uppercase`}
      disabled={status === "sending"}
    >
      {status === "sending" ? "Sending" : "Send brief"}
      <ArrowIcon arrowIconClass="linkIcon" />
    </button>
  )

  return (
    <form
      name={FORM_NAME}
      method="POST"
      action="/brief/"
      data-netlify="true"
      netlify-honeypot="bot-field"
      noValidate
      onSubmit={handleSubmit}
      ref={topRef}
      className={styles.form}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="subject" value={SUBJECT} />
      <p className={styles.honeypot} aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {/* The number on screen is in each step; this says it to a screen
          reader as the step changes. */}
      <p className={styles.srOnly} aria-live="polite">
        {reviewStep ? "Final check" : `Question ${step + 1} of ${total}`}
      </p>
      <div className={styles.progress}>
        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressFill} style={{ transform: `scaleX(${completion / 100})` }} />
        </div>
      </div>

      <div ref={stepsRef}>
        {briefQuestions.map((question, index) => {
          const id = fieldId(question)
          const isCurrent = step === index
          const error = fieldError?.name === question.name ? fieldError.message : null
          const describedBy =
            [question.hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined
          const shared = {
            id,
            name: question.name,
            required: true,
            "aria-invalid": Boolean(error),
            "aria-describedby": describedBy,
            placeholder: question.placeholder,
            value: values[question.name],
            onKeyDown: (event) => handleKeyDown(event, question),
            className: styles.field,
          }

          return (
            <div key={question.name} hidden={!isCurrent} data-active={isCurrent} className={styles.step}>
              <p className={styles.count} aria-hidden="true">
                <span className={`${styles.countNumber} text-color`}>{formatStep(index + 1)}</span>
                <span className={styles.countTotal}>/ {formatStep(total)}</span>
              </p>
              <label htmlFor={id} className={styles.question}>
                {question.label}
              </label>
              {question.hint && (
                <p id={`${id}-hint`} className={styles.hint}>
                  {question.hint}
                </p>
              )}
              {question.type === "textarea" ? (
                <textarea
                  {...shared}
                  rows={2}
                  onChange={(event) => {
                    autoGrow(event.currentTarget)
                    updateValue(question.name, event.target.value)
                  }}
                />
              ) : (
                <input
                  {...shared}
                  type={question.type}
                  autoComplete={question.autoComplete}
                  onChange={(event) => updateValue(question.name, event.target.value)}
                />
              )}
              {error && (
                <p id={`${id}-error`} role="alert" className={styles.error}>
                  {error}
                </p>
              )}
            </div>
          )
        })}

        {/* What stays on the page once the list is closed. */}
        <div hidden={!reviewStep} data-active={reviewStep} className={styles.step}>
          <p className={`${styles.count} ${styles.countDone}`}>
            <span className={`${styles.label} text-uppercase`}>Final check</span>
          </p>
          <h2 className={styles.question}>That's every question answered.</h2>
          <p className={styles.hint}>
            Look over your answers before you send the brief. You can still change any of them.
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        {step > 0 ? (
          <button type="button" onClick={() => goTo(step - 1)} className={`${styles.action} text-uppercase`}>
            <span className={styles.backIcon}>
              <ArrowIcon arrowIconClass="linkIcon" />
            </span>
            Back
          </button>
        ) : (
          <span />
        )}
        {/* Separate keys, so React swaps the element rather than reusing
            the button that was just clicked. */}
        {reviewStep ? (
          <button
            key="review"
            ref={openReviewRef}
            type="button"
            onClick={() => setReviewOpen(true)}
            className={`${styles.primary} text-uppercase`}
          >
            Review and send
            <ArrowIcon arrowIconClass="linkIcon" />
          </button>
        ) : (
          <button
            key="next"
            type="button"
            onClick={() => advance(current)}
            className={`${styles.primary} text-uppercase`}
          >
            {returnToReview ? "Back to answers" : step === total - 1 ? "Review answers" : "Next"}
            <ArrowIcon arrowIconClass="linkIcon" />
          </button>
        )}
      </div>

      {/* Closed by Close, Escape or a click on the dimmed page; `onClose`
          keeps the state in step whichever it was. */}
      <dialog
        ref={dialogRef}
        className={styles.review}
        aria-labelledby="brief-review-title"
        onClose={() => {
          setReviewOpen(false)
          if (reviewStep) openReviewRef.current?.focus({ preventScroll: true })
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setReviewOpen(false)
        }}
      >
        <div className={styles.reviewPanel}>
          <div className={styles.reviewHead}>
            <div>
              <p className={`${styles.label} text-uppercase`}>Final check</p>
              <h2 id="brief-review-title" ref={reviewHeadingRef} tabIndex={-1} className={styles.question}>
                Check your answers, then send.
              </h2>
            </div>
            <button type="button" className={`${styles.close} text-uppercase`} onClick={() => setReviewOpen(false)}>
              Close
            </button>
          </div>

          <div className={styles.reviewBody}>
            <dl className={styles.answers}>
              {briefQuestions.map((question, index) => (
                <div className={styles.answerRow} key={question.name}>
                  <dt className="text-uppercase">{question.label}</dt>
                  <dd>
                    <span className={styles.answer}>{values[question.name]}</span>
                    <button
                      type="button"
                      className={`${styles.edit} text-uppercase`}
                      onClick={() => editAnswer(index)}
                      aria-label={`Edit your answer to: ${question.label}`}
                    >
                      Edit
                    </button>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.reviewFoot}>
            {status === "failed" && (
              <p role="alert" className={`${styles.error} ${styles.sendError}`}>
                The brief didn't send. Please try again, or email your answers to{" "}
                <a href={`mailto:${CONTACT_EMAIL}?subject=Project brief`}>{CONTACT_EMAIL}</a>.
              </p>
            )}
            {sendButton}
          </div>
        </div>
      </dialog>
    </form>
  )
}

export default BriefForm
