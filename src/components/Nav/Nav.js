import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {getUser} from '../../redux/reducer'
import {connect} from 'react-redux'
import './Nav.css'


class Nav extends Component{

    getMe = async () => {
        try{
            const me = await axios.get('/auth/me')
            console.log(me.data)
            this.props.getUser(me.data)
        } catch(err){
            alert(err)
        }
    }

    componentDidMount() {
        this.getMe()
    }

    render(){
        return(
            <header className='nav'>
                <ul className='links'>
                <h5 className='greeting'> Glad you made it, {this.props.user.username}!</h5>
                <div className='login-link'><Link to='/' style={{textDecoration: "none", color: "black"}}>Logout</Link></div>
                <div className='your-feed'><Link to='/feed' style={{textDecoration: "none", color: "black"}}>Your Feed</Link></div>
                <div className='post-review'><Link to='/create' style={{textDecoration: "none", color: "black"}}>Post a Review</Link></div>
                <div className='your-reviews'><Link to='/reviews' style={{textDecoration: "none", color: "black"}}>Your Profile</Link></div>
                </ul>
            </header>
        )
    }
}

function mapStateToProps(state){
    return state
}
export default connect(mapStateToProps, {getUser})(Nav)