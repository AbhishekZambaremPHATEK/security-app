import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import API from '../../Api/HTTP';
import config from '../../Config';
import { setUserInfo,setRegisterUser } from '../../Redux-Action';
import DashboardView from '../Dashboard/DashboardView';
import LoginView from '../Login/LoginView';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useNavigate } from 'react-router-dom';

import {Card,Box} from '@mui/material';
import './registration.css'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding:20
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



function RegistrationView(props) {
    const classes = useStyles();
    const [password, setPassword] = React.useState("");
    const [confermpassword, setConfermpassword] = React.useState("");
    const [passValid, setPassValid] = React.useState(false);
    const [errorValid, seterrorValid] = React.useState(false);
    const [userName, setuserName] = React.useState("");
    const [errorMessage, seterrorMessage] = React.useState("");
    const history = useNavigate();

    useEffect(() => {
        if(props.getUserData && props.getUserData.status=="success"){
            history(`/dashboard`);
        }else{
            seterrorValid(true);
            // seterrorMessage(props.getUserData.message);
        }
    }, [props.getUserData]);

    const dataSubmit = (e) => {
        e.preventDefault();
        if (password === confermpassword) {
            setPassValid(false);

            let requestOptions = {
                "username": userName,
                "password": password,
                "confirmPassword": confermpassword
            }

            if (userName && password && confermpassword) {
                props.setRegisterUser(requestOptions)
            }
        } else {
            setPassValid(true);
        }

    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfPassword = (e) => {
        setConfermpassword(e.target.value);
    }

    const handleuserName = (e) => {
        setuserName(e.target.value);
    }
    //if (currentPage === "signup") {
    return (
        <Box className='your-class' sx={{ backgroundColor:'#F9FAFB', width:'100vw' , height:'100vh', display: 'flex' }}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Card className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
            </Typography>
                <form className={classes.form} onSubmit={dataSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                autoComplete="uname"
                                className={classes.textField}
                                value={userName}
                                name="userName"
                                variant="outlined"
                                fullWidth
                                id="userName"
                                onChange={handleuserName}
                                label="email or username"
                                autoFocus

                            />
                        </Grid>


                        <Grid item xs={12}>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handlePassword}
                                autoComplete="current-password"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                id="ConPass"
                                label="Confirm Password"
                                type="password"
                                name="cpass"
                                onChange={handleConfPassword}
                                autoComplete="cpass"

                            />
                        </Grid>
                        <Grid item style={{ display: passValid === false ? "none" : "block" }} >
                            <span variant="body2" style={{ color: "red" }}>
                                {"Passwords don't match."}
                            </span>
                        </Grid>
                        <Grid item style={{ display: errorValid === false ? "none" : "block" }} >
                            <span variant="body2" style={{ color: "red" }}>
                                {errorMessage}
                            </span>
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                        </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link className='link' to="/login">{"Already have an account? Sign in"}</Link>
                        </Grid>
                    </Grid>
                </form>
            </Card>

        </Container>
        </Box>
    );

}

const mapStateToProps = state => {
    return {
        getUserData: state.getUserData,
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setRegisterUser
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(RegistrationView);