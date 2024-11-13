'use client'

//import CreatePostButton from "@/components/Includes/CreatePostButton/CreatePostButton"
import React from "react"
//import AvatarOnly from "../UserDisplay/AvatarOnly"
import Link from "next/link"

export default class BootsrapHeader extends React.Component{
    constructor(props){
        super(props)
        // this.state = {
        //   fullnames: ""
        // }
     }
  
       
   render(){
    const fullnames = this.props.userIsLoggedIn? this.props.loggedInUser.fullnames : ""
    let outstandingAmount = ""
    if(this.props.userIsLoggedIn === true){
         const {currentLoan} = this.props.loggedInUser
         outstandingAmount = currentLoan? currentLoan.outstandingAmount : "0"
    }
    

    return (
        <nav className="navbar bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
             <img src="/vectorfinancelimitedlogo.jpg" alt="" style={{height:'22px'}}/>
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
          Offcanvas
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
                        {/* item*/}
                        <h6 className="dropdown-header">Hello {fullnames}!</h6>
                        <Link className="dropdown-item" href="/profile">
                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
                        <span className="align-middle">Profile(For Individuals)</span>
                        
                        </Link>
                        <Link className="dropdown-item" href="/business-profile">
                        <i className="mdi mdi-bank-circle text-muted fs-16 align-middle me-1" />{" "}
                        <span className="align-middle">Profile(For Businesses)</span>
                        </Link>
                       
                        <a className="dropdown-item" href="apps-chat.html">
                        <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" />{" "}
                        <span className="align-middle">Messages</span>
                        </a>
                        <a className="dropdown-item" href="apps-tasks-kanban.html">
                        <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" />{" "}
                        <span className="align-middle">Taskboard</span>
                        </a>
                        <a className="dropdown-item" href="pages-faqs.html">
                        <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />{" "}
                        <span className="align-middle">Help</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="pages-profile.html">
                        <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" />{" "}
                        <span className="align-middle">
                            Balance : <b>K{outstandingAmount}</b>
                        </span>
                        </a>
                        <a className="dropdown-item" href="pages-profile-settings.html">
                        <span className="badge bg-success-subtle text-success mt-1 float-end">
                            New
                        </span>
                        <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />{" "}
                        <span className="align-middle">Settings</span>
                        </a>
                        <a className="dropdown-item" href="auth-lockscreen-basic.html">
                        <i className="mdi mdi-lock text-muted fs-16 align-middle me-1" />{" "}
                        <span className="align-middle">Lock screen</span>
                        </a>
                        <Link className="dropdown-item" href="/logout">
                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
                        <span className="align-middle" data-key="t-logout">
                            Logout
                        </span>
                        </Link>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
      
    )
   }
  }




  
