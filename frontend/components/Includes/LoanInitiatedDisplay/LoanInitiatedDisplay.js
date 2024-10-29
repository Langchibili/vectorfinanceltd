"use client";

import { Alert } from "@mui/material";
import React from "react";

export default class LoanInitiatedDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async componentDidMount() {

  }
  render() {
    return <>
          <div className="row">
        <div className="col">
          <div className="h-100">
            <div className="row mb-3 pb-1">
              <div className="col-12">
                <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                  <Alert severity="info">We have received your application. We shall review it and provide feedback within 24hrs.</Alert> 
                </div>
                {/* end card header */}
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            {/* end row*/}
          </div>{" "}
          {/* end .h-100*/}
        </div>{" "}
        {/* end col */}
        {/* end col */}
      </div>
    </>;
  }
}
//  id
//  sign a letter of sale