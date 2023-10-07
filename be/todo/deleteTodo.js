

// async function deleteTodo(req, res, todosCol) {

//     console.log('req.query: ', req.query)

//     const id = parseInt(req.query.id);
//     console.log('id: ', id)

//     const result = await todosCol.deleteOne( {id: id});


//     console.log('result: ', result)
//     return await todosCol.find().toArray();
// }


async function deleteTodo(todosCol, req, res) {

    const result = await todosCol.deleteOne( {"id":req.body.id});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    if (result.deletedCount) {
        console.log(`deleted ${req.body.id}`, result);
        return await todosCol.find().toArray();
    } else {
        console.log(`No listings found with the name ${req.body.id}`);
        return await todosCol.find().toArray();
    }

}



module.exports = {
    deleteTodo
}