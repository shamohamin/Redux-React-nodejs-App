import axios from 'axios' ;
import {fetchingData,isFetchingData,showError} from './actions /actions';

export function fetchData(){
    
    return dispatch => {
        console.log("hello")
        dispatch(isFetchingData());
        axios.get('http://localhost:4001/user')
        .then(res => {
            const items = res.data ;
            console.log(items);
            dispatch(fetchingData(items));
            return items;
        })
        .catch(err => {
            dispatch(showError(err));
        })

    }

}