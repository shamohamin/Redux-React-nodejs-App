import React from 'react' ;
import ReactDOM from 'react-dom' ;
import './App.css' ;
import {connect} from 'react-redux' ;
import {fetchData} from './fetchData';
import postRequest from './postRequest';
import { bindActionCreators } from '../../../Library/Caches/typescript/3.5/node_modules/@types/react-redux/node_modules/redux';

export class App extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      first_name : "",
      last_name : "",
      age : Number ,
      gender : "" ,
      phone_number : Number 
    }
    this.onChange = this.onChange.bind(this);
    //this.h = this.
  }


  componentDidMount(){
    this.props.fetchData();
  }

  clear = () => {

    var first_name = document.getElementById('first_name') ;
    ReactDOM.findDOMNode(first_name).value = "" ;
    var last_name = document.getElementById('last_name') ;
    ReactDOM.findDOMNode(last_name).value = "" ;
    var age = document.getElementById('age') ;
    ReactDOM.findDOMNode(age).value = "" ;
    var phone_number = document.getElementById('phone_number') ;
    ReactDOM.findDOMNode(phone_number).value = "" ;

  }

  onChange = event => {
    console.log(event.target.value) ;
    const target = event.target ;
    this.setState({ [target.name] : target.value }) ;
  } 

  onSubmit = event => {
    event.preventDefault();
    
    const data = {
      first_name : this.state.first_name,
      last_name : this.state.last_name,
      age : this.state.age,
      gender : this.state.gender,
      phone_number : this.state.phone_number
    }

    this.props.postRequest(data) ;
    this.clear();

  }


  render(){
    return(
      <div>
{/*         
        <form onSubmit={this.onSubmit}>

          <input id="first_name" type="text" placeholder="first_name" name="first_name" onChange={e => this.onChange(e)} required={true} />
          <input id="last_name" type="text" placeholder="last_name" name="last_name" onChange={e => this.onChange(e)} required={true} />
          <input id="age" type="text" placeholder="age" name="age" required={true} onChange={e => this.onChange(e)} />
          <input id="phone_number" type="text" placeholder="phone_number" name="phone_number" onChange={e => this.onChange(e)} required={true} />
          <input type="radio" onClick={e => this.onChange(e) } name = "gender" value="female" />female
          <input type="radio" onClick={e => this.onChange(e) } name = "gender" value="male" />male
          <input type="submit" />
          <button onClick={this.clear} value="clear"  name= "clear">clear</button>

        </form> */}

        <br/>
        <br/>
        {
          !this.props.isLoading ? 
          <ul>
            {this.props.data.map(i => <li>{i.first_name}</li>)}
          </ul> 
          : console.log(this.props.data) 
        }
      </div>
    );

  }



}

const mapStateToProps = state => ({

  data : state.data,
  error : state.error,
  isLoading : state.isLoading  

})

const mapDispatchToProps = dispatch => bindActionCreators({

  fetchData : () => fetchData() ,
  postRequest : postRequest

},dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
