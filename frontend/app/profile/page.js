"use client"
import BusinessInformationForm from "@/components/Forms/BusinessInformationForm";
import UpdateClientDetailsForm from "@/components/Forms/UpdateClientDetailsForm";
import UpdateDetailsForm from "@/components/Forms/UpdateDetailsForm";
import UpdateSalaryDetailsForm from "@/components/Forms/UpdateSalaryDetailsForm";
import { useConstants } from "@/Contexts/ConstantsContext";
import { useUser } from "@/Contexts/UserContext";

export default function Profile() {
    const loggedInUser = useUser()
    const constants = useConstants()

      return (
        <div className="p-3">
            <h3 className="mb-3 mt-20 p-3">For Personal Loan Applicants</h3>
            <UpdateDetailsForm loggedInUser={loggedInUser.user} constants={constants} loanCategory = "personal" formDisplay="profile"/> 
            <UpdateClientDetailsForm loggedInUser={loggedInUser.user} constants={constants} loanCategory = "personal" formDisplay="profile"/> 
            <UpdateSalaryDetailsForm loggedInUser={loggedInUser.user} constants={constants} loanCategory = "personal" formDisplay="profile"/>
            <div style={{minHeight:'20px'}}></div> 
        </div>
      )
    
}