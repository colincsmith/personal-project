import React, {Component} from 'react'
import axios from 'axios'

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

    handleReset = () => {
        this.setState({
            searchInput: ""
        })

        this.getAllPosts()
    }

    toggleMyPosts = () => {
        this.setState({
            myPosts: !this.state.myPosts
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.myPosts !== this.state.myPosts){
            this.getAllPosts()
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

    render(){
        const mappedPosts = this.state.posts.map((post, index) => {
            return(
            <div className='post-container' key={index} >
                <p>{post.img}</p>
                <h1>Name of Skis: {post.ski_name}</h1>
                <h2>Thoughts: {post.content}</h2>
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