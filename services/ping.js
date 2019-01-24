const https = require('https');

setInterval(() => {
  https.get("https://intelligent-problem-solver.herokuapp.com", 
    () => {
      console.log("Ping");
    })
}, 1200000); // every 50 minutes (3000000)
