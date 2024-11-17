"use client"
import BusinessInformationForm from "@/components/Forms/BusinessInformationForm";
import UpdateClientDetailsForm from "@/components/Forms/UpdateClientDetailsForm";
import UpdateDetailsForm from "@/components/Forms/UpdateDetailsForm";
import { useConstants } from "@/Contexts/ConstantsContext";
import { usePage } from "@/Contexts/PageContext";
import { useUser } from "@/Contexts/UserContext";
import { scrolltoTopOFPage } from "@/Functions";
import { Slide } from "@material-ui/core";

export default function Profile() {
    const loggedInUser = useUser()
    const constants = useConstants()
    const { setPage } = usePage()
  
    setPage('/business-profile')
    scrolltoTopOFPage()
    return (
        <Slide in={true} direction="up">
                <div className="p-3">
                    <h3 className="mb-3 mt-10 p-3">For Businesses and Company Loan Applicants</h3>
                    <UpdateDetailsForm loggedInUser={loggedInUser.user} constants={constants} loanCategory = "business" formDisplay="profile"/> 
                    <UpdateClientDetailsForm loggedInUser={loggedInUser.user} constants={constants} loanCategory = "business" formDisplay="profile"/> 
                    <BusinessInformationForm loggedInUser={loggedInUser.user} constants={constants} loanCategory = "business" formDisplay="profile"/> 
                    <div style={{minHeight:'20px'}}></div> 
                </div>
        </Slide>
    )
    
}