import ApplyForALoanButton from "../Includes/ApplyForALoanButton/ApplyForALoanButton";

export default function ListStyleLoanApplicationDisplay(props) {
   return (<>
   <ApplyForALoanButton
        loanType="personal"
        color="blue" 
        text="APPLY FOR A PERSONAL LOAN" 
        loggedInUser={props.loggedInUser.user} constants={props.constants} 
        setShowLoanApplicationForms={props.setShowLoanApplicationForms}
        setSelectedloanCategory={props.setSelectedloanCategory}/> 
    <ApplyForALoanButton 
        loanType="business" 
        color="forestgreen" 
        text="APPLY FOR A BUSINESS LOAN" 
        loggedInUser={props.loggedInUser.user} constants={props.constants} 
        setShowLoanApplicationForms={props.setShowLoanApplicationForms}
        setSelectedloanCategory={props.setSelectedloanCategory}/>
    <ApplyForALoanButton 
        loanType="company" 
        text="APPLY FOR A COMPANY LOAN" 
        loggedInUser={props.loggedInUser.user} constants={props.constants} 
        setShowLoanApplicationForms={props.setShowLoanApplicationForms}
        setSelectedloanCategory={props.setSelectedloanCategory}/>
   </>)
}