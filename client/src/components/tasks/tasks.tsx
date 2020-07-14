import React, { Component, ChangeEvent } from "react";
import { Task } from "../../models/Task";
import axios from "axios"
import { Button,Modal,Table } from 'react-bootstrap'
import "./tasks.css"

interface tasksState{
    filter:string,
    // searchInput:string,
    tasks:Task[]
    taskName:string,
    phone: string,
    email: string,
    taskDescription: string,
    date: string,
    userName: string,
    taskDetailsModalShowHide:boolean
    pickedTask:Task,
    addNewTaskModalShowHide:boolean,
    editTaskModalShowHide:boolean
}

export default class Tasks extends Component<any,tasksState>{

    public constructor(props:any){
       super(props)
        this.state = {
        filter:"",
        tasks:[],
        taskName:"",
        phone: "",
        email: "",
        taskDescription: "",
        date: "",
        userName: "",
        taskDetailsModalShowHide : false,
        pickedTask:null,
        addNewTaskModalShowHide : false,
        editTaskModalShowHide : false
        }
    }

    // get all tasks
    public async componentDidMount() {
       try {
           let response = await axios.get<Task[]>("/tasks/");
           this.setState({tasks: response.data}) /* display the all tasks */
           
        } catch (error) {
            console.log((error))
            alert("error at getting all tasks")
        }
    }

    public addNewTask = async () =>{
        // make sure that inputs are not empty
        let inputApprove = this.isInputsValid();
        if ( inputApprove == false) {
            alert("one of inputs is not valid")
            return;
        } 

        // create a new object of the new task
        let newTaskDetails = new Task(this.state.taskName, this.state.phone ,this.state.email, this.state.userName, this.state.taskDescription)
        console.log(newTaskDetails)
        try {
            // send task to server, at server answer we will get the new tsak id from the DB
            let response = await axios.post<{id:number,date:string}>("/tasks",newTaskDetails);
            console.log(response.data)
    
            let newTaskIdAndDate = response.data;
            newTaskDetails.id = newTaskIdAndDate.id /* set task id, for the use of "key" at map function later */
            newTaskDetails.date = newTaskIdAndDate.date
            this.state.tasks.push(newTaskDetails) /* add to array */
            this.setState({tasks:this.state.tasks})  /* render array to display at the UI */
            this.initInputs(); /* empty user text */
            this.handleAddTaskModal()
            
        } catch (error) {
            console.log(error)
            // alert("error at adding new task")
            
        }
    }

    public editTask = async () =>{
        // make sure that inputs are not empty
        let inputApprove = this.isInputsValid();
        if ( inputApprove == false) {
            alert("one of inputs is not valid")
            return;
        } 

        // create a new object of the updated task
        let editTaskDetails = new Task(this.state.taskName, this.state.phone ,this.state.email, this.state.userName, this.state.taskDescription ,this.state.pickedTask.id, this.state.pickedTask.date)
        try {
            // send updated task to server
            let response = await axios.put<string>("/tasks",editTaskDetails);
            let serverResponse = response.data;
            console.log(serverResponse)
            let currentTasks = this.state.tasks;
            // find the tasks that been changed - and replace it with the new information
            for (let index = 0; index < currentTasks.length; index++) {
                if (currentTasks[index].id == this.state.pickedTask.id) {
                    currentTasks[index] = editTaskDetails;
                    break;
                };
            }
            this.setState({tasks: currentTasks})
            this.handleEditTaskModal()
            
        } catch (error) {
            console.log(error)
            // alert("error at edit task")    
        }
    }

    /* init user inputs */
    public initInputs = () => {
        let init = "";
        this.setState({taskName:init})
        this.setState({email:init})
        this.setState({taskDescription:init})
        this.setState({phone:init})
        this.setState({userName:init})
    }
    // check that inputs are not empty
    public isInputsValid(){
        if (this.state.userName=="" || this.state.taskName==""||this.state.phone==""||this.state.email=="") {
            return false
        }
        return true
    }

