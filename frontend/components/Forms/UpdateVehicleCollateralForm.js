"use client"

import React from "react";

export default class UpdateVehicleCollateralForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        
    }

    render(){
        return (<>
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Basic Details </h4>
                    <div className="flex-shrink-0">
                    </div>
                </div>
                {/* end card header */}
                <div className="card-body">
                    <div className="live-preview">
                    <div className="row gy-4">
                        <div className="col-xxl-3 col-md-6">
                            <div>
                                <label htmlFor="valueInput" className="form-label">
                                Firstname
                                </label>
                                <input
                                className="form-control"
                                id="valueInput"
                                type="text"
                                defaultValue="Input value"
                                />
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-6">
                            <div>
                                <label htmlFor="valueInput" className="form-label">
                                Lastname
                                </label>
                                <input
                                className="form-control"
                                id="valueInput"
                                type="text"
                                defaultValue="Input value"
                                />
                            </div>
                        </div>
                        
                        <div className="col-lg-4">
                            <div className="input-group">
                                <span className="input-group-text" id="inputGroup-sizing-default">
                                Age
                                </span>
                                <input
                                type="number"
                                defaultValue=""
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="input-group">
                                <select className="form-select" id="inputGroupSelect02">
                                <option selected="">Choose...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                </select>
                                <label className="input-group-text" htmlFor="inputGroupSelect02">
                                Gender
                                </label>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-6">
                            <div>
                                <label htmlFor="exampleInputdate" className="form-label">
                                Date Of Birth
                                </label>
                                <input type="date" className="form-control" id="exampleInputdate" />
                            </div>
                        </div>
                    </div>
                    {/*Save Buttons*/}
                    <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                        <div style={{width:'100%'}}>
                            <button type="button" className="btn btn-success w-50 mt-3" id="confirm-btn">
                                Save
                            </button>
                        </div>
                        <div style={{width:'100%', textAlign:'right'}}>
                            <button type="button" className="btn btn-success w-50 mt-3" id="confirm-btn">
                                Next
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        {/*end col*/}
        </div>
        </>)
    }
}