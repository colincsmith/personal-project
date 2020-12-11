import React, {Component} from 'react'
import axios from 'axios'
import './Feed.css'
import { connect } from 'react-redux'

class Feed extends Component{
    constructor(){
        super()

        this.state = {
            posts: [],
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        this.getAllPosts()
    }

    //# function for getting all my posts to show up in the Feed.
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

    //# function for deleting posts off of Feed.
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

    editPost = (postId, content) => {
        axios.put(`/post/${postId}`, {content})
            .then(() => {
                this.getAllPosts()
            })
            .catch(err => {
                console.log('hello', err)
            })
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
                        <button className='delete-button' onClick={() => this.deletePost(post.post_id)}>X Delete Post X</button>
                        <input className='edit-input' name='content' onChange={this.handleChange} placeholder='edit review...'/>
                        <button className='edit-button' onClick={() => this.editPost(post.post_id, this.state.content)}> Edit Post </button>
                    </div>
                </div>
            )
        })
        return(
            <div>
                {mappedPosts}
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}


export default connect(mapStateToProps)(Feed)