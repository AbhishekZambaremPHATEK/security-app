import {
    Box, Button,
    Grid, Card, Typography
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/lab/Autocomplete";
import React,{useEffect} from 'react';
// import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import API from '../../Api/HTTP';
import config from '../../Config';
import { setUserInfo,setAddTeam,setSearchMembers,setAddTeamDirect } from '../../Redux-Action';
import ApiResponceAlert from '../Common/ApiResponceAlert';
import TokenValidation from '../Common/TokenValidation';
import MenueItem from '../MenuItems/MenueItem';
import AlertDialog from '../ModelPopup/AlertDialog';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        "& > * + *": {
            marginTop: theme.spacing(3)
        }
    },

    chip: {
        margin: theme.spacing(0.5),
    },

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


function CreateTeam({setAddTeam,getAddTeam,setSearchMembers,getSearchMembers,getUserData,setAddTeamDirect}) {
    let top100Films = [];
    const classes = useStyles();
    const theme = useTheme();
    const [openModel, setModelOpen] = React.useState(false);
    const [openModel1, setModelOpen1] = React.useState(false);
    const history = useNavigate();
    const [errorMessage, seterrorMessage] = React.useState("");
    const [errorValid, seterrorValid] = React.useState(false);
    const [teamName, setTeamName] = React.useState("");
    const [teamNameInput, setTeamNameInput] = React.useState("");
    const [teamoption, setTeamOptions] = React.useState([]);
    const [teamEmail, setTeamEmail] = React.useState("");
    const [selectedState, setSelectedState] = React.useState([""]);



    useEffect(() => {
        return () => {
            setAddTeamDirect(null);
          }
    }, []);
 
    useEffect(() => {
        if(getSearchMembers && getSearchMembers.status=="success"){
            setTeamOptions(getSearchMembers.members);
        }else if (getSearchMembers && getSearchMembers.status === "fail") {
            seterrorValid(null);
       } 
    }, [getSearchMembers]);

    useEffect(() => {
        if(getAddTeam && getAddTeam.status=="success"){
            setModelOpen1(true);
        }else if (getAddTeam && getAddTeam.status == "fail") {
            seterrorValid(true);
            seterrorMessage(getAddTeam.message);
       } 
    }, [getAddTeam]);


    const getTeamNams = (e) => {
        setTeamName(e.target.value);
        seterrorValid(false);

    }

    const handleTeamEmail = (e) => {
        setTeamEmail(e.target.value);
        seterrorValid(false);
        var atposition = e.target.value.indexOf("@");
        var dotposition = e.target.value.lastIndexOf(".");
        if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= e.target.value.length) {
            seterrorMessage("email is not valid");
            seterrorValid(true);
        } else {
            seterrorValid(false);
        }
    }


    setInterval(() => {
        const storage = getUserData;
        if ( storage !== null) {
            var strDateTime = storage.exp;
            var result = strDateTime - (new Date().getTime() / 1000);
            if (result < 60) {
                handleClickOpen();
            }
        }
    }, 15000);

    const handleClickOpen = () => {
        setModelOpen(true);
    };

    const handleModelClose = () => {
        setModelOpen(false);
    };

    const deleteClose = () => {
        setModelOpen1(false);
    };

    const onSubmit = async values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        window.alert(JSON.stringify(values, 0, 2));
    };

    const dataSubmit = (e) => {
    }

    const dataCancel = (e) => {
        let path = `/team`;
        history(path);
    }

    const dataSubmitCreatTeam = (e) => {
        e.preventDefault();
        seterrorValid(false);

        var storage =getUserData;
        var members = "";
        var selTeamObj = localStorage.getItem('selectTeam');
        if (selTeamObj != null) {

            //localStorage.removeItem("selectTeam")
            var storagedata = JSON.parse(selTeamObj);

            members = storagedata.map((number) => number);

        }
        let requestOptions = {
            "teamname": teamName,
            "teamemail": teamEmail,
            "members": members,
            "user_id": storage.user_id,
            //"action": "create"
        }
        // if (teamName && teamEmail) {
        var atposition = teamEmail.indexOf("@");
        var dotposition = teamEmail.lastIndexOf(".");
        if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= teamEmail.length) {
            seterrorMessage("email is not valid");
            seterrorValid(true);
        } else {
            setAddTeam(requestOptions)
            // API.sendPostRestRequest(config.commonapi + "team/create-team", 'POST', requestOptions).then((response) => {
            //     if (response.status === "fail") {
            //         seterrorValid(true);
            //         seterrorMessage(response.message);
            //     } else if (response.status === "success") {
            //         setModelOpen1(true);
            //     }

            // }).catch((errorResp) => {
            //     seterrorValid(true);
            //     seterrorMessage(errorResp.message);
            // })

        }
    }



    const renderPage = () => {
        return (
            <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                {/* <Form
                    onSubmit={dataSubmit}
                    initialValues={{ employed: true, stooge: 'larry' }}
                    // validate={validate}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => ( */}
                        <form onSubmit={dataSubmit}>
                            <Card style={{ padding: 16 }}>
                                <Typography variant="h6" align="center" noWrap>
                                    Create Team
                                 </Typography>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item style={{ display: errorValid === false ? "none" : "block" }} >
                                        <span variant="body2" style={{ color: "red" }}>
                                            {errorMessage}
                                        </span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            name="firstName"
                                            component={TextField}
                                            type="text"
                                            label="Team Name"
                                            onChange={getTeamNams}

                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            name="email"
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="email"
                                            label="Team Email"
                                            onChange={handleTeamEmail}
                                        />
                                        {/* <TextValidator
                                            label="Email"
                                            onChange={handleTeamEmail}
                                            name="email"
                                            value={teamEmail}
                                            validators={['required', 'isEmail']}
                                            errorMessages={['this field is required', 'email is not valid']}
                                        /> */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            onChange={(event, value) => localStorage.setItem('selectTeam', JSON.stringify(value))}
                                            options={teamoption}
                                            getOptionLabel={(option) => option}
                                            //={[top100Films[1]]}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Add Team Members"
                                                    placeholder="Add Team Members"
                                                    onChange={(e)=> setSearchMembers(e.target.value)}

                                                />
                                            )}
                                        />
                                    </Grid>


                                    <Grid item xs={2} style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            onClick={dataSubmitCreatTeam}
                                        >
                                            Save
                                            </Button>
                                    </Grid>

                                    <Grid item xs={10} style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            onClick={dataCancel}
                                        >
                                            Cancel
                                            </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                        </form>
                    {/* )}
                /> */}
                <Box mt={5}>
                    <AlertDialog show={openModel} handleModelClose={handleModelClose} />
                </Box>
                <Box mt={5}>
                    <ApiResponceAlert urlRedirect={"/team"} body={"Team Created Successfully"} show={openModel1} onclick={deleteClose} />
                </Box>
            </div>


        );

    }




    if (TokenValidation.validToken(getUserData) === true) {

        return renderPage()
        // return (

        //     <div className={classes.root}>
        //         {<MenueItem></MenueItem>}
        //         <main className={classes.content}>
        //             <div className={classes.toolbar} />

        //             {renderPage()}
        //             <div>


        //             </div>

        //         </main>
        //     </div>


        // );

    } else {
        return <Navigate to='/login' />
    }
}

const mapStateToProps = state => {
    return {
        getUserData: state.getUserData,
        getAddTeam:state.getAddTeam,
        getSearchMembers:state.getSearchMembers
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setAddTeam,
        setSearchMembers,
        setAddTeamDirect
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(CreateTeam);