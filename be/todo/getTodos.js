async function getAllTodos(todosCol) {

    const result = await todosCol.find().toArray();

    return result;
    
    
}


module.exports = {
    getAllTodos
}