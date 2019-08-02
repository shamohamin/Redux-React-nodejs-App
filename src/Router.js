import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import Register from './Register';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';

export function router() {

  return(
    <React.Fragment >
      {/* <MenuList>
        <MenuItem component={Link} to="/">
          Home
        </MenuItem>
        <MenuItem component={Link} to="/login">
          Login
        </MenuItem>
      </MenuList> */}

    {/* <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <div>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/features">Register</Nav.Link>
            <Nav.Link href="/pricing">Show</Nav.Link>
          </Nav>
          </div>
      </Container>
    </Navbar> */}

        {/* <nav class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" href="/Home">Home</a>
              <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          </div>
        </nav> */}


      <Router style={{margin : 30}}>
        <div>
          <nav className="navbar navbar-expand-sm variant-dark navbar-dark bg-dark">
          <a className="navbar-brand" href="/" style={{color:"red"}}>Menu</a>
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/Register'} className="nav-link">Register</Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={App} />
              <Route path='/Register' component={Register} />
              {/* <Route path='/about' component={About} /> */}
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  
  );

}

export default router;