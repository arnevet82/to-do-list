const {getAllTodos} = require('./be/todo/getTodos.js');
const {addTodo} = require('./be/todo/addTodo.js');
const {deleteTodo} = require('./be/todo/deleteTodo.js');

const express = require('express'); 
const { MongoClient } = require('mongodb');
const app = express(); 
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let todosCol;
MongoClient.connect('mongodb+srv://starrnatalie12:0vCbv2tOKk4q4da5@cluster0.5a1zjyz.mongodb.net/?retryWrites=true&w=majority', function (err, client) {
  
  if (err) throw err;

  const db = client.db('todo_list');
  todosCol = db.collection('todos');

  app.listen(port, () => console.log(`Listening on port ${port}`));

})




// get data
 app.get('/get_data', async (req, res) => { 

  try {
    const response = await getAllTodos(todosCol);
    res.status(200).json({data: response, error: null});
  } catch (e) {
    res.status(500).json({data: null, error: e.toString()});
  }

}); 


// add todo
app.post('/add_todo', async (req, res) => {

  try {
      const response = await addTodo(req, todosCol);

      console.log('response: ', response)
      res.status(200).json({data: response, error: null});
  } catch (e) {
      res.status(500).json({data: null, error: e.toString()});
  }
});


// update data
app.post('/update_data', async (req, res) => { 

  try {
    const response = await updateTransactionData(collection, req, res);
    res.status(200).json({data: response, error: null});
  } catch (e) {
    res.status(500).json({data: null, error: e.toString()});
  }

}); 

// delete data
app.post('/delete_data', async (req, res) => { 

  try {
    const response = await deleteTodo(todosCol, req, res);
    res.status(200).json({data: response, error: null});
  } catch (e) {
    res.status(500).json({data: null, error: e.toString()});
  }
});
