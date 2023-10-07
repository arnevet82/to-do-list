import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Button from "@mui/material/Button";

const App = () => {

    const [todos, setTodos] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [input, setInput] = useState({});


    const onAddClick = () => {
        setIsUpdate(true);
    };

    const updateInput = (event) => {
        console.log('event.target.id', event.target.id)

        console.log('event.target.value', event.target.value);
        setInput({...input, [event.target.id]: event.target.value});
    }

    const callTodos = async () => {
        const response = await fetch('/get_data');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        setTodos(body.data);

        return body;
    };

    const deleteTodo = async (item) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: item.id})
          };
      
          const response = await fetch('delete_todo', requestOptions);
          const body = await response.json();
      
          if (response.status !== 200) {
            throw Error(body.message)
          }
        const newTodos = body.data;
        setTodos(newTodos);
    }

    const addTodo = async () => {
        let newTodo = {
            description: input.description,
            memo: input.memo,
            priority: input.priority,
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
        await callTodos();
      }, []);

      useEffect(async () => {
        console.log('input', input);

      }, [input]);


    return (
        <Wrapper className="App">

            <h1>{'Get Todos'}</h1>

            {
                todos?.length ? todos.map((item) => {
                    return <>
                    <div style={{display: 'flex', maxWidth: 700, margin: '20px auto'}} key={item?.id}>
                        <div className={'item'} >{item?.description}</div>
                        <br/>
                        <div className={'item'} >{item?.memo}</div>
                        <br/>
                        <div className={'item'} >{item?.priority}</div>
                        <button onClick={() => deleteTodo(item)} style={{marginLeft: 20}}>delete</button>
                        </div>
                    </>
                }) : null
            }

            {isUpdate && <div style={{margin: '0 auto', fontWeight: 'bold', textAlign: 'right'}}>
                
                
                <div style={{display: 'flex', width: '33%', margin: '0 auto'}}>

                    <div style={{marginRight: '20%', marginLeft: '50%'}}>
                        <label>Todo:</label>
                    </div>
                    
                    <div>
                        <button style={{ width: 24, margin: 0, padding: 0}} onClick={ () => setIsUpdate(false)}>X</button>
                    </div>

                </div>

                
                
                <br/>

                <div style={{marginRight: '42%'}}>
                
                    <label>{`Description:   `}</label>
                    <input type='text' id='description' onChange={(e) => updateInput(e)}/>
                    <br/>
                    <label>{`Urgency:   `}</label>
                    <input type='text' id='memo' onChange={(e) => updateInput(e)}/>
                    <br/>
                    <label>{`Priority:   `}</label>
                    <input type='number' id='priority' onChange={(e) => updateInput(e)}/>
                    <br/>
                
                </div>

                <div style={{width: '100%', textAlign:'center'}}>
                <button onClick={addTodo}>SUBMIT</button>
                </div>
                
            </div>
}




            <Button className='todoBtn' onClick={callTodos}>get todos</Button>
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
    margin: 20px 10px;
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