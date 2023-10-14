
async function deleteTodo(todosCol, req) {

    const result = await todosCol.deleteOne({id :req.body.id});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    if (result.deletedCount) {
        return `deleted ${req.body.id}: ${result}`
    } 
    return `No listings found with the name ${req.body.id}`;
}



module.exports = {
    deleteTodo
}