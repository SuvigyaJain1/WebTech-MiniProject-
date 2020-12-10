import {
    GET_POST
} from '../_actions/types';


export default function(state={},action){
    switch(action.type){
        case GET_POST:
            return {...state, posts: action.payload }
        default:
            return state;
    }
}
