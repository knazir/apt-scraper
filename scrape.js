const puppeteer = require("puppeteer");

async function scrapeFloorplanData(url) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    
    // const availabilityTable = 
    
    const prices = await page.$$eval("td", cells => {
        return cells.map(cell => cell.innerText.trim())
                    .filter(text => text.startsWith("$"))
                    .map(priceText => parseFloat(priceText.replace("$", "").replace(",", "")));
    });
    
    
    return prices;
}

async function scrape(url) {
    const prices = await scrapeFloorplanData(url);
    console.log(prices);
}

scrape("https://www.shoresmdr.com/floorplans/del-rey-2a");