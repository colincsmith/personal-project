const initialState = {
    username: ''
}

const GET_USER = "GET_USER"

export const getUser = (user_id, username) => {
    return{
        type: GET_USER,
        payload: {user_id, username}
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return {
                id: action.payload.user_id,
                username: action.payload.username
            }
        default:
            return state
    }
}