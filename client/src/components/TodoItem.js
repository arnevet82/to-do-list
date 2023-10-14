import React from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import {Draggable } from "react-beautiful-dnd";

const TodoItem = ({ item, index, deleteTodo, onAddUpdateClick }) => {

  return (
    <Container>
    <Draggable key={item.id} draggableId={item.description} index={index}>
    {(provided) => (
        <div className="list-container"  ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}>
           
                <div className={'item'} >{item?.description}</div>
                <br />
                <div className={'item'} >{item?.memo}</div>
                <br />
                <div className={'number-item'} >{item?.priority}</div>
                <Button className='btn' onClick={() => deleteTodo(item)}>delete</Button>
                <Button className='btn' onClick={() => onAddUpdateClick(item, 'update')}>update</Button>

        </div>
    )}
</Draggable>
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
  font-weight: bold;
}

.btn{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 150px;
  margin: 20px;
  min-height: 70px;
  font-size: 12px;
  font-weight: normal;
}

`;



export default TodoItem;