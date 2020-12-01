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
                <div>
                    <img className='skier-logo' src='data:image/png;base64,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' />
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