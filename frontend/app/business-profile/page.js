"use client"
import BusinessInformationForm from "@/components/Forms/BusinessInformationForm";
import UpdateClientDetailsForm from "@/components/Forms/UpdateClientDetailsForm";
import UpdateDetailsForm from "@/components/Forms/UpdateDetailsForm";
import { useConstants } from "@/Contexts/ConstantsContext";
import { useUser } from "@/Contexts/UserContext";

export default function Profile() {
    const loggedInUser = useUser()
    const constants = useConstants()

      return (
        <div className="p-3">
                <h3 className="mb-3 mt-20 p-3">For Businesses and Company Loan Applicants</h3>
                <UpdateDetailsForm loggedInUser={loggedInUser.user} constants={constants} loanCategory = "business" formDisplay="profile"/> 
                <UpdateClientDetailsForm loggedInUser={loggedInUser.user} constants={constants} loanCategory = "business" formDisplay="profile"/> 
                <BusinessInformationForm loggedInUser={loggedInUser.user} constants={constants} loanCategory = "business" formDisplay="profile"/> 
                <div style={{minHeight:'20px'}}></div> 
        </div>
      )
    
}