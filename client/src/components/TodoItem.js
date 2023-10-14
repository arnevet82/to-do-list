import React from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";

const TodoItem = ({ item, deleteTodo, onAddUpdateClick }) => {

  return (
    <Container key={item?.id}>
      <div className={'item'} >{item?.description}</div>
      <br />
      <div className={'item'} >{item?.memo}</div>
      <br />
      <div className={'number-item'} >{item?.priority}</div>
      <Button className='todoBtn' onClick={() => deleteTodo(item)}>delete</Button>
      <Button className='todoBtn' onClick={() => onAddUpdateClick(item, 'update')}>update</Button>

    </Container>
  );
}


const Container = styled.div`

display: flex;
max-width: 800px;
margin: auto;

.item{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 200px;
  margin: auto 20px;
  padding: 25px;
}

.number-item{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 50px;
  margin: auto 20px;
  padding: 25px;
}

.todoBtn{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 150px;
  margin: 20px;
  min-height: 70px;
}

`;



export default TodoItem;