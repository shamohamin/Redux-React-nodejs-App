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
            gender : "",
            errors : {
                first_name_err : "",
                last_name_err : "",
                age_err : "" ,
                gender_err : "",
                phone_number : ""
            }
        };

        this.onSubmit = this.onSubmit.bind(this) ;
        this.onChange = this.onChange.bind(this) ;
        this.handelValidate = this.handelValidate.bind(this) ;
        this.changeClassName = this.changeClassName.bind(this) ;

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
        
        this.setState({[event.target.name] : event.target.value} , () => {
            this.handelValidate();
        }) ;

    }
    

    handelValidate(){

        let errors = {
            first_name_err : "A" ,
            last_name_err : "A" ,
            age_err : "A" ,
            gender_err : "A" ,
            phone_number : "A"
        } ;
        let isValid = true ;
        let first_name = this.state.first_name;
        let pattern = /^[a-zA-Z]+$/;

        
        if(parseInt(first_name.length) === 0){
            isValid = false ;
            errors["first_name_err"] = "Cant Be Empty";
        }

        if(typeof errors["first_name_err"] !== "undefined"){
            if(!pattern.test(first_name)){
                isValid = false ;
                errors["first_name_err"] = " It Must Be letters " ;
                //console.log(errors["first_name_err"])
            }
        }

        if(this.state.last_name.length === 0){
            isValid = false ;
            errors["last_name_err"] = "Cant Be Empty"
        }
        if(typeof errors["last_name_err"] !== "undefined"){
            if(!this.state.last_name.match(/^[a-zA-Z]+$/)){
                isValid = false ;
                errors["last_name_err"] = "It must Be letters"
            }
        }

        if(this.state.age.length === 0 ){
            isValid = false ;
            errors["age_err"] = "It Cant Be Empty"
        }

        if(typeof errors["age_err"] !== "undefined"){
            if(!(/^[0-9]+$/).test(this.state.age)){
                isValid = false ;
                errors["age_err"] = " Must Be Number " ;
            }
        }

        if(this.state.phone_number.length === 0){
            isValid = false ;
            errors["phone_number"] = "it Cant Be Empty";
        }

        if(typeof errors["phone_number"] !== 'undefined'){
            if(!(/[0-9]+$/).test(this.state.phone_number)){
                isValid = false ;
                errors["phone_number"] = "Must Be Number" ;
            }
        }

        this.setState({errors : errors },()=>{
            console.log(this.state);
        })
        return isValid ;

    }

    componentDidUpdate = () => {
        //this.handelValidate();
        console.log("updated")
    }

    onSubmit = (event) => {

        event.preventDefault();

        if(this.handelValidate()){
            
            const data = {
                first_name : this.state.first_name ,
                last_name : this.state.last_name ,
                age : this.state.age , 
                gender : this.state.gender,
                phone_number : this.state.phone_number
            }
            this.props.postRequest(data);
            this.clear();


        }else{

            alert("You Fucked Man ")
            
        }

    }

    changeClassName(len){

        if(len === 0){
            return "form-control" ;
        }else if(len > 1){
            return "form-control is-invalid" ;
        }else if(len === 1){
            return "form-control is-valid" ; 
        }

    }


    render(){
        return (
            <div className="divBorder">
                <form onSubmit={this.onSubmit} className="needs-validation" noValidate autoComplete="off">
                    <div className="form-col form-control-large">
                        <div className="row-md-4 mb-3 is-valid">
                            <label htmlFor="fist_name" className="col-form-label-lg">First_name</label>
                            <input 
                                name = "first_name"
                                type="text" 
                                className = {this.changeClassName(parseInt(this.state.errors.first_name_err.length))} 
                                id="first_name"
                                placeholder="first_name"
                                onChange = {e => this.onChange(e)}
                                required 
                            />
                            <hr/>
                            <div className="valid-feedback">
                                Looks Good !
                            </div>
                            <div className="invalid-feedback" >
                                {this.state.errors.first_name_err}
                            </div>
                        </div>
                        <Spacer grow='0.08' />
                        <div className="row-md-5 mb-4">
                            <label htmlFor="last_name" className="col-form-label-lg ">Last_name</label>
                            <input
                                name = "last_name"
                                type="text" 
                                className={this.changeClassName(parseInt(this.state.errors.last_name_err.length))}
                                id="last_name"
                                placeholder="last_name"
                                onChange = {e => this.onChange(e)}
                                required
                                />
                                <hr/>
                            <div className="valid-feedback">
                                Looks Good !
                            </div>
                            <div className="invalid-feedback">
                                {this.state.errors.last_name_err}
                            </div>
                        </div>
                        <Spacer grow='0.1' width='20px'/>
                        <div className="row-md-4 mb-3">
                            <label htmlFor="age" className="col-form-label-lg">Age</label>
                            <input 
                                name="age"
                                type="text"
                                className={this.changeClassName(this.state.errors.age_err.length)}
                                id="age"
                                placeholder="Age"
                                onChange = {e => this.onChange(e)}
                                required
                                />
                            <div className="valid-feedback">
                                Please Enter Your Age !
                            </div>
                            <div className="invalid-feedback" >
                                {this.state.errors.age_err}
                            </div>
                        <hr/>
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
                                <hr/>
                            <div className="row-md-4 mb-3">
                                <label htmlFor="phone_number" className="col-form-large-lg">Phone_number</label>
                                <input
                                    name="phone_number" 
                                    type="text" 
                                    className={this.changeClassName(this.state.errors.phone_number.length)}
                                    placeholder="Phone_number"
                                    id="phone_number"
                                    onChange = {e => this.onChange(e)}
                                    required
                                    />
                                <div className="valid-feedback">
                                    Looks Good !
                                </div>
                                <div className="invalid-feedback">
                                    {this.state.errors.phone_number}
                                </div>
                            </div>
                            <hr/>
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