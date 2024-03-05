const express = require('express');
const { port } = require('./config');
const internsRouter = require('./routes/interns.route');

const app = express();

app.use(express.json());

app.use('/interns', internsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});