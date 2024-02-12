const express = require('express');
const app = express();

const requestCounts = new Map();

function rateLimitMiddleware(req, res, next) {
  const { ip } = req;
  const maxRequestsPerMinute = 3;

  if (requestCounts.has(ip)) {
    const currentTimestamp = Date.now();
    const { timestamp, count } = requestCounts.get(ip);

    if (currentTimestamp - timestamp > 60000) {
      requestCounts.set(ip, { timestamp: currentTimestamp, count: 1 });
      next();
    } else {
      if (count >= maxRequestsPerMinute) {
        res.status(429).send('Too Many Requests');
      } else {
        requestCounts.set(ip, { timestamp, count: count + 1 });
        next();
      }
    }
  } else {
    requestCounts.set(ip, { timestamp: Date.now(), count: 1 });
    next();
  }
}

app.use(rateLimitMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
