import React from 'react'
import { useNavigate } from "react-router-dom";
import './index.scss'

export default function OrganizationPage() {
  const navigate = useNavigate()

  return (
    <>
      <h2>OrganizationPage</h2>
      <div 
        className="modalButton"
        onClick={()=>{
          
          navigate('/modal/organization/setting')
        }}
      >
          setting
      </div>
    </>
  )
}
