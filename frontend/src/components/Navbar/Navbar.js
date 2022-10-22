import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import generatedtext from '../../images/generatedtext.png';
import booklogo from '../../images/booklogo.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        navigate.push('/');

        setUser(null);
    }


    useEffect(() => {
        const token = user?.token;

        //JWT

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    console.log(user);

    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img src={generatedtext} alt="icontext" height="45px" />
          <img className={classes.image} src={booklogo} alt="iconogo" height="40px" />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
}

export default Navbar