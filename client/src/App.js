import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Button from "@mui/material/Button";
import AddUpdateForm from './components/AddUpdateForm';
import TodoItem from './components/TodoItem';
import { getTodosApi, addTodoApi, deleteTodoApi, updateTodoApi } from './services/data-services';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {

    const [todos, setTodos] = useState(null);
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [input, setInput] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);

    const defaultList = ["A", "B", "C", "D", "E"];


    const getTodos = async () => {
        const response = await getTodosApi();
        setTodos(response.data);
    };


    const addTodo = async () => {
        const newTodo = {
            description: input.description,
            memo: input.memo,
            priority: input.priority,
        }

        const response = await addTodoApi(newTodo);

        setTodos(current => [response.data, ...current]);
        setIsAdd(false);
    };


    const updateTodo = async () => {

        const updatedTodo = {
            description: input?.description || selectedItem?.description,
            memo: input?.memo || selectedItem?.memo,
            priority: input?.priority || selectedItem?.priority,
            id: selectedItem?.id,
            _id: selectedItem?._id,
        }

        const response = await updateTodoApi(updatedTodo);

        const newTodos = todos.map(todo => {
            if (todo.id === selectedItem?.id) {
                return response.data;
            }
            return todo;
        }).sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

        setTodos(newTodos);
        setIsUpdate(false);
    }


    const deleteTodo = async (item) => {
        await deleteTodoApi(item.id);
        const newTodos = todos.filter(todo => todo.id !== item.id);
        setTodos(newTodos);
    }


    const onAddUpdateClick = (item, type) => {
        switch (type) {
            case 'update':
                setSelectedItem(item);
                setIsUpdate(true);
                setIsAdd(false);
                break;
            case 'add':
                setIsAdd(true);
                setIsUpdate(false);
                break;
        }

    };


    const onCloseClick = () => {
        setIsAdd(false);
        setIsUpdate(false);
    }


    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;
        var updatedList = [...todos];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setTodos(updatedList);
        updateTodoApi(reorderedItem, droppedItem.destination.index);
    };


    useEffect(async () => {
        await getTodos();
    }, []);


    return (

        <Wrapper>
             <h1>{'My Todos'}</h1>

            {todos?.length ? <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId='list-container'>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {todos.map((item, index) => (
                                <TodoItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    deleteTodo={deleteTodo}
                                    onAddUpdateClick={onAddUpdateClick}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext> : null}

            {(isUpdate || isAdd) &&
                <AddUpdateForm
                    selectedItem={selectedItem}
                    addTodo={addTodo}
                    updateTodo={updateTodo}
                    input={input}
                    setInput={setInput}
                    isUpdate={isUpdate}
                    isAdd={isAdd}
                    onCloseClick={onCloseClick} />
            }

            <Button className='todoBtn' onClick={getTodos}>get todos</Button>
            <Button className='todoBtn' onClick={() => onAddUpdateClick(null, 'add')}>add todo</Button>
            
        </Wrapper>     

    );
}


const Wrapper = styled.div`
  text-align: center;
  min-height: 1200px;
  padding-top: 150px;

  .list-container{
    display: flex;
    max-width: 800px;
    margin: auto;
  }
  
  .todoBtn{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    width: 150px;
    margin: 20px;
    min-height: 70px;
    font-weight: bold;
  }

`;


export default App;