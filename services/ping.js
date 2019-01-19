import http from "http";

setInterval(() => {
  http.get("http://intelligent-problem-solver.herokuapp.com");
}, 3000000); // every 50 minutes (3000000)
