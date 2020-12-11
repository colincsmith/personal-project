import React, {Component} from 'react'
import axios from 'axios'
import './Feed.css'
import {updateUser} from '../../redux/reducer'
import { connect } from 'react-redux'

class Feed extends Component{
    constructor(){
        super()

        this.state = {
            posts: [],
        }
    }

    getMe = async () => {
        try{
            const me = await axios.get('/auth/me')
            this.props.updateUser(me.user.username)
        } catch(err){
            alert(err)
        }
    }

    componentDidMount(){
        this.getAllPosts()
    }

    

    getAllPosts = async () => {
        try{
            const posts = await axios.get(`/feed/posts`)
            // console.log(posts.data)
            this.setState({
                posts: posts.data
            })
        } catch(err){
            console.log(err)
        }
    }

    deletePost = (postId) => {
        
        axios.delete(`/post/${postId}`)
            .then(() => {
                this.getAllPosts()
            })
            .catch(err => {
                console.log(err)
            })
            // if(response === "You did not create this post."){
            //     alert(response)
            // }
    }

    render(){
        const mappedPosts = this.state.posts.map((post, index) => {
            return(
                <div className='container'>
                    <div className='post-container' key={index} >
                        <img className='post-image' alt='skis' src={post.img}/>
                        <h1 style={{color: 'crimson'}} >Name of Skis: </h1>
                        <h2> {post.ski_name}</h2>
                        <h2 style={{color: 'crimson'}} >Thoughts </h2>
                        <h3>{post.content}</h3>
                        <button onClick={() => this.deletePost(post.post_id)}> Delete Post </button>
                    </div>
                </div>
            )
        })
        return(
            <div>
                {mappedPosts}
                <div className='greeting-container'>
                <h3 className='greeting'> Take a look at your feed, {this.props.user.username}!</h3>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return state
}


export default connect(mapStateToProps, {updateUser})(Feed)