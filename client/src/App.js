import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Button from "@mui/material/Button";

const App = () => {

    const [todos, setTodos] = useState(null);
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [input, setInput] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);


    const onAddUpdateClick = (item, type) => {

        console.log('item', item);
        console.log('type', type);



        switch(type){
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

    const updateInput = (event) => {
        setInput({...input, [event.target.id]: event.target.value});
    }

    const getTodos = async () => {
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

    const updateTodo = async () => {

        const updatedTodo = {
            description: input?.description || selectedItem?.description,
            memo: input?.memo ||selectedItem?.memo,
            priority:input?.priority || selectedItem?.priority,
            id: selectedItem?.id,
            _id: selectedItem?._id,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo)
          };
      
          const response = await fetch('update_todo', requestOptions);
          const body = await response.json();
      
          if (response.status !== 200) {
            throw Error(body.message)
          }
        const newTodos = body.data;
        setTodos(newTodos);
        setIsUpdate(false);
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
        await getTodos();
      }, []);


    return (
        <Wrapper className="App">

            <h1>{'Get Todos'}</h1>

            {
                todos?.length ? todos.map((item) => {
                    return <div key={item?.id}>
                    <div style={{display: 'flex', maxWidth: 700, margin: '20px auto'}} key={item?.id}>
                        <div className={'item'} >{item?.description}</div>
                        <br/>
                        <div className={'item'} >{item?.memo}</div>
                        <br/>
                        <div className={'item'} >{item?.priority}</div>
                        <button onClick={() => deleteTodo(item)} style={{marginLeft: 20}}>delete</button>
                        <button onClick={() => onAddUpdateClick(item, 'update')} style={{marginLeft: 20}}>update</button>

                        </div>
                    </div>
                }) : null
            }

            {(isUpdate || isAdd) ? <div style={{margin: '0 auto', fontWeight: 'bold', textAlign: 'right'}}>
                
                
                <div style={{display: 'flex', width: '33%', margin: '0 auto'}}>

                    <div style={{marginRight: '20%', marginLeft: '50%'}}>
                        <label>Todo:</label>
                    </div>
                    
                    <div>
                        <button style={{ width: 24, margin: 0, padding: 0}} onClick={onCloseClick}>X</button>
                    </div>

                </div>

                
                
                <br/>

                <div style={{marginRight: '42%'}}>
                
                    <label>{`Description:   `}</label>
                    <input type='text' id='description' defaultValue={selectedItem?.description && isUpdate ? selectedItem.description :''} placeholder="description" onChange={(e) => updateInput(e)}/>
                    <br/>
                    <label>{`Urgency:   `}</label>
                    <input type='text' id='memo' defaultValue={selectedItem?.memo && isUpdate ? selectedItem.memo :''} placeholder="memo" onChange={(e) => updateInput(e)}/>
                    <br/>
                    <label>{`Priority:   `}</label>
                    <input type='number' id='priority' defaultValue={selectedItem?.priority && isUpdate ? selectedItem.priority :''} placeholder="priority" onChange={(e) => updateInput(e)}/>
                    <br/>
                
                </div>

                <div style={{width: '100%', textAlign:'center'}}>
                <button onClick={isAdd ? addTodo : updateTodo}>SUBMIT</button>
                </div>
                
            </div>
            : <></>
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