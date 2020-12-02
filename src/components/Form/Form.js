import axios from 'axios'
import React, {Component} from 'react'
import './Form.css'

class Form extends Component {
    constructor(){
        super()

        this.state = {
            img: "",
            ski_name: "",
            content: ""
        }
    }

    // componentDidUpdate(){
    //     if(this.state.ski_name === ""){
    //         this.setState({
    //             ski_name: "New Ski Review"
    //         })
    //     }
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addPost = () => {
        try{
            axios.post('/post/form', this.state)
            this.props.history.push('/feed')
        }
        catch(err){
            alert(err)
        }
    }

    render(){
        return(
            <div className='post'>
                <div className="new-post">
                    <h1>New Review</h1>
                    <div className="post-content">
                        <h4>Image URL: </h4>
                        <input onChange={this.handleChange}/>
                        <h5>Name of Skis: </h5>
                        <input onChange={this.handleChange}/>
                        <h5>Content: </h5>
                        <input className="content-input" onChange={this.handleChange}/>
                    </div>
                    <button className='post-button' onClick={this.addPost}>Post</button>
                </div>
            </div>
        )
    }
}

export default Form