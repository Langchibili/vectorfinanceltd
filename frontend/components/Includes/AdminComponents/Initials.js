import React from 'react'
import SaveSignature from '../SaveSignature/SaveSignature'

export default class Initials extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            directorInitials: this.props.constants?.adminInitials?.directorInitials || null,
            ceoInitials: this.props.constants?.adminInitials?.ceoInitials || null
        }
    }
   
    handleDirectorInitialsSave = (directorInitials)=>{
        this.setState({
           directorInitials:directorInitials
        })
    }
    handleCeoInitialsSave = (ceoInitials)=>{
        this.setState({
           ceoInitials:ceoInitials
        })
    }
 

    render() {
        const { role } = this.props
        return (
            <SaveSignature
                credentialsFor={role}
                usage="Initials"
                handleDirectorInitialsSave={this.handleDirectorInitialsSave}
                handleCeoInitialsSave={this.handleCeoInitialsSave}
                constants={this.props.constants}
                loggedInUser={this.props.loggedInUser} />
        )
    }
}
