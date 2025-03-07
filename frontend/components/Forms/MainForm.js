"use client"

import React from "react";
import UpdateDetailsForm from "./UpdateDetailsForm";
import UpdateClientDetailsForm from "./UpdateClientDetailsForm";
import UpdateSalaryDetailsForm from "./UpdateSalaryDetailsForm";

export default class MainForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        
    }

    render(){
        return (<>
           <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Basic Elements</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Forms</a>
                    </li>
                    <li className="breadcrumb-item active">Basic Elements</li>
                    </ol>
                </div>
                </div>
            </div>
            </div>

            <UpdateClientDetailsForm {...this.props}/>
        </>)
    }
}