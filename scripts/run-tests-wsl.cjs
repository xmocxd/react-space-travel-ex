/**
 * Run npm test inside WSL. Converts current Windows path to WSL path and runs tests there.
 * Usage: node scripts/run-tests-wsl.cjs
 */
const { execSync } = require('child_process');

const projectDir = process.cwd();
// Convert Windows path to WSL path: C:\Users\... -> /mnt/c/Users/...
const wslPath = projectDir
  .replace(/^([A-Za-z]):/, (_, letter) => `/mnt/${letter.toLowerCase()}`)
  .replace(/\\/g, '/');

const cmd = `wsl -e bash -c "cd '${wslPath}' && npm run test"`;
execSync(cmd, { stdio: 'inherit' });
