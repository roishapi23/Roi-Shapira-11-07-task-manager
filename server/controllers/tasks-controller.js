let express = require("express");
let router = express.Router();

let tasksLogic = require("../logic/tasks-logic")

router.post("/" , async (request,response) => {
    let newTaskDetails = request.body
    console.log(newTaskDetails);
    try {
        let newTaskIdAndDate = await tasksLogic.addNewTask(newTaskDetails)
        console.log("new Task has been added");
        response.json(newTaskIdAndDate);
    } catch (error) {
        response.json("somthing went wrong at adding new task");
    }
    
})
router.get("/" , async (request,response) => {
    
    try {
        let allTasks = await tasksLogic.getAllTasks()
        response.json(allTasks);
    } catch (error) {
        response.json("somthing went wrong at getting all tasks");
    }
    
})
router.put("/" , async (request,response) => {
    let taskDetails = request.body;
    try {
        await tasksLogic.editTask(taskDetails)
        response.json("task has been changed");
    } catch (error) {
        response.json("somthing went wrong at edit task");
    }
    
})

router.delete("/:taskId", async (request, response) => {
    let taskId = +request.params.taskId;
    
    try {
        await tasksLogic.deleteTaskById(taskId);
        response.json("task has been deleted");
        
    } catch (error) {
        response.json("somthing went wrong at deleting task");
    }
})


module.exports = router;