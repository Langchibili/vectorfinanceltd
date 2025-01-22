"use client"

import { useConstants } from "@/Contexts/ConstantsContext"
import { useUser } from "@/Contexts/UserContext"

export default function Home() {
  const loggedInUser = useUser()
  const constants  = useConstants()
  
  // get all forms to fill, 
  // have a stack of previous forms filled
  // if the forms array formstoFill has anything in it, fill the form at formsToFill[0]
  // then push the formsToFill[0] into previousFormsStack, then remove the form at formsToFill[0]
  // then check again if the form at formsToFill[0] exist, if at all it does, fill it, if not, then show the c
  // also check if all the formstofill are equal in length to the formsfilled, then show the complete loan application button 
  // on the last form to fill which is also formsToFill[0]

  return (
    <div className="page-content">
    <div className="container-fluid">

    </div>
    {/* container-fluid */}
  </div>
  )
}
