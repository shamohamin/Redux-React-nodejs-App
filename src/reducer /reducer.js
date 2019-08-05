import {IS_FETCHING_DATA,ERROR,FETCH_DATA,POST_REQUEST} from '../actions /actions';

const initialState = {
    data : [],
    error : "",
    isLoading : true
}


export function reducer(state = initialState ,action){

    switch(action.type){
        case IS_FETCHING_DATA : 
            return {...state , isLoading : false}
        case FETCH_DATA :
            return {...state , data : action.payload.data ,isLoading : false} ;
        case ERROR : 
            return {...state , error : action.payload.err }    
        case POST_REQUEST :
            return {...state , data : action.payload.data }      
        default :
            return state ;
    
    }

}

export default reducer ;


