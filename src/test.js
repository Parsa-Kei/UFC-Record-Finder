const PORT = 8000;
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const appli = express();
const URL = "https://www.ufc.com/athlete/nariman-abbassov"


axios(URL)
    .then( response  => {
        const html = response.data
        // console.log(html)
        const $ = cheerio.load(html)

        const ko = $('.hero-profile__image-wrap', html).find('img').attr('src')
        console.log(ko)
    })

appli.listen(PORT, () => console.log('server running on port:' + String(PORT)))