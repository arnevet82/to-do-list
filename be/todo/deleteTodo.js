
async function deleteTodo(todosCol, req, res) {

    const result = await todosCol.deleteOne( {"id":req.body.id});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    if (result.deletedCount) {
        console.log(`deleted ${req.body.id}`, result);
    } else {
        console.log(`No listings found with the name ${req.body.id}`);
    }
    return await todosCol.find().toArray();

}



module.exports = {
    deleteTodo
}