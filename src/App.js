import { useState } from "react";
import axios from "axios";
import "./App.css"


// API Key: 3cf007f922dc6a2ffe6bf5d1e049531f2f6294a2     Example:https://fightingtomatoes.com/API/{api-key}/any/any/Conor McGregor
function App() {
  const [inputValue, setInputValue] = useState('');
  const [recordInfo, setRecordInfo] = useState([]); 
  const [namesAndPhotos, setNamesAndPhotos] = useState([]);



  const handleButtonClick = async () => {
    console.log(inputValue);
    var res = await axios.post('http://localhost:5000/submitData', {inputValue});
    var recordInfo = res.data.var1;
    var axLink = res.data.var2;
    var namesAndPhotos = res.data.var3;
    console.log(recordInfo);
    // console.log(axLink);
    console.log(namesAndPhotos);
    setRecordInfo(recordInfo);
    setNamesAndPhotos(namesAndPhotos);
    console.log(findPicture(namesAndPhotos,"Jim Miller"));
    
  };
  // const test = () => {
  //   const testJson = [{"date":"2022-05-22",
  //   "promotion":"UFC",
  //   "event":"271",
  //   "main_or_prelim":"Main",
  //   "card_placement":1,
  //   "fighter_1":"Israel Adesanya",
  //   "fighter_2":"Robert Whittaker",
  //   "rematch":2,
  //   "winner":"Israel Adesanya",
  //   "method":"Decision",
  //   "round":5,
  //   "time":"5:00",
  //   "fighting_tomatoes_aggregate_rating":62,
  //   "fighting_tomatoes_number_ratings":19}]
  
  //   setRecordInfo(testJson);
  //   console.log(testJson)
  // }

  const findPicture = (list, esm) => {
    for(let i = 0; i < list.length; i++){
      if(typeof(list[i].ax) != 'undefined'){
        if(list[i].name.toLowerCase() == esm.toLowerCase()){
          return list[i].ax;
        }
      }

    }
    return "https://staticg.sportskeeda.com/editor/2023/03/5acd8-16801904000804-1920.jpg"
  }

  return (
    <div className="App">
      <div className="input-container">
      <input className="inp" value= {inputValue} placeholder="Conor Mcgregor" onChange={(e) => setInputValue(e.target.value)}/>
      
      <button className="dokme" name="submit" onClick={handleButtonClick}> submit </button>
      </div>
      <div className="card">
        {recordInfo.map((item, index) => (
          <div className="info" key={index}>
            <p className="Date" >Date: {item.date}</p>
            <p>Event: UFC {item.event}</p>
            <p>Winner: {item.winner}</p>
            <p>fighter 1: {item.fighter_1}</p>
            <p>fighter 2: {item.fighter_2}</p>
            <p>Method: {item.method}</p>
            <p>Round: {item.round}</p>
            {/* <img className="ax1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/UFC_logo.svg/2560px-UFC_logo.svg.png"/>
            <img className="ax2" src="https://staticg.sportskeeda.com/editor/2023/03/5acd8-16801904000804-1920.jpg"/> */}
            <img className="ax1" src={findPicture(namesAndPhotos, item.fighter_1)}/>
           
            <img className="ax2" src={findPicture(namesAndPhotos, item.fighter_2)}/>
          </div>
        ))}

      </div>
    </div>

  );
}

export default App;
