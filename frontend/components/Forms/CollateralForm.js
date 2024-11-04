"use client"

import React from "react";
import UpdateLandCollateralForm from "./UpdateLandCollateralForm";
import UpdateVehicleCollateralForm from "./UpdateVehicleCollateralForm";
import UpdateHouseCollateralForm from "./UpdateHouseCollateralForm";
import { Alert } from "@mui/material";
import { Fade, Zoom } from "@material-ui/core";

export default class CollateralForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          collateralType: ''
        }
    }
     
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    

    renderForm = (collateralType)=>{
       if(collateralType === "Vehicle"){
            return <UpdateVehicleCollateralForm 

            {...this.props}/>
       }
       else if(collateralType === "House"){
            return <UpdateHouseCollateralForm 
            {...this.props}/>
       } 
       else if(collateralType === "Land"){
            return <UpdateLandCollateralForm 
            {...this.props}/>
       }
       else{
         return <Alert soverity="info">Please Select The Form Of Collateral You Want To Use To Obtain This Loan.</Alert>
       }         
    }

    setLoanInformation = (information)=>{
        this.setState({
            ...information
        },()=>{
            console.log(this.state)
        })
    }

    render(){
        return (
            <Zoom in={true}>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Collateral Details </h4>
                  </div>
                  <div className="card-body">
                       <div className="col-lg-12">
                            <div className="input-group">
                              <label className="form-label mr-2">What collateral will you use to get this loan?</label>
                              <select
                                className="form-select mb-2"
                                name="collateralType"
                                autoComplete="off"
                                value={this.state.collateralType}
                                onChange={this.handleInputChange}
                              >
                                <option value="">Choose...</option>
                                <option value="Vehicle">Vehicle</option>
                                <option value="House">House</option>
                                <option value="Land">Land</option>
                              </select>
                            </div>
                        </div>
                     {this.renderForm(this.state.collateralType)}   
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        )
    }
}