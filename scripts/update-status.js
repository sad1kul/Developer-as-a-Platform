const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Get the date/time. If in CI, use current time. If local, can also use current time.
const date = new Date();
const formattedDate = date.toLocaleString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
});

const dataPath = path.join(__dirname, '../src/app/core/data/portfolio.data.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Replace the SYSTEM_STATUS object in portfolio.data.ts
const systemStatusRegex = /export const SYSTEM_STATUS: SystemStatusInfo = {[\s\S]*?};/;
const newSystemStatus = `export const SYSTEM_STATUS: SystemStatusInfo = {
  live: 'Live: sadikul.me',
  lastUpdated: 'Last updated: ${formattedDate}',
  version: 'Version: v${version}'
};`;

dataContent = dataContent.replace(systemStatusRegex, newSystemStatus);

fs.writeFileSync(dataPath, dataContent);
console.log(`Updated System Status to version v${version} and time ${formattedDate}`);
