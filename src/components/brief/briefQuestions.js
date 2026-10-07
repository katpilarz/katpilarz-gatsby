/**
 * The brief, one question per step. The same questions as the project brief
 * on paisak4u, so a client is asked the same things on either site.
 *
 * `name` is the field name Netlify stores the answer under. Renaming one
 * starts a new column in the form's submissions, so leave them as they are.
 */
const briefQuestions = [
  {
    name: "name",
    label: "What should I call you?",
    placeholder: "Your name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Which email should I reply to?",
    placeholder: "you@company.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "company",
    label: "Which company or team is this for?",
    placeholder: "Company or team name",
    type: "text",
    autoComplete: "organization",
  },
  {
    name: "project",
    label: "What are we building?",
    hint: "Tell me briefly about the project and what you need designed or built. What are you creating or improving? Is it a new project, a redesign or an existing product, and what stage is it at? What would you like me to be responsible for: UX, UI, frontend development, or the whole process from design to build? Mention any technical, regulatory or business constraints.",
    placeholder: "The project, its stage, my part in it and any constraints",
    type: "textarea",
  },
  {
    name: "outcomes",
    label: "What do you want the project to achieve?",
    hint: "Describe the outcomes you are after, not only the features. For example: more enquiries or sales, a process that is easier or faster, fewer support requests, better conversion, a complex workflow made simpler, a new product launched, an old interface brought up to date, or better accessibility. How will you know the project has worked?",
    placeholder: "What would make this project a success",
    type: "textarea",
  },
  {
    name: "business",
    label: "What does your business do?",
    hint: "Tell me about your company, product or organisation. What do you offer, who do you serve, and what makes you different? Add your mission, positioning, business model or anything else that helps me understand the project.",
    placeholder: "What you offer, who you serve, what sets you apart",
    type: "textarea",
  },
  {
    name: "users",
    label: "Who are we designing for?",
    hint: "Who are the main users, and what are they trying to get done? What problems or frustrations do they run into today? Are there different groups with different needs? Mention anything about accessibility, language, devices, digital confidence or where and how they use it.",
    placeholder: "The people using it, their goals and their frustrations",
    type: "textarea",
  },
  {
    name: "alternatives",
    label: "What alternatives do your users have today?",
    hint: "Who are your main competitors, and what else might your users choose instead? What do those alternatives do well, and where do they fall short? Links help.",
    placeholder: "Competitors and other options, links welcome",
    type: "textarea",
  },
  {
    name: "value",
    label: "What value should the experience create?",
    hint: "Why should someone choose your product, service or organisation? What is the most important thing people should understand or feel after using it? If you have a value proposition, describe it here.",
    placeholder: "The reason to choose you, in your users' words",
    type: "textarea",
  },
  {
    name: "actions",
    label: "What should users do next?",
    hint: "What is the main thing you want people to do: buy, book, get in touch, request a quote, sign up, apply, download something, explore a product, come back regularly? Are there secondary actions that matter too?",
    placeholder: "The main action, and any secondary ones",
    type: "textarea",
  },
  {
    name: "materials",
    label: "What do we already have?",
    hint: "Share anything that should shape the design: brand guidelines, logo and assets, typography, colour palette, an existing design system, photography or video, content and copy, a current website or product, technical documentation, accessibility requirements, analytics or user research, Figma files. Links are welcome.",
    placeholder: "Existing brand, content, research or design material",
    type: "textarea",
  },
  {
    name: "inspiration",
    label: "What do you like, and why?",
    hint: "Give up to three websites or digital products you like and tell me what you like about each. It could be the look, the navigation, the interactions, the typography, how the content is organised, the animation or the overall feel. They don't need to be from your industry.",
    placeholder: "Up to three examples, each with what you like about it",
    type: "textarea",
  },
  {
    name: "context",
    label: "What should I know before we start?",
    hint: "Anything else that could affect the project: deadlines or launch dates, people inside your company who need a say, your current technical setup, who owns the content, integrations, legal or compliance requirements, accessibility standards, languages or markets, decisions already made, or things that must not change.",
    placeholder: "Deadlines, stakeholders, constraints or fixed decisions",
    type: "textarea",
  },
]

export default briefQuestions
