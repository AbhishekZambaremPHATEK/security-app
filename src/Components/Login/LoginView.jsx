import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SecurityIcon from '@mui/icons-material/Security';
import PropTypes from "prop-types";
import React, { Component,useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import API from '../../Api/HTTP';
import config from '../../Config';
import { setUserInfo } from '../../Redux-Action';
import "./login.css";


class LoginView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            submit: false,
            isValidate: false,
            currentPage: "login",
            errorMessage: "",
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.getUserData!=this.props.getUserData){
            if(this.props.getUserData && this.props.getUserData.status=="success"){
                localStorage.setItem('user', JSON.stringify(this.props.getUserData));
                this.setState({ submit: true });
                console.log("update sucsses")
            }else if (this.props.getUserData && this.props.getUserData.status === "fail") {
                this.setState({ isValidate: true });
                this.setState({ errorMessage: this.props.getUserData.message });
                console.log("update fail")
           } 
        }
    }


    classes = makeStyles((theme) => ({
        // paper: {
        //     marginTop: theme.spacing(8),
        //     display: 'flex',
        //     flexDirection: 'column',
        //     alignItems: 'center',
        //     padding:'10px'
        // },
        // avatar: {
        //     margin: theme.spacing(1),
        //     backgroundColor: theme.palette.secondary.main,
        // },
        // form: {
        //     width: '100%', // Fix IE 11 issue.
        //     marginTop: theme.spacing(1),
        // },
        // submit: {
        //     margin: theme.spacing(3, 0, 2),
        // },
    }));
    handleUserChange = (e) => {
        const value = e.target.value;
        this.setState({ username: value });
    }
    handlePassChange = (e) => {
        const value = e.target.value;
        this.setState({ password: value });
    }

    openRegistration = () => {
        this.setState({ currentPage: "registration" });

        return (<Navigate to="/registration" />)
    }

    renderPage = () => {
        return (
            // <div className="abc">
            <Box  className='your-class' sx={{ backgroundColor:'#F9FAFB', width:'100vw' , height:'100vh', display: 'flex' }}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Card className={this.classes.paper} style={{ padding:20, marginTop: 74 }}>
                        <Avatar className={this.classes.avatar} id="loginicon" style={{ backgroundColor:'#1CCAFF',left: '45%' }}>
                            <SecurityIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{ textAlign: "center", marginTop: 13 }}>
                            Sign in
                        </Typography>
                        <form className={this.classes.form} onSubmit={this.handleSubmit} style={{ marginTop: 13 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                required
                                onChange={this.handleUserChange}
                                label="email or username"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                name="password"
                                label="Password"
                                onChange={this.handlePassChange}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Grid item style={{ display: this.state.isValidate === false ? "none" : "block" }} >
                                <span variant="body2" style={{ color: "red" }}>
                                    {this.state.errorMessage}
                                </span>
                            </Grid>
                            <Grid container style={{ marginTop: 15 }}>
                                <Grid item xs>

                                </Grid>

                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.classes.submit}
                            >
                                Sign In
                          </Button>
                            <Grid container style={{ marginTop: 15 }}>
                                <Grid item xs>
                                    <Link className='link' to="/login" variant="body2">
                                        Forgot password?
                                     </Link>
                                </Grid>
                                <Grid item>
                                    <Link className='link' to="/registration">{"Don't have an account? Sign Up"}</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                    <Box mt={8}>
                        {/* <Copyright /> */}
                    </Box>
                </Container>
            </Box>
            // </div>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        localStorage.setItem('userName', username);

        let requestOptions = {

            "username": this.state.username,
            "password": this.state.password
        }

        if (username && password) {
            this.props.setUserInfo(requestOptions);
            // API.sendPostRestRequest(config.commonapi + "auth/login", 'POST', requestOptions).then((response) => {
            //     if (response.status === "fail") {

            //     } else if (response.status === "success") {
            //         localStorage.setItem('user', JSON.stringify(response));
            //         this.props.setUserInfo(response);
            //         this.setState({ submit: true });
            //     }

            // }).catch((errorResp) => {
            //     this.setState({ isValidate: true });
            //     this.setState({ errorMessage: errorResp.message });
            // })
        }
    }


    render() {
        if (this.state.submit === false) {
            return (this.renderPage())

        }
        else if (this.state.submit === true) {
            return (<Navigate to="/dashboard" />)
        }
    }
}
const mapStateToProps = state => {
    return {
        getUserData: state.getUserData
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(LoginView);
