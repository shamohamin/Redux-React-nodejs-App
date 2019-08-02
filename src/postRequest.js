import {isFetchingData,fetchingData,showError} from './actions /actions';
import axios from 'axios';


export function postsRequest(data){

    return dispatch => {
        axios.post('http://localhost:4001/user/add',{

            first_name : data.first_name,
            last_name : data.last_name,
            age : data.age ,
            gender : data.gender,
            phone_number : data.phone_number

        }).then(res => console.log(res))
        .then( () =>{
            dispatch(isFetchingData());
            axios.get('http://localhost:4001/user')
            .then(res => {
                const items = res.data ;
                console.log(items) ;
                dispatch(fetchingData(items));
                return items ;
            }).catch(err => dispatch(showError(err)))
        })
        .catch(err => dispatch(showError(err)))

    }

}

export default postsRequest;

