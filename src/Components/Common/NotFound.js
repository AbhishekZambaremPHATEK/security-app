import { Typography } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useNavigate } from 'react-router-dom';


function NotFound(props) {
  const logoutClick = () => {
    localStorage.removeItem("user");
    localStorage.clear();
    if (props.getUserData !== undefined) {

      props.setUserInfo(null);

    }

  }

  const validToken = () => {
    const token = localStorage.getItem('user');
    var storage = JSON.parse(token);
    if (token !== null && storage !== null) {
      localStorage.removeItem("user");
      localStorage.clear();
      return true
  
    } else {
        return true;
    }
}


  if (validToken() === true) {
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          404 - Not Found!
          </Typography>
        <Link to="/login" onClick={logoutClick}>
          Go Home
    </Link>

      </div>
    );
  }
}

export default NotFound;