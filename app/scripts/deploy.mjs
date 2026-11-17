// Builds the app and copies the result to the repo root so GitHub Pages serves it.
import { execSync } from 'node:child_process'
import { cpSync, rmSync, existsSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const root = resolve(app, '..')
execSync('npm run build', { cwd: app, stdio: 'inherit' })

for (const f of ['style.css', 'script.js', 'index.html']) rmSync(resolve(root, f), { force: true })
rmSync(resolve(root, 'assets'), { recursive: true, force: true })
for (const f of readdirSync(resolve(app, 'dist'))) cpSync(resolve(app, 'dist', f), resolve(root, f), { recursive: true })
writeFileSync(resolve(root, '.nojekyll'), '')
if (!existsSync(resolve(root, '.gitignore'))) writeFileSync(resolve(root, '.gitignore'), 'app/node_modules\napp/dist\n')
console.log('Deployed build to', root)
