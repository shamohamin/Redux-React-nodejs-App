import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Spacer from 'react-spacer';
import './Register.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {connect} from 'react-redux';
import postRequest from './postRequest';
import { bindActionCreators } from '../../../Library/Caches/typescript/3.5/node_modules/@types/react-redux/node_modules/redux';

export class  Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name : "" ,
            last_name : "" ,
            age : Number ,
            phone_number : Number ,
            gender : ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    clear = () => {

        var first_name = document.getElementById('first_name');
        ReactDOM.findDOMNode(first_name).value = "";
        var last_name = document.getElementById('last_name') ;
        ReactDOM.findDOMNode(last_name).value = "" ;
        var age = document.getElementById('age') ;
        ReactDOM.findDOMNode(age).value = "" ;
        var phone_number = document.getElementById('phone_number') ;
        ReactDOM.findDOMNode(phone_number).value = "" ;
    }

    onChange(event){
        console.log(event.target.value);
        this.setState({[event.target.name] : event.target.value});
    }


    onSubmit = (event) => {

        event.preventDefault();
        const data = {
            first_name : this.state.first_name ,
            last_name : this.state.last_name ,
            age : this.state.age , 
            gender : this.state.gender,
            phone_number : this.state.phone_number
        }
        this.props.postRequest(data);
        this.clear();

    }


    render(){
        console.log(this.props);
        return (
            <div className="divBorder">
                <form onSubmit={this.onSubmit} className="needs-validation" noValidate autoComplete="off">
                    <div className="form-row form-control-large">
                        <div className="row-md-4 mb-3">
                            <label htmlFor="fist_name" className="col-form-label-lg">First_name</label>
                            <input 
                                name = "first_name"
                                type="text" 
                                className="form-control" 
                                id="first_name"
                                placeholder="first_name"
                                onChange = {e => this.onChange(e)}
                                required 
                            />
                        <div className="valid-feedback">
                                Looks Good !
                        </div>
                        <div className="invalid-feedback">
                                Please Enter Your First_name !
                        </div>
                        </div>
                        <Spacer grow='0.08' />
                        <div className="row-md-5 mb-4">
                            <label htmlFor="last_name" className="col-form-label-lg ">Last_name</label>
                            <input
                                name = "last_name"
                                type="text" 
                                className="form-control"
                                id="last_name"
                                placeholder="last_name"
                                onChange = {e => this.onChange(e)}
                                required
                                />
                            <div className="valid-feedback">
                                Looks Good !
                        </div>
                        <div className="invalid-feedback">
                                Please Enter Your Last_name !
                        </div>
                        </div>
                        <Spacer grow='0.1' width='20px'/>
                        <div className="row-md-4 mb-3">
                            <label htmlFor="age" className="col-form-label-lg">Age</label>
                            <input 
                                name="age"
                                type="text"
                                className="form-control"
                                id="age"
                                placeholder="Age"
                                onChange = {e => this.onChange(e)}
                                required
                                />
                            <div className="invalid-feedback">
                                Please Enter Your Age !
                        </div>
                        <br/>
                        <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender"
                                    onChange = {e => this.onChange(e)}
                                    >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                                <FormControlLabel
                                    value="disabled"
                                    disabled
                                    control={<Radio />}
                                    label="(Disabled option)"
                                    />
                                </RadioGroup>
                            <div className="row-md-4 mb-3">
                                <label htmlFor="phone_number" className="col-form-large-lg">Phone_number</label>
                                <input
                                    name="phone_number" 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Phone_number"
                                    id="phone_number"
                                    onChange = {e => this.onChange(e)}
                                    required
                                    />
                            </div>
                            <div className="btn-group">
                                <input type="submit" className="btn btn-success" />
                                <button className="btn btn-danger" onClick={this.clear}>Clear</button>           
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        );
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({
    postRequest : postRequest
},dispatch);

const mapStateToProps = state => ({
    data : state.data
})

export default connect(mapStateToProps,mapDispatchToProps)(Register);    