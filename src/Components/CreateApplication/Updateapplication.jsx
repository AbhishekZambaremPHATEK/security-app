import {
    Box, Button, FormControl,
    FormControlLabel, FormGroup, FormLabel, Grid, Card, Radio, TextareaAutosize, Typography
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
// import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import API from '../../Api/HTTP';
import config from '../../Config';
import { setUserInfo,setUpdateApp } from '../../Redux-Action';
import TokenValidation from '../Common/TokenValidation';
import MenueItem from '../MenuItems/MenueItem';
import AlertDialog from '../ModelPopup/AlertDialog';
import "./CreateApplication.css";
import Alert from '@mui/lab/Alert';
import ApiResponceAlert from '../Common/ApiResponceAlert';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        checked: {},
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


function Updateapplication({setUpdateApp,getUpdateApp,getUserData}) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openModel, setModelOpen] = React.useState(false);
    const [openModel1, setModelOpen1] = React.useState(false);
    const history = useNavigate();
    const [applicationName, setappName] = React.useState("");
    const [gitRepoUrl, setgitRepoUrl] = React.useState("");
    const [applicatonUrl, setapplicatonUrl] = React.useState("");
    const [applicationport, setapplicationport] = React.useState("");
    const [repoPor, setrepoPort] = React.useState("");  
    const [errorMessage, seterrorMessage] = React.useState("");
    const [errorValid, seterrorValid] = React.useState(false);
    const [sshpubKey, setsshpubKey] = React.useState("");
    const [sshprivateKey, setsshprivateKey] = React.useState("");
    const [dastval, setdastval] = React.useState(false);
    const [gittest, setgittestval] = React.useState("");
    const [apptest, setapptestval] = React.useState("");    
    const [sastval, setsastval] = React.useState(false);
    const [scaval, setscaval] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('External');
    const [selectedAppValue, setSelectedAppValue] = React.useState('Internal');
    const [appGetData, setappGetData] = React.useState(null);
    const [updateTeamId, setupdateTeamId] = React.useState(null);
    const [updateAppId, setupdateAppId] = React.useState(null);

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

    useEffect(() => {
        if(getUpdateApp && getUpdateApp.status=="success"){
            setModelOpen1(true);
        }else if (getUpdateApp && getUpdateApp.status === "fail") {
            alert(getUpdateApp.message);
                seterrorValid(true);
                seterrorMessage(getUpdateApp.message);
       } 
    }, [getUpdateApp]);

    useEffect(() => {
        if (appGetData === null || appGetData === undefined || appGetData.length === 0 || appGetData === "") {
            { getTeamData() }
        }


    });

    const getTeamData = () => {
        if (localStorage.getItem("editeApplicationID") !== null && localStorage.getItem("editeApplicationID") !== undefined) {

            let Id = localStorage.getItem("editeApplicationID");
           let url = config.commonapi +"app/" + Id;
            seterrorValid(false);

            API.sendGetRestRequest(url, "GET").then((response) => {
                // if (response.status === "success") {
                    let resp = response;
                    setappGetData(resp);
                    setSelectedAppValue(response.data.applicationtype);
                    setappName(response.data.applicationname);
                     setapplicatonUrl(response.data.applicationurl);
                     setgitRepoUrl(response.data.gitrepourl);
                     setSelectedValue(response.data.gitrepotype);
                     setdastval(response.data.is_dast);
                     if(!response.data.is_dast){                         
                     setSelectedAppValue('Internal');
                     }
                     setsastval(response.data.is_sast);
                     setscaval(response.data.is_sca);
                     setsshpubKey(response.data.sshkey_pub);
                     if( response.data.applicationport !== -1){
                        setapplicationport(response.data.applicationport);
                     }
                     if(response.data.gitrepoport !== -1){
                        setrepoPort(response.data.gitrepoport);
                     }
                     setupdateTeamId(response.data.team_id);
                     setupdateAppId(response.data.id);
                                   
                // }
               
            }).catch((errorResp) => {
                seterrorValid(null);
            })

        }

    }
    const handleClickOpen = () => {
        setModelOpen(true);
    };

    const handleModelClose = () => {
        setModelOpen(false);
    };

    const deleteClose = () => {
        setModelOpen1(false);
    };



    const getgitRepoUrl = (e) => {
        setgitRepoUrl(e.target.value);
        seterrorValid(false);

    }


    const getapplicationPort = (e) => {
        setapplicationport(e.target.value);
        seterrorValid(false);

    }

    const getapplicationUrl = (e) => {
        setapplicatonUrl(e.target.value);
        seterrorValid(false);
    }
    const getAppName = (e) => {
        setappName(e.target.value);
        seterrorValid(false);

    }

    const onSubmit = async values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        //window.alert(JSON.stringify(values, 0, 2));
    };

    const checkdast = (event) => {
        seterrorValid(false);
        if (event.target.checked === true) {
            setdastval(true);
        } else {
            setapplicatonUrl('');
             setapplicationport('');
            setdastval(false);
            setSelectedAppValue('Internal')
        }
    }

    const checksast = (event) => {
        seterrorValid(false);
        if (event.target.checked === true) {
            setsastval(true);
        } else {
            setsastval(false);
            if (!scaval) {
                setsshpubKey('');
                setgitRepoUrl('');
                setrepoPort('');
                setsshprivateKey('');
                setSelectedValue('External')
            }
        }
    }

    const checksca = (event) => {
        seterrorValid(false);
        if (event.target.checked === true) {
            setscaval(true);
        } else {
            setscaval(false);
            if (!sastval) {
                setgitRepoUrl('');
                setrepoPort('');
                setsshpubKey('');
                setsshprivateKey('');
                setSelectedValue('External')
            }
        }
    }

    const radioChange = (event) => {
        seterrorValid(false);
        setSelectedValue(event.target.value);
        
    };

    const appradioChange = (event) => {
        seterrorValid(false);
        setSelectedAppValue(event.target.value);
    };

    const dataCancel = (e) => {
        let path = `/viewApplication`;
         history(path);
    }

    const dataSubmitApp = (e) => {
        e.preventDefault();
        

        const token = getUserData;
        var user_id = null;
        if (token !== null) {
            var storage = JSON.parse(token);
            user_id = storage.user_id;
        }


        seterrorValid(false);
        let requestOptions = {
            "id" : updateAppId,
	        "applicationname": applicationName,
             "is_sast": sastval,
             "is_dast": dastval,
             "is_sca": scaval,
             "gitrepourl": gitRepoUrl,
	        "gitrepotype": selectedValue,
             "applicationurl": applicatonUrl,
             "applicationtype": selectedAppValue,
	         "sshkey_pub": sshpubKey,
            "sshkey_pvt": sshprivateKey,            
	         "applicationport": applicationport.toString(),
            "gitrepoport": repoPor.toString(),
            "user_id": Number(user_id),
             "team_id" : updateTeamId,
	         "gittest" : gittest,
	         "apptest" : apptest
            
        }
        setUpdateApp(requestOptions)
        // API.sendPostRestRequest(config.commonapi + "app/update-app", 'POST', requestOptions).then((response) => {
        //     if (response.status === "fail") {
        //         seterrorValid(true);
        //         seterrorMessage(response.message);
        //     } else if (response.status === "success") {
        //         setModelOpen1(true);

        //     }

        // }).catch((errorResp) => {
        //     alert(errorResp.message);
        //     seterrorValid(true);
        //     seterrorMessage(errorResp.message);
        // })
        


    }


    const getrepositoryPort = (e) => {
        seterrorValid(false);
        setrepoPort(e.target.value);

    }
    const testappurl = () => {
          let url = config.commonapi +"app/test-app-conn";
        let requestOptions = {
        "applicationurl": "https://www.google.com",
			"applicationport": 80
        }

        API.sendPostRestRequest(url, 'POST', requestOptions).then((response) => {
            if (response.status === "success") {
                setapptestval("success");
            }else  {
               setgittestval("fail")

            }

        }).catch((errorResp) => {
           setapptestval("fail")
        })

    }

    const testrepourl = () => {
          let url = config.commonapi +"app/test-git-conn";
          let requestOptions = {
            "gitrepourl": "https://github.com/githubtraining/hellogitworld",
			"gitrepoport": 80
        }

        API.sendPostRestRequest(url, 'POST', requestOptions).then((response) => {
            if (response.status === "success") {
               setgittestval("success");
            } else  {
               setgittestval("fail")

            }

        }).catch((errorResp) => {
            setgittestval("fail")
        })

    }
    const genrateExtKey = (event) => {
        seterrorValid(false);
        let url = "http://192.168.2.112:5003/generatesshkey";

        API.sendGetRestRequest(url, "GET").then((response) => {

            setsshpubKey(response.sshkey_pub);
            setsshprivateKey(response.sshkey_pvt);

        }).catch((errorResp) => {
            seterrorValid(null);
        })

    }


    const renderPage = () => {
        return (
            <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                {/* <Form onSubmit={onSubmit}
                    initialValues={{ employed: true, stooge: 'larry' }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => ( */}
                        <form onSubmit={onSubmit}>
                            <Card style={{ padding: 16 }}>
                            <Grid item xs={12}>
                                    <Typography variant="h8"  noWrap fullWidth>
                                        Team Name: {localStorage.getItem("teamNameForCreateAndUpdate")}
                                    </Typography>
                                    </Grid>
                           
                                <Typography variant="h6" align="center" noWrap>
                                    Update Application
                                 </Typography>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={12} fullWidth style={{ display: errorValid === false ? "none" : "block" }} >
                                        <span variant="body2" style={{ color: "red" }}>
                                            {errorMessage}
                                        </span>
                                    </Grid>
                                    
                                    <Grid item xs={12}>                                       
                                         <TextField
                                            required
                                            id="firstName"
                                            onChange={getAppName}
                                            name="appName"
                                            label="Application Name"
                                            value={applicationName}
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>

                                    <Grid item xs={4} >
                                        <FormControlLabel
                                            label="SAST"
                                            control={
                                            <Checkbox

                                                    name="sast"
                                                    checked={sastval}
                                                    onClick={checksast}
                                                    value ={sastval}
                                                    type="checkbox"
                                                    color="primary"
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4} >
                                        <FormControlLabel
                                            label="DAST"
                                            control={
                                                <Checkbox
                                                    checked={dastval}
                                                    name="dast"
                                                    color="primary"
                                                    onClick={checkdast}
                                                    type="checkbox"
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4} >
                                        <FormControlLabel
                                            label="SCA"
                                            control={
                                                <Checkbox
                                                    name="sca"
                                                    checked={scaval}
                                                    color="primary"
                                                    onClick={checksca}
                                                    type="checkbox"

                                                />
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12} >
                                        {(sastval || scaval) ? (
                                            <TextField
                                            required
                                            id="giturl"
                                            label="Repository URL"
                                            onChange={getgitRepoUrl}
                                            name="gitRepo"
                                            value={gitRepoUrl}
                                            name="gitRepo"
                                            fullWidth
                                            autoComplete="given-name"
                                        />

                                          
                                        ) : (
                                            <TextField
                                            required
                                            id="giturl"
                                            label="Repository URL"
                                            onChange={getgitRepoUrl}
                                            name="gitRepo"
                                            value={gitRepoUrl}
                                            disabled
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                                
                                            )}

                                    </Grid>

                                    <Grid item xs={7} >
                                    {(sastval || scaval)? (
                                        <TextField
                                        fullWidth
                                        required
                                        name="repoPort"
                                        value ={repoPor}
                                        type="text"
                                        label="Repository Port"
                                        onChange={getrepositoryPort}
                                    />
                                    ):(
                                        <TextField
                                            fullWidth
                                            required
                                            disabled
                                            name="repoPort"
                                            value ={repoPor}
                                            type="text"
                                            label="Repository Port"
                                            onChange={getrepositoryPort}
                                        />
                                    )}
                                        
                                    </Grid>

                                    <Grid item xs={2} >
                                       
                                          {(sastval || scaval) ? (
                                         <Button
                                         onClick={testrepourl}
                                         variant="contained"
                                         color="primary"
                                         type="submit"
                                     >
                                         Test
                                      </Button>
                                          ):(
                                            <Button
                                            disabled
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Test
                                         </Button>
                                          )}
                                    </Grid>
                                     <Grid item xs={3} style={{ display: gittest === "" ? "none" : "block" }}>
                                    {(gittest === "fail") ? (
                                         <Alert severity="error">Fail!</Alert>
                                         ):(
                                        <Alert severity="success">Success!</Alert>
                                         )}
                                    </Grid>



                                    <Grid item xs={12} >
                                        {(dastval) ? (
                                            <TextField
                                            required
                                            id="appurl"
                                            label="Application Url"
                                            onChange={getapplicationUrl}
                                            name="appurl"
                                            value={applicatonUrl}                                            
                                            fullWidth
                                            autoComplete="given-name"
                                        />

                                        ) : (
                                               
                                                <TextField
                                                required
                                                id="appurl"
                                                label="Application Url"
                                                onChange={getapplicationUrl}
                                                disabled
                                                name="appurl"
                                                value={applicatonUrl}
                                                disabled
                                                fullWidth
                                                autoComplete="given-name"
                                            />

                                            )}
                                    </Grid>

                                    
                                    <Grid item xs={7} >
                                    {(dastval)? (
                                        <TextField
                                       
                                         required
                                         id="appPort"
                                         label="Application Port"
                                         onChange={getapplicationPort}                                         
                                         name="appPort"
                                         value={applicationport}
                                         
                                         fullWidth
                                         autoComplete="given-name"
                                        
                                    />
                                    ):(
                                        <TextField
                                            disabled                                  
                                            required
                                         id="appPort"
                                         label="Application Port"
                                         onChange={getapplicationPort}                                         
                                         name="appPort"
                                         value={applicationport}
                                         disabled
                                         fullWidth
                                         autoComplete="given-name"
                                        />
                                    )}
                                        
                                    </Grid>
                                    <Grid item xs={2} >
                                       
                                          {(dastval) ? (
                                         <Button                                         
                                         variant="contained"
                                         color="primary"
                                         type="submit"
                                         onClick={testappurl}
                                     >
                                         Test
                                      </Button>
                                          ):(
                                            <Button
                                            disabled
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Test
                                         </Button>
                                          )}
                                    </Grid>

                                    <Grid item xs={3} style={{ display: apptest === "" ? "none" : "block" }}>
                                    {(gittest === "fail") ? (
                                         <Alert severity="error">Fail!</Alert>
                                         ):(
                                        <Alert severity="success">Success!</Alert>
                                         )}
                                    </Grid>


                                    {(sastval || scaval) ? (
                                        <Grid item>
                                            <FormControl component="fieldset" >
                                                <FormLabel component="legend">Repo Type</FormLabel>
                                                <FormGroup row>
                                                    <FormControlLabel item xs={6}
                                                        label="External"
                                                        control={
                                                            <Radio
                                                                checked={selectedValue === 'External'}
                                                                onChange={radioChange}
                                                                value="External"
                                                                name="radio-button-demo"
                                                                color="primary"
                                                                inputProps={{ 'aria-label': 'External' }}
                                                            />

                                                        }
                                                    />
                                                    <FormControlLabel item xs={6}
                                                        label="Internal"
                                                        control={
                                                            <Radio
                                                                checked={selectedValue === 'Internal'}
                                                                onChange={radioChange}
                                                                color="primary"
                                                                value="Internal"
                                                                name="radio-button-demo"
                                                                inputProps={{ 'aria-label': 'Internal' }}
                                                            />
                                                        }
                                                    />

                                                </FormGroup>
                                            </FormControl>
                                        </Grid>

                                    ) : (

                                            <Grid item>
                                                <FormControl component="fieldset" disabled>
                                                    <FormLabel component="legend">Repo Type</FormLabel>
                                                    <FormGroup >
                                                        <FormControlLabel item xs={6}
                                                            label="External"
                                                            control={
                                                                <Radio
                                                                    checked={selectedValue === 'External'}
                                                                    onChange={radioChange}
                                                                    value="External"
                                                                    name="radio-button-demo"
                                                                    color="primary"
                                                                    inputProps={{ 'aria-label': 'External' }}
                                                                />

                                                            }
                                                        />
                                                        <FormControlLabel item xs={6}
                                                            label="Internal"
                                                            control={
                                                                <Radio
                                                                    checked={selectedValue === 'Internal'}
                                                                    onChange={radioChange}
                                                                    color="primary"
                                                                    value="Internal"
                                                                    name="radio-button-demo"
                                                                    inputProps={{ 'aria-label': 'Internal' }}
                                                                />
                                                            }
                                                        />

                                                    </FormGroup>
                                                </FormControl>
                                            </Grid>

                                        )}

                                    {(dastval) ? (
                                        <Grid item>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Application Type</FormLabel>
                                                <FormGroup row>
                                                    <FormControlLabel item xs={6}
                                                        label="External"
                                                        control={
                                                            <Radio
                                                                checked={selectedAppValue === 'External'}
                                                                onChange={appradioChange}
                                                                value="External"
                                                                name="radio-button-demo"
                                                                color="primary"
                                                                inputProps={{ 'aria-label': 'External' }}
                                                            />

                                                        }
                                                    />
                                                    <FormControlLabel item xs={6}
                                                        label="Internal"
                                                        control={
                                                            <Radio
                                                                checked={selectedAppValue === 'Internal'}
                                                                onChange={appradioChange}
                                                                color="primary"
                                                                value="Internal"
                                                                name="radio-button-demo"
                                                                inputProps={{ 'aria-label': 'Internal' }}
                                                            />

                                                        }
                                                    />

                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                    ) : (
                                            <Grid item>
                                                <FormControl component="fieldset" disabled>
                                                    <FormLabel component="legend">Application Type</FormLabel>
                                                    <FormGroup row>
                                                        <FormControlLabel item xs={6}
                                                            label="External"
                                                            control={
                                                                <Radio
                                                                    checked={selectedAppValue === 'External'}
                                                                    onChange={appradioChange}
                                                                    value="External"
                                                                    name="radio-button-demo"
                                                                    color="primary"
                                                                    inputProps={{ 'aria-label': 'External' }}
                                                                />

                                                            }
                                                        />
                                                        <FormControlLabel item xs={6}
                                                            label="Internal"
                                                            control={
                                                                <Radio
                                                                    checked={selectedAppValue === 'Internal'}
                                                                    onChange={appradioChange}
                                                                    color="primary"
                                                                    value="Internal"
                                                                    name="radio-button-demo"
                                                                    inputProps={{ 'aria-label': 'Internal' }}
                                                                />

                                                            }
                                                        />

                                                    </FormGroup>
                                                </FormControl>
                                            </Grid>

                                        )}
                                    {(scaval || sastval) ? (
                                         <Grid item xs={12}  >
                                         <Button
                                             disabled ={sshpubKey !== ""}
                                             type="button"
                                             variant="contained"
                                             color="primary"
                                             onClick={genrateExtKey}
                                         >
                                             Generate Key
                                      </Button>
                                     </Grid>
                                     ):(
                                        <Grid item xs={12} style={{ display: dastval ? "none" : "none" }} >
                                        <Button
                                            //disabled={}
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            onClick={genrateExtKey}
                                        >
                                            Generate Key
                                     </Button>
                                    </Grid>
                                     )}
                                    <Grid item xs={12} style={{ display: (selectedValue === "I") || (sshpubKey !== '') === false ? "none" : "block" }}>

                                        <TextareaAutosize id="KeyText" readOnly={true} placeholder={sshpubKey} />
                                    </Grid>

                                    <Grid item xs={3} >
                                        <Button
                                            disabled={!dastval && !sastval && !scaval}
                                            onClick={dataSubmitApp}
                                            variant="contained"
                                            color="primary"
                                            type="submit"

                                        >
                                            Update
                                     </Button>
                                    </Grid>

                                    <Grid item xs={9} >
                                        <Button
                                            disabled={!dastval && !sastval && !scaval}
                                            onClick={dataCancel}
                                            variant="contained"
                                            color="primary"
                                            type="submit"

                                        >
                                            Cancel
                                     </Button>
                                    </Grid>


                                </Grid>
                            </Card>
                        </form>
                    {/* )}
                /> */}
                <Box mt={5}>
                    <AlertDialog show={openModel} handleModelClose={handleModelClose} />
                </Box>
                <Box mt={5}>
                        <ApiResponceAlert urlRedirect={"/viewApplication"} body={"Application Updated Successfully."} show={openModel1} onclick={deleteClose} />
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
        getUpdateApp:state.getUpdateApp
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setUpdateApp
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(Updateapplication);