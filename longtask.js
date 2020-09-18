const puppeteer = require('puppeteer');
(async function() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const client = await page.target().createCDPSession();
  await client.send( 'Emulation.setCPUThrottlingRate', { rate: parseInt(process.env.THROTTLE) } );

  await page.evaluateOnNewDocument(() => {
    let lt = window.__bt_longtask = {e:[]};
    lt.o = new PerformanceObserver(function(a) {
      lt.e=lt.e.concat(a.getEntries());
    });
    lt.o.observe({entryTypes:['longtask']});
  });
  await page.goto('https://nytimes.com');
  const longTasks = await page.evaluate(() => window.__bt_longtask.e.map(entry => [entry.name, entry.duration]));
  console.log("Long tasks", longTasks);
  browser.close();
})();
