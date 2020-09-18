# Overview

This is a simple example of using Puppeteer with CPU throttling. The `longtask.js` script loads
https://nytimes.com in a headless Chromium instance and throttles based on the `THROTTLE`
environment variable, then dumps out all long tasks.

Example usage: `THROTTLE=4 node longtask.js`
