import React, {Component} from 'react'
import axios from 'axios'

class Feed extends Component{
    constructor(){
        super()

        this.state = {
            searchInput: '',
            posts: [],
            myPosts: true
        }
    }

    handleSearchInput = (e) => {
        this.setState({
            searchInput: e.target.value
        })
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
            const posts = await axios.get(`/feed/posts?search=${this.state.searchInput}&userposts=${this.state.myPosts}`)
            this.setState({
                posts: posts.data
            })
        } catch(err){
            console.log(err)
        }
    }

    render(){
        return(
            <div>
                <div>
                    <div>
                        <input onChange={this.handleSearchInput} type='text' value={this.state.searchInput} />
                        <button onClick={this.handleSearch}>Search for Post</button>
                        <button onClick={this.handleReset}>Clear</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Feed