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
                        <img alt='icon' className='image-icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAbFBMVEX///8AAAD8/PwGBgYJCQnU1NQXFxenp6dERERlZWUcHBzw8PDJyck1NTWrq6v4+PiFhYWfn5/g4OArKyt4eHhPT09MTEw9PT0TExMwMDA4ODiMjIzd3d1sbGzy8vK4uLhgYGB/f3+VlZXBwcHTGOwfAAAEeElEQVR4nO2ca3uiMBBGQby01Kr1UttaV7f9//9xvVQJyeQCmQy6fc8neICZnN0hJJiSZQAAAAAAAAAAAAAAAAAAuEd6m+d+zk//YSzrMV0nsDhRyJosU3nk+UpUpEwn8iYqks4jzyESI5IiKm/MoJQQcUbljRmUEiLOqLwxg1JCxBmVN2ZQSog4o/LGDEp5ZyLz5aJwDyriKBbLuYTIJMUESqM/SS8yTvq/ceE8nUoq8iDhkeevyUUECutIP7mIjMe5+RD5lSKJwmcQiUmUOj5EmiZKHR8iTROljg+RLPtcvgsNpuqU+wGnyHQrMkanmfGJPH10JXFiwyYiNNWwUXwyibx0ZXBhyySS7GfAUBZMIp10VyoFk0hX7a+AyC8QaXxxBBDxB4RIKyDiDwiRVkDEHxAirYCIPyBEWgERf0Dy4unLqszzcvUyjWu3I6+6V21HBKQuHg0vx4ajyJZb86p71XZEQPPi3qN69LEX3Xoyr7pXbUcENC+ueRxMoltP5lX3qu2IgMbFo1yDs7oERabDXKNkvOMFRYh3kC8MBkZeda/ajgioX7wyRRiX3guKEEv4SwYDI6+6V21HBNQvNj3Orzd5+M9FbG1pFPAWSiuJSBc3exIRovtlfCJ6RIYRAW/hgXjlNSKgf4gy4TAw8uqtaJnKIaIPGrcM7Sfy6q048hAT0DeM3woM48+8bVvUsEvkUF3XPrjkrKvM9UCMDmid6hZFuRrJTXWjA97Ky4fogIwiT03yqnsROVOIDIYD7zn3IDIv82dvD3cHIn/e8+vypZC86l5EWnaR3mm5UeErrtsX2Z9j+Yrr5kX+XoJ5iuvWRaqxv6e4blxkpyyPdBdXtyK+TnVQW/3lLK5ORZ7W7kf2vD4VcxZXlyKHjvX5j+P40yKv4yquLkWOs5O1fRRMfCXFUVwdimxO5zxYTfaGh6u4zJOlRCY/J71a6oX82ou9uDoTGV87pBXZuC+6ZdbiIs/upxdRO6Q9YbKjPezFRZ69Ti5S75DM3+DG1uXDtuIiT455ARgk0tMW0Osvhj6Nd3kVluKiTm3+Vq6pyKOeclk7bDxAVCzFRXm4HlIsIhv3v/PU/YcbdHHpZ/XXkS+WA0QmetIjm+vhHvHa3ipN5I1rfwMRy438dTm+9XjQxSUvMrfdyD8/8RJ1p0MVl7iI40Y+FTVZdzpEcUmL6B2vSjHJsu+gvz8hiktaxOh4a+3bDd5CPKjiEhbx3AD94M/pGcUlKxJ0AwRhFJeoiH0E1Ry9uCRFrB1vK2a2vMlFnCOo5mjFJSfi6nhbUS8uORFnx9uKGZ03sUjAyKMpteKSEuHreBXU4hIS4ex4FWZU3pQivB1vhVJcIiLMHa9CVVwSIuwdr8LMzJtOhL/jrSj0z1UITnXTABF/QIhE5mUPCJHIvOwBuwIiELltkc6/VBPzu6GK7zeB5Hwwich8ydfBl7+NYXT8Xap3vgXF38mmUQF8zNk8DhOp3X7RyT0/fB2xrrcHAAAAAAAAAAAAAAAAAAAAAPw+/gES/zSIz2SHXQAAAABJRU5ErkJggg==' />
                        <br></br>
                        <input name='img' onChange={e => this.handleChange(e)}/>
                        <h5>Name of Skis: </h5>
                        <input name='ski_name' onChange={e => this.handleChange(e)}/>
                        <h5>Content: </h5>
                        <input name='content' className="content-input" onChange={e => this.handleChange(e)}/>
                    </div>
                    <button className='post-button' onClick={this.addPost}>Post</button>
                </div>
            </div>
        )
    }
}

export default Form