import React from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";

const AddUpdateForm = ({ selectedItem, addTodo, updateTodo, input, setInput, isUpdate, onCloseClick }) => {


  const updateInput = (event) => {
    setInput({ ...input, [event.target.id]: event.target.value });
  }


  return (
    <Container>

      <div style={{ display: 'flex', width: '33%', margin: '0 auto' }}>

        <div style={{ marginRight: '20%', marginLeft: '50%' }}>
          <label>Todo:</label>
        </div>

        <div>
          <button style={{ width: 24, margin: 0, padding: 0 }} onClick={onCloseClick}>X</button>
        </div>

      </div>

      <br />

      <div style={{ marginRight: '42%' }}>

        <label>{`Description:   `}</label>
        <input type='text' id='description' defaultValue={selectedItem?.description && isUpdate ? selectedItem.description : ''} placeholder="description" onChange={(e) => updateInput(e)} />
        <br />
        <label>{`Urgency:   `}</label>
        <input type='text' id='memo' defaultValue={selectedItem?.memo && isUpdate ? selectedItem.memo : ''} placeholder="memo" onChange={(e) => updateInput(e)} />
        <br />
        <label>{`Priority:   `}</label>
        <input type='number' id='priority' defaultValue={selectedItem?.priority && isUpdate ? selectedItem.priority : ''} placeholder="priority" onChange={(e) => updateInput(e)} />
        <br />
      </div>

      <div style={{ width: '100%', textAlign: 'center' }}>
        <Button onClick={isUpdate ? updateTodo : addTodo}>SUBMIT</Button>
      </div>

    </Container>
  );
}



const Container = styled.div`

margin: 0 auto;
font-weight: bold;
text-align: right;

input{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 200px;
  margin: 10px auto;
  padding: 10px;
}

button{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 100px;
  margin: 20px auto;
  padding: 10px;
}


`;


export default AddUpdateForm;