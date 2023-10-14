const crypto = require("crypto");

async function addTodo(req, todosCol) {

    let {todo} = req.body;

    const id = crypto.randomBytes(16).toString("hex");
    const updatedAt = new Date();
    todo = { _id: todo._id, id, updatedAt, ...todo };

    await todosCol.insertOne(todo, { upsert: true });
    return todo;
}


module.exports = {
    addTodo
}