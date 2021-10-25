const ObjectId = require('mongodb').ObjectID;

module.exports = {
    getTransactionsData,
    updateTransactionData,
    deleteTransaction
}



async function getTransactionsData(collection, req, res) {

    const result = await collection.find().sort({_id:-1}).limit(50).toArray();

    if (result) {
        res.send({ express: result});
    } else {
        console.log(`No listings found`);
        res.send({ express: 'Oops' });
    }
  }


  async function updateTransactionData( collection, req, res) {

    let updateObj = {
        ...req.body,
    }
    delete updateObj._id;

    const result = await collection.updateOne({ customer_id: updateObj.customer_id }, 
        { $set: updateObj}, { upsert: true });
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);

    if (result) {
        
        console.log(`updated ${req.body.customer_id}`, result);
        res.send({ express: result.matchedCount });
    } else {
        console.log(`No listings found with customer_id ${updateObj.customer_id}`);
        res.send({ express: 'Oops' });
    }

  }




  async function deleteTransaction(collection, req, res) {

    const result = await collection.deleteOne( {"_id": ObjectId(req.body.id)});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    if (result.deletedCount) {
        console.log(`deleted ${req.body.id}`, result);
        res.send({ express: result.matchedCount });
    } else {
        console.log(`No listings found with the name ${req.body.id}`);
          res.send({ express: 'Oops' });
    }

}


