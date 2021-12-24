import React, {useState, useRef, } from 'react'
import './App.css';
import axios from 'axios';




function App() {
  const value = useRef('')
  const [result, setResult] = useState([]);
  const country = useRef('au')
  
  
    
    const requestData = async () => {
      
      if (value.current !== "")
      
        await axios.get(`http://20.194.41.93:7000/${value.current}/${country.current}`, {
          withCredentials: false,
        })
        .then((res) => {
          const {data} = res;
          setResult(data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  

  return (
    <div className="App">
      <header className="App-header">
       <input
         onChange={
           (e)=> {
             value.current = e.target.value;
             requestData()
            }}
       />
        <ul>
          {result && result.map((res) => (
              <li>
                {res}
              </li>
          ))}
        </ul>
  
        <button onClick={()=> {
          country.current = 'au'
          requestData()
        }}>500</button>
        <button onClick={()=> {
          country.current = 'auca'
          requestData()
        }}>1000</button>
        <button onClick={()=> {
          country.current = 'aucauk'
          requestData()
        }}>1500</button>
        <button onClick={()=> {
          country.current = 'aucaukus'
          requestData()
        }}>2000</button>
      </header>
    </div>
  );
}

export default App;
