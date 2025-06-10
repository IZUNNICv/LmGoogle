const { Builder, By } = require("selenium-webdriver");
require("chromedriver");

async function eseguiSelenium(mp3Path) {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Apri il sito desiderato
    await driver.get("https://tuo-sito.com/upload");

    // Carica il file MP3 (modifica il selettore secondo il tuo sito)
    const uploadInput = await driver.findElement(By.css('input[type="file"]'));
    await uploadInput.sendKeys(mp3Path);

    // Esegui altre azioni se necessario...

    // Attendi qualche secondo per sicurezza
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
}

module.exports = { eseguiSelenium };
