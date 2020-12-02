import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    const [state, setState] = useState(0)
        return(
            <header className='nav'>
                <ul className='links'>
                <div className='login-link'><Link to='/' style={{textDecoration: "none", color: "black"}}>Logout</Link></div>
                <div className='your-feed'><Link to='/feed' style={{textDecoration: "none", color: "black"}}>Your Feed</Link></div>
                <div className='post-review'><Link to='/create' style={{textDecoration: "none", color: "black"}}>Post a Review</Link></div>
                <div className='your-reviews'><Link to='/reviews' style={{textDecoration: "none", color: "black"}}>Your Reviews</Link></div>
                </ul>
            </header>
        )
}

export default Nav