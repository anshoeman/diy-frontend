import React, { useState } from 'react';
import { login } from '../../actions/auth';
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import { Navigate } from 'react-router-dom';
function Login({login,isAuthenticated}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        login(email,password)
    }
    if(isAuthenticated){
        return <Navigate replace to='/dashboard'/>
    }
    return (

        <form className='form-center' style={{ marginTop: 60 }} onSubmit={(e)=>onSubmit(e)}>
            <div className="form-group" style={{ width: '50%', marginLeft: 60 }}>
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" name='email' value={email} onChange={(e) => onChange(e)} />
            </div>

            <div className="form-group" style={{ width: '50%', marginLeft: 60, marginTop: 30 }}>
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name='password' value={password} onChange={(e) => onChange(e)}/>
            </div>
            <div style={{ marginLeft: 40, marginTop: 10 }}>
                <button type="submit" className="btn btn-dark btn-lg btn-block" style={{ marginTop: 20, marginLeft: 20, width: 200 }}>Login</button>
            </div>
        </form>

    );
}

Login.propTypes = {
    login:propTypes.func.isRequired,
    isAuthenticated:propTypes.bool
  }
  const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
  })

export default connect(mapStateToProps,{login})(Login)