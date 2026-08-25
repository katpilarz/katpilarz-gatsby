const {parse} = require('@babel/parser')
const traverse = require('@babel/traverse').default
const fs = require('fs'), path = require('path')
const files = []
;(function walk(d){ let ents; try { ents = fs.readdirSync(d,{withFileTypes:true}) } catch { return }
  for (const f of ents) { const p = path.join(d,f.name)
    if (f.isDirectory()) { walk(p) }
    else if (/\.(js|jsx|mjs|ts|tsx)$/.test(f.name)) files.push(p) }
})(process.argv[2])

const HOOKS = new Set(['useEffect','useLayoutEffect','useInsertionEffect','useIsomorphicLayoutEffect'])
const SAFE = new Set(['ArrowFunctionExpression','FunctionExpression'])
let n = 0, failed = 0
for (const file of files) {
  const code = fs.readFileSync(file,'utf8')
  if (!/use(Layout|Insertion|Isomorphic\w*)?Effect\s*\(/.test(code)) continue
  let ast
  try { ast = parse(code,{sourceType:'unambiguous',plugins:['jsx','typescript','classProperties','optionalChaining','nullishCoalescingOperator','dynamicImport']}) }
  catch (e) { failed++; console.log(`  [parse-fail] ${file}: ${e.message.slice(0,60)}`); continue }
  traverse(ast, { CallExpression(p) {
    const c = p.node.callee, name = c.name || (c.property && c.property.name)
    if (!HOOKS.has(name)) return
    const cb = p.node.arguments[0]
    if (!cb || !['ArrowFunctionExpression','FunctionExpression'].includes(cb.type)) return
    const say = (node,t) => { console.log(`  >>> ${file}:${node.loc.start.line} ${t}`); n++ }
    if (cb.async) return say(p.node, 'ASYNC effect')
    if (cb.body.type !== 'BlockStatement') {
      if (!SAFE.has(cb.body.type)) say(cb.body, `implicit ${cb.body.type}: ${code.slice(cb.body.start,cb.body.end).slice(0,70)}`)
      return
    }
    p.get('arguments.0').traverse({ ReturnStatement(rp) {
      if (rp.getFunctionParent().node !== cb) return
      const a = rp.node.argument
      if (!a || (a.type==='Identifier' && a.name==='undefined') || SAFE.has(a.type)) return
      say(a, `returns ${a.type}: ${code.slice(a.start,a.end).slice(0,70)}`)
    }})
  }})
}
console.log(`  -- ${n} finding(s), ${failed} parse failure(s), ${files.length} files walked`)
