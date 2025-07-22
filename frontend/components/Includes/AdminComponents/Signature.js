import React from 'react'
import SaveSignature from '../SaveSignature/SaveSignature'

export default class Signature extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            directorSignature: this.props.constants?.adminSignatures?.directorSignature || null,
            ceoSignature: this.props.constants?.adminSignatures?.ceoSignature || null,
        }
    }
    handleDirectorSignatureSave = (directorSignature)=>{
        this.setState({
           directorSignature:directorSignature
        })
    }
     handleCeoSignatureSave = (ceoSignature)=>{
        this.setState({
           ceoSignature:ceoSignature
        })
    }
 

    render() {
        const { role } = this.props
        console.log("role", role)
        return (
            <SaveSignature
                credentialsFor={role}
                usage="Signature"
                handleDirectorSignatureSave={this.handleDirectorSignatureSave}
                handleCeoSignatureSave={this.handleCeoSignatureSave}
                directorSignature={this.state.directorSignature}
                ceoSignature={this.state.ceoSignature}
                loggedInUser={this.props.loggedInUser} />
        )
    }
}
