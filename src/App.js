import React from 'react' ;
//import ReactDOM from 'react-dom' ;
import './App.css' ;
import {connect} from 'react-redux'  ;
import {fetchData} from './fetchData' ;
import postRequest from './postRequest' ;
import { bindActionCreators } from '../../../Library/Caches/typescript/3.5/node_modules/@types/react-redux/node_modules/redux';
import deleteRequest from './deleteRequest' ;
import Pagination from 'material-ui-flat-pagination' ;
import {createMuiTheme , MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseline';

const theme = createMuiTheme();

export class App extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      activePage : 0 ,
    }
  }

  componentDidMount(){
    this.props.fetchData(this.state.activePage + 1) ;
  }

  delete = (id) => {
    this.props.deleteRequest(id);
  }

  range = (start , end ) => {
    let pages = [] ;
    while(start !== end){
      pages.push(start);
      start++;
    }
    return pages ;
  }

  handelChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`)
    this.setState({activePage : pageNumber},() => this.componentDidMount());
  }

  render(){
    console.log(this.props);
    const {data} = this.props.data ;
    return(
      <div>
        {
          !this.props.isLoading ? 
          <ul>
            {data.docs.map(i => <li key={i.id}>{i.first_name}</li>)}
          </ul> 
          : console.log(this.props.data) 
        }
      <MuiThemeProvider theme={theme}>
        <CssBaseLine />
        <Pagination 
            offset={this.state.activePage}
            limit={1}
            total={3}
            onClick={ (e,offset) => this.handelChange(offset)
          }
          />
        </MuiThemeProvider>
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

  fetchData : fetchData ,
  postRequest : postRequest ,
  deleteRequest : deleteRequest

},dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
