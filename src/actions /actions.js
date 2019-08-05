export const FETCH_DATA = 'FETCH_DATA';
export const IS_FETCHING_DATA = 'IS_FETCHING_DATA';
export const ERROR = 'ERROR';
export const POST_REQUEST = 'POST_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';

export function fetchingData(data){

    return {
        type : FETCH_DATA ,
        payload :{
            data : data
        } 
    }

}

export function isFetchingData(){
    
    return {
        type : IS_FETCHING_DATA
    }

}

export function showError(err){

    return {
        type : ERROR ,
        payload : {
            err : err
        }
    }

}

export function post_request(data){

    return {
        type : POST_REQUEST ,
        payload: {
            data : data
        }
    }

}

export function delete_request(id){
    
    return { 
        type : DELETE_REQUEST ,
    }

}
