let tasksDao = require("../dao/tasks-dao")

async function getAllTasks() { 
    let allTasks = await tasksDao.getAllTasks();
    console.log(allTasks)
    return allTasks
}
async function addNewTask(newTaskDetails) {
    let currentDate = getCurrentDate()
    newTaskDetails["date"] = currentDate;
    await tasksDao.addNewTask(newTaskDetails)
    let newTaskId = await tasksDao.getNewTaskId(newTaskDetails)
    return {id:newTaskId.id,date:currentDate};
}

async function editTask(newTaskDetails) {
    await tasksDao.editTask(newTaskDetails)
}
async function deleteTaskById(taskId) {
    await tasksDao.deleteTaskById(taskId)
}

function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}


module.exports = {
    getAllTasks,
    addNewTask,
    editTask,
    deleteTaskById
}