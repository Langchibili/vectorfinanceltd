'use client'

import React from "react"

export default class MoreContentLoader extends React.Component{
   render(){
    return (
        <div className="col-md-12">
            <div className="main-loader mt-50">
                <div className="spinner">
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
                </div>
            </div>
        </div>
    )
   }
  }