import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserReviews extends Component{
    constructor(){
        super()

        this.state = {
            userId: null,
            posts: []
        }
    }

    componentDidMount(){
        this.getUserPosts()
    }

    getUserPosts = async () => {
        try{
            const post = await axios.get(`/posts/${this.props.user.id}`)
            this.setState({
                posts: post.data
            })
        } catch(err){
            console.log(err)
        }
    }
    
    render(){
        const mappedPosts = this.state.posts.map((post) => {
            return (
                
            <div key={post.user_id} className='post-container'>
                <img alt='skis' src={post.img}/>
                    <h1 style={{color: 'crimson'}} >Name of Skis: </h1>
                    <h2> {post.ski_name}</h2>
                    <h2 style={{color: 'crimson'}} >Thoughts </h2>
                    <h3>{post.content}</h3>
            </div>
            )
        })
        return (
            <div>
                {mappedPosts}
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(UserReviews)