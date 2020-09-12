import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
  Link,
} from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";

import Login from "./components/Login";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import SingleBlog from "./components/SingleBlog";
import SignupPage from "./components/Signup";


const intializeLogin = () => {
  if (window.localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

function App() {
  const [loggedIn, setLoggedIn] = useState(intializeLogin());
  const [user, setUser] = useState({});

  const history = useHistory();

  const logout = () => {
    window.localStorage.clear();
    setLoggedIn(false);
    // history.push('/login');
  };
  return (
    <div>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            
            <Link to="/"><Button variant="secondary">Home</Button></Link>
            <Link to="/blogs"><Button variant="secondary">Blogs</Button></Link>
            <Button variant="secondary" onClick={logout}>
              {loggedIn ? "Sign out" : "Sign in"}
            </Button>
          </Nav>
        </Navbar>

        <Switch>
          <Route exact path="/login">
            <Login setLoggedIn={setLoggedIn} setUser={setUser} />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/blogs">
            {loggedIn ? <Blogs user={user} /> : <Redirect to="/login" />}
          </Route>

          <Route exact path={'/blogs/:id'}>
              <SingleBlog/>
          </Route>

          <Route exact path='/signup'>
            <SignupPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
