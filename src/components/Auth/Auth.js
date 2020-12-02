import axios from 'axios'
import React, {Component} from 'react'
import './Auth.css'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'

class Auth extends Component{
    constructor(){
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    registerUser = async () => {
        const {username, password} = this.state
        try{
            const user = await axios.post('/auth/register', {username, password})
            this.props.getUser(user.data.user_id, user.data.username)
            this.props.history.push('/feed')
        } catch(err){
            alert(err.response.request.response)
        }
    }

    login = async () => {
        const {username, password} = this.state
        try{
            const user = await axios.post('/auth/login', {username, password})
            this.props.getUser(user.data.user_id, user.data.username)
            this.props.history.push('/feed')
        } catch(err){
            alert(err.response.request.response)
        }
    }

    render(){
        return(
            <div className='login'>
                <div className='login-inside'>
                    <h2 className='greeting'>Rate Your Planks</h2>
                    <div>
                        <input className='username-input' onChange={this.handleUsername} type='text' placeholder='Username...'/>
                    </div>

                    <div>
                        <input className='password-input' onChange={this.handlePassword} type='password' placeholder='Password...'/>
                    </div>

                    <div className='buttons'>
                        <button onClick={this.login} className='login-button'>Login</button>
                        <button onClick={this.registerUser} className='register-button'>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getUser})(Auth)