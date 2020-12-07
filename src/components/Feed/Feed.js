import React, {Component} from 'react'
import axios from 'axios'
import './Feed.css'

class Feed extends Component{
    constructor(){
        super()

        this.state = {
            posts: [],
        }
    }

    handleSearch = () => {
        this.getAllPosts()
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


export default Feed