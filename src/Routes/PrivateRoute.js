import React from 'react'
import {Route,Navigate,Routes, Outlet} from 'react-router-dom'
import propTypes from 'prop-types'
import {connect} from 'react-redux'//rest opeartor we passed inside the Route
const PrivateRoute = ({auth:{isAuthenticated}}) => {
    const token = localStorage.getItem('token')
    return token ? <Outlet/>:<Navigate to ='/login'/>
}

PrivateRoute.propTypes = {
auth:propTypes.object.isRequired
}

const mapStateToProps = state=>({   //We are passing whole state in the props so mapstatetoprops
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateRoute)//connect redux with the actions we craeted