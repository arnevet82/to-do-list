const ObjectId = require('mongodb').ObjectId;
const {getAllTodos} = require('./getTodos');
async function updateTodo(todosCol, req) {

    let todo = req.body;

    const newTodo = {
        id: todo.id,
        description: todo.description,
        memo: todo.memo,
        priority: todo.priority,
        updatedAt: (todo?.index) ? await getUpdatedAt(todosCol, todo.index) : new Date()
      };

    await todosCol.updateOne({_id:ObjectId(todo._id)}, {$set: newTodo}, { upsert: true });

    return newTodo;
}

async function getUpdatedAt(todosCol, index){
    const todos = await getAllTodos(todosCol);
    const beforeItem = todos[index];
    return getNextSecond(beforeItem.updatedAt);
}


function getNextSecond(day) {
    let date = new Date(day);
    date.setMilliseconds(date.getMilliseconds() - 10);
    return new Date(date);
};


module.exports = {
    updateTodo
}