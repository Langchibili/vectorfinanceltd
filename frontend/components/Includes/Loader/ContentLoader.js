'use client'

import './ContentLoader.css'
import React from "react"

export default class ContentLoader extends React.Component{
   render(){
    return (
        <div className="loader-container">
            <div className="loader">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <p>{this.props.text}</p>
        </div>
    )
   }
  }