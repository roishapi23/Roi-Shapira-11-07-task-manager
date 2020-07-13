import React, { Component } from "react";
import "./layout.css"
import Tasks from "../tasks/tasks";
import Header from "../header/header";


export default class Layout extends Component{

    public render(){
        return(
        
        <section className="layout">

            <header>
                <Header />
            </header>
        
            <main>
                <div className="allTasksArea">
                    <Tasks />
                </div>
            </main>
                   

        </section>
        )
    }
}