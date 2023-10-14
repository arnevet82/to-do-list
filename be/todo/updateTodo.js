const ObjectId = require('mongodb').ObjectId;

async function updateTodo(todosCol, req) {

    let todo = req.body;

    const newTodo = {
        id: todo.id,
        description: todo.description,
        memo: todo.memo,
        priority: todo.priority,
        updatedAt: new Date()
      };

    await todosCol.updateOne({_id:ObjectId(todo._id)}, {$set: newTodo}, { upsert: true });

    return newTodo;
}


module.exports = {
    updateTodo
}