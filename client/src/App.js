import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Button from "@mui/material/Button";
import AddUpdateForm from './components/AddUpdateForm';
import TodoItem from './components/TodoItem';
import {getTodosApi, addTodoApi, deleteTodoApi, updateTodoApi} from './services/data-services';

const App = () => {

    const [todos, setTodos] = useState(null);
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [input, setInput] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);


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

    useEffect(async () => {
        await getTodos();
    }, []);


    return (
        <Wrapper>

            <h1>{'Get Todos'}</h1>

            {
                todos?.length ? todos.map((item) => {
                    return <div key={item?.id}>
                        <TodoItem
                            item={item}
                            deleteTodo={deleteTodo}
                            onAddUpdateClick={onAddUpdateClick}
                        />
                    </div>
                }) : null
            }

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
  
  .todoBtn{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    width: 100px;
    margin: 20px;
    min-height: 70px;
  }

`;


export default App;