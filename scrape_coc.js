
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('businessListing.txt');

// Write Headers
writeStream.write(`Name|Address|City|State|Zip|Phone|Chamber\n`);

request('http://www.edenchamber.com/list/search?q=%5Ba-z%5Di&st=0', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        buildList(body,"Eden");
        console.log('Eden Scraping Done...');
    }
});

request('http://business.reidsvillechamber.org/list/search?q=%5Ba-z%5Di&st=0', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        buildList(body,"Reidsville");
        console.log('Reidsville Scraping Done...');
    }
});

function buildList(body,chamber) {

    const $ = cheerio.load(body);

    $('.mn-listingcontent').each((i, el) => {

        const name = $(el)
            .find(".mn-title")
            .text()
            .replace(/\s\s+/g, '');

        const address = $(el)
            .find(".mn-address1")
            .text()
            .replace(/\s\s+/g, '');

        const city = $(el)
            .find(".mn-cityspan")
            .text()
            .replace(/\s\s+/g, '');

        const state = $(el)
            .find(".mn-stspan")
            .text()
            .replace(/\s\s+/g, '');

        const zip = $(el)
            .find(".mn-zipspan")
            .text()
            .replace(/\s\s+/g, '');

        const phone = $(el)
            .find(".mn-phone")
            .text()
            .replace(/\s\s+/g, '');

        writeStream.write(`${name}|${address}|${city}|${state}|${zip}|${phone}|${chamber}\n`);
    });
}