import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Transactions from './components/Transactions';


const App = () => {

  const [data, setData] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch('/get_data');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


  useEffect(() => {
    callBackendAPI().then(res => setData(res.express));
  }, [data])



  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h3" component="div" gutterBottom>
          TRANSACTIONS
        </Typography>

      </header>
    
      <Transactions data={data}/>

    </div>
  );
}



export default App;