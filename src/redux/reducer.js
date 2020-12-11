const initialState = {
    user: {},
    img: '',
    ski_name: '',
    content: '',
    skis: []
}

const GET_USER = "GET_USER"
const UPDATE_USER = "UPDATE_USER"

export const getUser = (user) => {
    return{
        type: GET_USER,
        payload: user
    }
}



export default function(state = initialState, action){
    switch(action.type){
        case GET_USER:
            console.log(action)
            return {
                ...state,
                user: action.payload
            }
            
        default:
            return state
    }
}