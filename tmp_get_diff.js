const { execSync } = require('child_process');
try {
  const result = execSync('git diff --name-status 925e350cf87dcefec50f06390573be1eaa50cab0 8a4351392b6f1640dbe6e63ca0fc752836bdfdb3', { encoding: 'utf8' });
  console.log("GIT DIFF RESULTS:");
  console.log(result);
} catch (e) {
  console.error("Error running git diff: " + e.message);
}
