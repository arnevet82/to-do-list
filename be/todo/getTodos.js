async function getAllTodos(todosCol) {

    return await todosCol.find().toArray();
    
}


module.exports = {
    getAllTodos
}