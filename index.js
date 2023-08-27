const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
let i=1;

async function scrape(use) {
    
    const axioResponse = await axios.request({
        method: "GET",
        url: use,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        }
    })
    const $ = cheerio.load(axioResponse.data);
    const data = {};
    
       $('.col-md-4').each((index, element)=>{
           const pname = $(element).find('.title').text();
           const desc = $(element).find('.description').text();
           const price = $(element).find('.price').text();

           const obj = {
            name:pname,
            description:desc,
            price:price
         }
         data[index+1] = obj;
       })
      
        const indJson = JSON.stringify(data,' ',2);
        fs.writeFile(`./data-${i}.txt`,indJson,{encoding:'utf8'},(err)=>{
            if(err) {console.error(err)}
            console.log(`File-${i} is ready!`);
            ++i;
        })
}
scrape("https://webscraper.io/test-sites/e-commerce/allinone");
scrape("https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops");