    // inputs data binding functions
    public setTaskName = (args: ChangeEvent<HTMLInputElement>) => {
        let nameInput = args.target.value   
        this.setState({taskName:nameInput})
    }
    public setEmail = (args: ChangeEvent<HTMLInputElement>) => {
        let emailInput = args.target.value   
        this.setState({email:emailInput})
    }
    public setPhone = (args: ChangeEvent<HTMLInputElement>) => {
        let phoneInput = args.target.value   
        this.setState({phone:phoneInput})
    }
    public setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        let userNameInput = args.target.value   
        this.setState({userName:userNameInput})
    }
    public setTaskDescription = (args: ChangeEvent<HTMLTextAreaElement>) => {
        let taskDescriptionInput = args.target.value   
        this.setState({taskDescription:taskDescriptionInput})
    }
    public setSearch = (args: ChangeEvent<HTMLInputElement>) => {
        let searchInput = args.target.value   
        this.setState({filter:searchInput})
    }

    setPickedTaskForModalShowDetails(pickedTask:Task) { /* modal display switch hide/show */
        this.setState({pickedTask:pickedTask})
        this.handleShowTaskDetailsModal()
    }
    handleShowTaskDetailsModal() { /* modal display switch hide/show */
      this.setState({ taskDetailsModalShowHide: !this.state.taskDetailsModalShowHide })
    }
    setPickedTaskForModalEditTask(pickedTask:Task) { /* modal display switch hide/show */
        this.setState({pickedTask:pickedTask})
        this.setState({taskName:pickedTask.taskName})
        this.setState({userName:pickedTask.userName})
        this.setState({email:pickedTask.email})
        this.setState({phone:pickedTask.phone})
        this.setState({taskDescription:pickedTask.taskDescription})
        this.handleEditTaskModal()
    }
    handleEditTaskModal() { /* modal display switch hide/show */
      this.setState({ editTaskModalShowHide: !this.state.editTaskModalShowHide })
    }
    handleAddTaskModal() { /* modal display switch hide/show */
        this.initInputs();
      this.setState({ addNewTaskModalShowHide: !this.state.addNewTaskModalShowHide })
    }
    deleteTask = async (id:number) => { /* modal display switch hide/show */
        try {
            // send task id to server
            let response = await axios.delete<string>("/tasks/"+id);
            let serverResponse = response.data;
            console.log(serverResponse)
            let currentTasks = this.state.tasks;
            // find the tasks that been deletde - and delete in from the tasks array
            for (let index = 0; index < currentTasks.length; index++) {
                if (currentTasks[index].id == id) {
                    currentTasks.splice(index,1)
                    break;
                };
            }
            this.setState({tasks: currentTasks})
            
        } catch (error) {
            console.log(error)
            // alert("error at deleting task")    
        }
    }

    public render(){
        return(
        <div className="tasksManager">
            
            <br/>
            <div id="searchInput">
               <input type="text" placeholder="חיפוש לפי שם משתמש" name="search"
               value={this.state.filter} onChange={this.setSearch} className="form-control form-control-sm" />
              </div>
            <br/>

            <input type="button" className="btn btn-success btn-lg" value="משימה חדשה" onClick={() => this.handleAddTaskModal()} /><br/><br/>
            <h3><b>רשימת משימות ({this.state.tasks.length})</b></h3>
            <div className="tasksOutput">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">פעולות</th>
                            <th scope="col">תאריך יצירת משימה</th>
                            <th scope="col">מייל</th>
                            <th scope="col">טלפון</th>
                            <th scope="col">שם משתמש</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tasks.filter(task => {
                        if (this.state.filter === "") {/* if filter is empty approve all */
                            return true;
                        }
                        
                        /* else approve only the one that include the filter text */
                        return task.userName.includes(this.state.filter)
                    }
                    ).map(singleTask => 
                            <tr key={singleTask.id}  >
                                <td>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deleteTask(singleTask.id)} >מחק</button>
                                    <button type="button" className="btn btn-warning btn-sm" onClick={() => this.setPickedTaskForModalEditTask(singleTask)}>עדכן</button>
                                    <button type="button" className="btn btn-info btn-sm" onClick={() => this.setPickedTaskForModalShowDetails(singleTask)}>הצג</button>
                                </td>
                                <td>{singleTask.date}</td>
                                <td>{singleTask.email}</td>
                                <td>{singleTask.phone}</td>
                                <td>{singleTask.userName}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
            </div>

            {
                this.state.pickedTask === null || 
                    <Modal className="myModal" show={this.state.taskDetailsModalShowHide}>
                        <div className="modalWrapper">
                            <Modal.Header>
                               <Modal.Title className="modalHeader">
                            <h4>   פרטי משימה - {this.state.pickedTask.userName} - {this.state.pickedTask.date} </h4>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bodyText">
                               <h4>{this.state.pickedTask.taskName}</h4>
                               <p>
                                   {this.state.pickedTask.taskDescription}
                               </p> 
                               </Modal.Body>
                            <Modal.Footer>
                               <Button variant="secondary" onClick={() => this.handleShowTaskDetailsModal()}>
                                  Close
                               </Button>
                            </Modal.Footer>
                        </div>
                    </Modal>
            }

            {
                    <Modal className="myModal" show={this.state.addNewTaskModalShowHide}>
                        <div className="modalWrapper">
                            <Modal.Header>
                               <Modal.Title className="modalHeader">
                                <h4>הוספת משימה</h4>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input type="text" name="taskName" value={this.state.taskName} onChange={this.setTaskName} className="form-control form-control-sm" placeholder="שם משימה"/><br/>
                                <input type="text" name="email" value={this.state.email} onChange={this.setEmail} className="form-control form-control-sm" placeholder="מייל"/><br/>
                                <input type="number" name="phone" value={this.state.phone} onChange={this.setPhone} className="form-control form-control-sm" placeholder="טלפון"/><br/>
                                <input type="text" name="userName" value={this.state.userName} onChange={this.setUserName} className="form-control form-control-sm" placeholder="שם משתמש"/><br/>
                                <textarea className="form-control form-control-sm" placeholder="תיאור משימה" name="message" value={this.state.taskDescription} onChange={this.setTaskDescription} /><br></br>                            
                               </Modal.Body>
                            <Modal.Footer>
                               <Button variant="primary" onClick={() => this.addNewTask()} >
                                    הוסף משימה
                                </Button>
                               <Button variant="secondary" onClick={() => this.handleAddTaskModal()}>
                                  סגור
                               </Button>
                            </Modal.Footer>
                        </div>
                    </Modal>
            }

            {
                this.state.pickedTask === null ||
                    <Modal className="myModal" show={this.state.editTaskModalShowHide}>
                        <div className="modalWrapper">
                            <Modal.Header>
                               <Modal.Title className="modalHeader">
                                <h4>עידכון משימה</h4>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input type="text" name="taskName" value={this.state.taskName} onChange={this.setTaskName} className="form-control form-control-sm" placeholder="שם משימה"/><br/><br/>
                                <input type="text" name="email" value={this.state.email} onChange={this.setEmail} className="form-control form-control-sm" placeholder="מייל"/><br/><br/>
                                <input type="number" name="phone" value={this.state.phone} onChange={this.setPhone} className="form-control form-control-sm" placeholder="טלפון"/><br/><br/>
                                <input type="text" name="userName" value={this.state.userName} onChange={this.setUserName} className="form-control form-control-sm" placeholder="שם משתמש"/><br/><br/>
                                <textarea className="form-control form-control-sm" placeholder="תיאור משימה" name="message" value={this.state.taskDescription} onChange={this.setTaskDescription} /><br></br>
                               </Modal.Body>
                            <Modal.Footer>
                               <Button variant="primary" onClick={() => this.editTask()} >
                                    עדכן משימה
                                </Button>
                               <Button variant="secondary" onClick={() => this.handleEditTaskModal()}>
                                  סגור
                               </Button>
                            </Modal.Footer>
                        </div>
                    </Modal>
            }


        </div>
        


        )
    }
}