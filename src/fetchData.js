import axios from 'axios' ;
import {fetchingData,isFetchingData,showError} from './actions /actions';

export function fetchData(pageNumber){
    
    return dispatch => {
        console.log("hello")
        dispatch(isFetchingData());
        console.log(`http://localhost:4001/user/?page=${pageNumber}`);
        axios.get(`http://localhost:4001/user?page=${pageNumber}`)
        .then(res => {
            const items = res.data ;
            console.log(items) ;
            dispatch(fetchingData(items)) ;
            return items ;
        })
        .catch(err => {
            dispatch(showError(err));
        })

    }

}