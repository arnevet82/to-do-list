import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddUpdateDialog from './AddUpdateDialog';


const Transactions = ({data}) => {

  const [item, setItem] = useState({});
  const [type, setType] = useState('add');
  const [open, setOpen] = useState(false);

  
  const onClickUpdate = (item) => {
    setType('update');
    setItem(item);
    setOpen(true);
  };


  const onClickAddItem = () => {
    setType('add');
    setItem({
      customer_id: "",
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      country: "",
      city: "",
      street: "",
      phone: "",
      total_price: "",
      currency: "",
      cerdit_card_type: "",
      cerdit_card_number: ""
    });
    setOpen(true);
  };

  

  const deleteTransaction = async (item) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id: item._id})
    };

    const response = await fetch('delete_data', requestOptions);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
  };



  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  
  return (
    <Container>

      <div className='wrapper'>
        <div className='titles'>
        <div>transaction</div>
            &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; 
        <div>customer id</div>
        </div>
      </div>


        <div className='add-wrapper'>
          <AddIcon onClick={onClickAddItem}/>
          <div className='add-title'>Add new transaction</div>
        </div>

      {data && data.length ? data.map((item, index)=>{
        return (
          <div className='bill'>

          <DeleteIcon onClick={()=>deleteTransaction(item)}/>
                    &nbsp; &nbsp; &nbsp; 
          <EditIcon onClick={()=>onClickUpdate(item)}/>

         <div className='bill-item'> {formatter.format(item.total_price)}</div>

         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 

         <div className='id-item'> {item.customer_id}</div>
        
      </div>

        )

      }): <></>}

      
      <AddUpdateDialog open={open} setOpen={setOpen} item={item} setItem={setItem} type={type}/>
      


    </Container>
  );
}



const Container = styled.div`

.wrapper{
  display: block;
  margin: 30px auto;
  width: 300px;
}

.add-wrapper{
  display: flex;
  width: 320px;
  margin: 0 auto;
  text-align: left;
}

.add-title{
    margin-left: 15px;
    margin-top: 10px;
}

.titles{
  display: flex;
  margin-left: 50px;
  text-align: center;
  font-weight: bold;
}

.bill-item{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  width: 140px;
  height: 40px;
  background-color: #b2dfdb;
  padding-top: 13px;
    padding-right: 6px;
    padding-left: 6px;
    margin-left: 15px;
}

.id-item{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  width: 200px;
  height: 40px;
  background-color: #b2dfdb;
  padding-top: 13px;
    padding-right: 6px;
    padding-left: 6px;
}
  .bill{
    padding-top: 5px;
    width: 400px;
    display: flex;
    margin: 20px auto;
  }

  .css-i4bv87-MuiSvgIcon-root{
    margin-top: 10px;
    cursor: pointer;
  }
 
`;


export default Transactions;