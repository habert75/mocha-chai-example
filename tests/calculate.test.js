const assert = require('assert');
const request = require('request');

let url;
beforeEach(async () => {
  url = 'http://localhost:3002/calculate';
});

describe('Search', () => {
  it('calculate the sum of two values', async () => {
    request(url, function (error, response, body) {
      assert.equal(response.statusCode, 200);
      assert.equal(body[0], 9);
      done();
    });
  });

  it('calculate the wrong sum of two values', async () => {
    request(url + '?num1=5&num2=6', function (error, response, body) {
      console.log(body[0]);
      assert.equal(response.statusCode, 200);
      assert.not.equal(body[0], 9);
      done();
    });
  });
});
