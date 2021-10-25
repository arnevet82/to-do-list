const {getTransactionsData, updateTransactionData, deleteTransaction} = require('./be/getData');
const express = require('express'); 
const { MongoClient } = require('mongodb');
const app = express(); 
const port = process.env.PORT || 5000;
let userCollection;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


MongoClient.connect('mongodb+srv://natalie:d4d4d4d4@cluster0.9pp9b.mongodb.net/billing?retryWrites=true&w=majority', function (err, client) {
  
  if (err) throw err;

  const db = client.db('billing');
  collection = db.collection('customersAndTransactions');
  
  app.listen(port, () => console.log(`Listening on port ${port}`));

})




// get data
 app.get('/get_data', async (req, res) => { 
  await getTransactionsData(collection, req, res);
}); 

// update data
app.post('/update_data', async (req, res) => { 
  await updateTransactionData(collection, req, res);
}); 

// delete data
app.post('/delete_data', async (req, res) => { 
  await deleteTransaction(collection, req, res);
});

