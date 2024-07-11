const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const { response } = require('express');

// Enable CORS for all routes

// express server we're gonna have end point that takes the name that's where we call the api and then you're express server is gonna return it to front-end for react 





async function getPicture(text) {

  try {
    const url = "https://www.ufc.com/athlete/"
    const urlToSearch = url + text;
    const response = await axios(urlToSearch);
    const html = response.data;
    const $ = cheerio.load(html);
    const ko = $('.hero-profile__image-wrap', html).find('img').attr('src');
    // console.log(ko);
    return ko;
  } catch (error) {
    console.error('Error in getPicture:', error);
    return null; // or handle the error as needed
  }
  }


async function traverse(jObject, mainFighter) {
  const fightersAndPhotos = [];
  mainFighterWithDash = mainFighter.replace(" ", "-");
  var mainFighterPic = await getPicture(mainFighterWithDash);
  var obj = {
    name: mainFighter,
    ax: mainFighterPic
  }
  console.log(obj.name)
  console.log(obj.ax)
  console.log("first one")
  fightersAndPhotos.push(obj)

  for (let i = 0; i < jObject.length; i++) {
    var event = jObject[i];
    var name = ""
    console.log(typeof(event.fighter_1))
    if(event.fighter_1.toLowerCase() == mainFighter.toLowerCase()){
      name = event.fighter_2;
    }
    else {
      name = event.fighter_1
    }
    var ax = await getPicture(name.replace(" ", "-"));
    if (typeof ax === "undefined") {
      ax = "./nopic.jpg";
    }
    console.log(name)
    console.log(ax)
    fightersAndPhotos.push({
      name,
      ax
    })
  }

  return fightersAndPhotos
}
async function fetchData(text) {
    const url = 'https://fightingtomatoes.com/API/3cf007f922dc6a2ffe6bf5d1e049531f2f6294a2/any/any/' + text;

    try {
        const response = await axios.get(url);
        all = String(response.data);
        const startIndex = all.indexOf("[");
        const endIndex = all.indexOf("]");
        const extractedText = all.substring(startIndex, endIndex+1);
        var jsonObject = JSON.parse(extractedText);
        return jsonObject;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


const app = express();
const port = 5000;
app.use(cors());

app.use(bodyParser.json());

app.post('/submitData', async (req, res) => {

  const inputData = req.body.inputValue;
  console.log('Received input data:', inputData);
  let result = inputData.replace(" ", "%20");
  let result2 = inputData.replace(" ", "-");
  var record = await fetchData(result);
  const pic = await getPicture(result2);
  const check = await traverse(record, inputData);
  console.log(check);
  res.send({var1: record, var2 : pic, var3: check});

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});