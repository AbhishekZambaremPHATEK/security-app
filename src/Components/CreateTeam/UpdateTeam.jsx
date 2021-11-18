import {
    Box, Button,
    Chip,
    Grid, Card, Typography
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/lab/Autocomplete";
import React, { useEffect, useState } from 'react';
// import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import API from '../../Api/HTTP';
import config from '../../Config';
import { setUserInfo,setUpdateTeam,setSearchMembers } from '../../Redux-Action';
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


function UpdateTeam({setUpdateTeam,getUpdateTeam,setSearchMembers,getSearchMembers,getUserData}) {
    let defaMembers = [];
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
    const [teamGetData, setteamGetData] = React.useState(null);
    const [updateTeamId, setupdateTeamId] = React.useState(null);


    const [teamMembers, setteamMembers] = React.useState([]);


    useEffect(() => {
        if(getSearchMembers && getSearchMembers.status=="success"){
            setTeamOptions(getSearchMembers.members);
        }else if (getSearchMembers && getSearchMembers.status === "fail") {
            seterrorValid(null);
       } 
    }, [getSearchMembers]);

    useEffect(() => {
        if(getUpdateTeam && getUpdateTeam.status=="success"){
            setModelOpen1(true);
        }else if (getUpdateTeam && getUpdateTeam.status === "fail") {
            seterrorValid(true);
            seterrorMessage(getUpdateTeam.message);
       } 
    }, [getUpdateTeam]);

    useEffect(() => {
        if (teamGetData === null || teamGetData === undefined || teamGetData.length === 0 || teamGetData === "") {
            { getTeamData() }
        }


    });

    const getTeamData = () => {
        if (localStorage.getItem("editTeamId") !== null && localStorage.getItem("editTeamId") !== undefined) {

            let Id = localStorage.getItem("editTeamId");
            let url = config.commonapi + "team/" + Id;

            API.sendGetRestRequest(url, "GET").then((response) => {
                let resp = response;
                setTeamName(response.data.teamname);
                setTeamEmail(response.data.teamemail);
                setteamGetData(resp);
                setupdateTeamId(response.data.id);
                for (var i = 0; i < response.data.members.length; i++) {
                    defaMembers.push(response.data.members[i]);
                }
                localStorage.setItem('selectUpdateTeam', JSON.stringify(defaMembers))

                setteamMembers(defaMembers);
                setTeamOptions(response.data.members);

            }).catch((errorResp) => {
                seterrorValid(null);
            })

        }

    }

    const getTeamNams = (e) => {
        setTeamName(e.target.value);
        seterrorValid(false);

    }

    const handleTeamEmail = (e) => {
        setTeamEmail(e.target.value);
        seterrorValid(false);
    }


    setInterval(() => {
        const storage =getUserData;
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
        //"http://192.168.2.112:5002/team";

        var storage = getUserData;
        var members = null;
        var selTeamObj = localStorage.getItem('selectUpdateTeam');
        if (selTeamObj != null) {

            // localStorage.removeItem("selectTeam")
            var storagedata = JSON.parse(selTeamObj);

            members = storagedata.map((number) => number);
        }
        let requestOptions = {
            //"teamname": teamName,
            //"teamemail": teamEmail,
            "members": members,
            "user_id": storage.user_id,
            //"action": "update",
            "id": updateTeamId
        }
        // if (teamName && teamEmail) {
            setUpdateTeam(requestOptions)
        // API.sendPostRestRequest(config.commonapi + "team/update-team", 'POST', requestOptions).then((response) => {
        //     if (response.status === "fail") {
        //         seterrorValid(true);
        //         seterrorMessage(response.message);
        //     } else if (response.status === "success") {
        //         setModelOpen1(true);
        //         // alert("Team Updated Successfully");
        //         // localStorage.removeItem("selectUpdateTeam");
        //         // let path = `/team`;
        //         // history(path);

        //     }

        // }).catch((errorResp) => {
        //     seterrorValid(true);
        //     seterrorMessage(errorResp.message);
        // })
    }



    const renderPage = () => {
        // console.log(teamMembers);
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
                                    Update Team
                                 </Typography>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item style={{ display: errorValid === false ? "none" : "block" }} >
                                        <span variant="body2" style={{ color: "red" }}>
                                            {errorMessage}
                                        </span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="firstName"
                                            onChange={getTeamNams}
                                            name="firstName"
                                            inputProps={{ readOnly: true }}
                                            label="Team Name"
                                            value={teamName}
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField
                                            required
                                            id="lastName"
                                            name="email"
                                            inputProps={{ readOnly: true }}
                                            value={teamEmail}
                                            onChange={handleTeamEmail}
                                            type="email"
                                            label="Team Email"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            onChange={(event, value) => localStorage.setItem('selectUpdateTeam', JSON.stringify(value))}
                                            options={teamoption}
                                            getOptionLabel={(option) => option}
                                            defaultValue={defaMembers}
                                            renderTags={(teamMembers, getTagProps) =>
                                                teamMembers.map((option, index) => (
                                                    // {console.log(option)}
                                                    <Chip
                                                        variant="outlined"
                                                        label={option}
                                                        size="small"
                                                        {...getTagProps({ index })}
                                                    />
                                                ))
                                            }

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


                                    <Grid item item xs={3} style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            onClick={dataSubmitCreatTeam}
                                        >
                                            Update
                                    </Button>
                                    </Grid>

                                    <Grid item item xs={9} style={{ marginTop: 16 }}>
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
                    <ApiResponceAlert urlRedirect={"/team"} body={"Team Updated Successfully"} show={openModel1} onclick={deleteClose} />
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
        getUpdateTeam:state.getUpdateTeam,
        getSearchMembers:state.getSearchMembers
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setUpdateTeam,
        setSearchMembers
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(UpdateTeam);