const puppeteer = require("puppeteer");

// Login Function Logic
(async function main() {
  try {
    // Configures puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");

    //delay while loginin
    await delay(29000);

    //Searches person by title
    await page.waitForSelector("._1MXsz");
    await delay(5000);

    //Change to contact you want to send messages to
    const contactName = "Cardo🏀";
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector("._3uMse");

    //Finds the message bar and focuses on it
    //Subject to change, use chrome inspector to reassign this value
    const editor = await page.$("div[data-tab='6']");
    await editor.focus();

    //Amount of messages you want to send
    const amountOfMessages = 50;

    //Loops through cycle of sending message
    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "Whatchu say o.O ";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
      await delay(3000);
    }
  } catch (e) {
    console.error("error mine", e);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}


// $("div[data-tab|='6']")
// This is to use jquery to access the message input box but not in use for this
// project.
