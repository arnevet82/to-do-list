const getTodosApi = async () => {
    const response = await fetch('/get_data');
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message)
    }

    return body;
};


const addTodoApi = async (newTodo) => {

    const options = {
        method: 'POST',
        body: JSON.stringify({ todo: newTodo }),
        headers: { 'Content-type': 'application/json' }
    }

    const response = await fetch('/add_todo', options);
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message)
    }

    return body;
};


const updateTodoApi = async (updatedTodo) => {

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

    return body;
}



const deleteTodoApi = async (id) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
    };

    const response = await fetch('delete_todo', requestOptions);
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message)
    }

    return body;
}

module.exports = {getTodosApi, addTodoApi, updateTodoApi, deleteTodoApi};
