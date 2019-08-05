import axios from 'axios' ;
import {showError,isFetchingData,fetchingData} from './actions /actions' ;


export default function deleteRequest(id){

    return dispatch => {
        axios.delete('http://localhost:4001/user/delete/' + id)
        .then(res => {
            console.log(res.data);
        })
        .then(() => {
            dispatch(isFetchingData());
            axios.get('http://localhost:4001/user')
            .then(res => {
                const items = res.data ;
                console.log(items) ;
                dispatch(fetchingData(items));
                return items ;
            })
            .catch(err => dispatch(showError(err)))
        })
        .catch(err => dispatch(showError(err)))
    }

}