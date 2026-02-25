const http = require('http');

http.get('http://localhost:3000/notes', res => {
  if(res.statusCode === 200) {
    console.log("Test Passed: App running");
    process.exit(0);
  } else {
    console.error("Test Failed");
    process.exit(1);
  }
}).on('error', err => {
  console.error("Test Failed:", err.message);
  process.exit(1);
});