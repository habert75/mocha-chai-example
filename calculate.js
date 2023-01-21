const { Builder, By } = require("selenium-webdriver");

let driver;

const USERNAME = process.env.LT_USERNAME ?? "";
const KEY = process.env.LT_ACCESS_KEY ?? "";

const GRID_HOST = "hub.lambdatest.com/wd/hub";

const searchCapabilities = {
  browserName: "Chrome",
  browserVersion: "107.0",
  "LT:Options": {
    username: USERNAME,
    accessKey: KEY,
    geoLocation: "US",
    platformName: "Windows 10",
    build: "calculate",
    project: "Calculate",
    w3c: true,
    plugin: "node_js-node_js",
  },
};

const searchGridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

async function calculateWithLambdaTest(num1 = 5, num2 = 5) {
  try {
    driver = await new Builder()
      .usingServer(searchGridUrl)
      .withCapabilities(searchCapabilities)
      .build();

    await driver.get(
      "https://www.lambdatest.com/selenium-playground/simple-form-demo"
    );

    const inputSum1 = await driver.findElement(By.id("sum1"));
    const inputSum2 = await driver.findElement(By.id("sum2"));
    const button = await driver.findElement(
      By.xpath(
        "/html/body/div[1]/div/section[3]/div/div/div[2]/div[2]/div[2]/div/div[1]/form/button"
      )
    );

    inputSum1.sendKeys(num1);
    inputSum2.sendKeys(num2);

    button.click();

    const result = await driver.findElement(By.id("addmessage"));

    return await result.getText();
  } catch (error) {
    throw new Error(error);
  } finally {
    await driver.quit();
  }
}

module.exports = {
  calculate: calculateWithLambdaTest,
};
