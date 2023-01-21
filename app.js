const express = require('express');
const Calculator = require('./calculate');

const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/calculate', async (request, response) => {
  try {
    const num1 = request.query?.num1 ?? 4;
    const num2 = request.query?.num2 ?? 6;

    const data = await Calculator.calculate(num1, num2);
    console.log(num1, num2, data);
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({
      message: 'Server error occurred',
    });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
