import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Button from "@mui/material/Button";

const App = () => {

    const [todos, setTodos] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [input, setInput] = useState('');


    const onAddClick = () => {
        setIsUpdate(true);
    };

    const updateInput = (event) => {
        setInput(event?.target?.value);
    }

    const callTodosApi = async () => {
        const response = await fetch('/get_data');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        setTodos(body.data);

        return body;
    };

    const deleteTodoApi = async (item) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: item.id})
          };
      
          const response = await fetch('delete_data', requestOptions);
          const body = await response.json();
      
          if (response.status !== 200) {
            throw Error(body.message)
          }
        const newTodos = body.data;
        setTodos(newTodos);
    }

    const addTodoApi = async () => {
        let newTodo = {
            description: input,
            memo: 'Urgent',
            priority: 2,
            updatedAt: Date.now(),
        }

        const options = {
            method: 'POST',
            body: JSON.stringify({todo: newTodo}),
            headers: {'Content-type': 'application/json'}
        }

        const response = await fetch('/add_todo', options);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }

        newTodo = body.data;

        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
        setIsUpdate(false);
        return body;
    };

    useEffect(async () => {
        await callTodosApi();
      }, []);


    return (
        <Wrapper className="App">

            <h1>{'Get Todos'}</h1>

            {
                todos?.length ? todos.map((item) => {
                    return <>
                    <div style={{display: 'flex', maxWidth: 400, margin: '20px auto'}} key={item?.id}>
                        <div className={'item'} >{item?.description}</div>
                        <button onClick={() => deleteTodoApi(item)}>delete</button>
                        </div>
                    </>
                }) : null
            }

            {isUpdate && <div style={{marginTop: 50, fontWeight: 'bold'}}>
                <label>Todo:</label>
                <br/>
                <input type='text' id='todo' onChange={(e) => updateInput(e)}/>
                <br/>
                <button onClick={addTodoApi}>SUBMIT</button>
            </div>
}




            <Button className='todoBtn' onClick={callTodosApi}>get todos</Button>
            <Button className='todoBtn' onClick={onAddClick}>add todo</Button>

        </Wrapper>
    );
}


const Wrapper = styled.div`
  text-align: center;
  min-height: 1200px;
  padding-top: 150px;
  
  
  
  .item{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    width: 200px;
    margin: 20px auto;
    padding: 10px;
    
  }

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

  .todoBtn{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    width: 100px;
    margin: 20px;
    min-height: 70px;
  }

`;


export default App;