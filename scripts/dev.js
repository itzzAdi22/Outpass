const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const children = [];
let shuttingDown = false;

function startProcess(name, args, extraEnv = {}) {
  const child = spawn(npmCommand, args, {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, ...extraEnv },
  });

  child.on('exit', (code) => {
    if (!shuttingDown && code !== 0) {
      shuttingDown = true;
      stopAll(code || 1);
    }
  });

  child.on('error', (error) => {
    console.error(`${name} failed to start:`, error.message);
    if (!shuttingDown) {
      shuttingDown = true;
      stopAll(1);
    }
  });

  children.push(child);
  return child;
}

function stopAll(exitCode = 0) {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGINT');
    }
  }

  setTimeout(() => process.exit(exitCode), 300);
}

process.on('SIGINT', () => {
  if (!shuttingDown) {
    shuttingDown = true;
    stopAll(0);
  }
});

process.on('SIGTERM', () => {
  if (!shuttingDown) {
    shuttingDown = true;
    stopAll(0);
  }
});

startProcess('backend', ['run', 'dev:backend']);
startProcess('frontend', ['run', 'dev:frontend']);
