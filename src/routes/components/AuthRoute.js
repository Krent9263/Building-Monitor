import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router'
import { UserContext } from '../../context/UserContext'

export default function AuthRoute(props) {

  const userContext = useContext(UserContext)
  const {user} = userContext.data

  useEffect(() => {
    if(user != null){
      if(user?.isSystemAdmin || user?.isOfficeAdmin){
        return window.location.href = "/home"
      }else{
        return window.location.href = "/qrscreen"
      }
      }
  }, [user])

  if(user == null) return (
    <Route {...props}/>
  )
  return <div/>

}
