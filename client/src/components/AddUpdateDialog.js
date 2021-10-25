import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const AddUpdateDialog = ({ open, setOpen, item, setItem, type }) => {
  
  const handleChange = async (e) => {
    const {name, value} = e.target;
    let newItem = {...item};
    newItem[name] = value;
    setItem(newItem);
  };


  const handleSave = async () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    const response = await fetch('update_data', requestOptions);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    setOpen(false);

  };


  return (

    <Dialog open={open}>

      <Button className='close-btn' onClick={()=>setOpen(false)}>X</Button>
      <h2 className='title'>{type === 'update'? 'Update Transaction': 'Add Transaction'}</h2>

        <DialogContent>


           {Object.keys(item).map((fieldName, index) => {
              return (

                <>
                  {fieldName !== '_id' && <TextField id={`stage-${index}`}
                    label={fieldName}
                    value={item[fieldName] || ''}
                    variant="outlined"
                    name={fieldName}
                    onChange={(e) => handleChange(e)}
                    className='transaction-text'
                    InputProps={{
                      className: 'transaction-input',
                    }} />}
                </>

              )
            })}


        <Button className='save-btn' onClick={handleSave}>Save changes</Button>

        
        
        </DialogContent>
    </Dialog>
  );
}




export default AddUpdateDialog;