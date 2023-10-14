async function getAllTodos(todosCol) {

    return await todosCol.find().sort({updatedAt: -1}).toArray();
    
}


module.exports = {
    getAllTodos
}