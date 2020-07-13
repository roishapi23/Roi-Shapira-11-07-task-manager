let connection = require("./connection");

async function getAllTasks() { 
    let sql = "select * from tasks";
    let tasks = await connection.execute(sql);
    console.log(tasks)
    return tasks
}

async function addNewTask(newTaskDetails) {
    
    console.log("details is "+newTaskDetails)
    let sql = "INSERT INTO tasks (taskName, phone, email, userName, date, taskDescription) VALUES (?, ?, ?, ?, ?, ?)";
    let parameters = [newTaskDetails.taskName, newTaskDetails.phone, newTaskDetails.email,newTaskDetails.userName, newTaskDetails.date, newTaskDetails.taskDescription]
    await connection.executeWithParameters(sql,parameters);
}
async function editTask(newTaskDetails) {    
    console.log("details is "+newTaskDetails)
    let sql = "UPDATE tasks SET taskName=?, phone=?, email=?, userName=?, taskDescription=? WHERE id=?";
    let parameters = [newTaskDetails.taskName, newTaskDetails.phone, newTaskDetails.email,newTaskDetails.userName, newTaskDetails.taskDescription, newTaskDetails.id]
    await connection.executeWithParameters(sql,parameters);
}


async function getNewTaskId(newTaskDetails) { 
    let sql = "select id from tasks WHERE taskName=? AND userName=? and date=?"
    let parameters = [newTaskDetails.taskName, newTaskDetails.userName, newTaskDetails.date]
    let newTaskId = await connection.executeWithParameters(sql,parameters);
    return newTaskId[0];
}

async function deleteTaskById(taskId) {
    let sql = "DELETE from tasks where id=?";
    let parameters = taskId;
    await connection.executeWithParameters(sql,parameters);
}

module.exports = {
    getAllTasks,
    addNewTask,
    getNewTaskId,
    editTask,
    deleteTaskById
}

