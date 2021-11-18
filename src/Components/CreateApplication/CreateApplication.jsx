import {
    Box, Button, FormControl,
    FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Card, Radio, TextareaAutosize, Typography, Checkbox
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/lab/Autocomplete";
// import { Checkbox } from 'final-form-material-ui';
import React,{useEffect} from 'react';
// import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import API from '../../Api/HTTP';
import config from '../../Config';
import { setUserInfo,setAddApp,setAddAppDirect } from '../../Redux-Action';
import ApiResponceAlert from '../Common/ApiResponceAlert';
import TokenValidation from '../Common/TokenValidation';
import MenueItem from '../MenuItems/MenueItem';
import AlertDialog from '../ModelPopup/AlertDialog';
import Alert from '@mui/lab/Alert';
import "./CreateApplication.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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


function CreateApplication({getAddApp,setAddApp,getUserData,setAddAppDirect}) {
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
    const [sastval, setsastval] = React.useState(false);
    const [scaval, setscaval] = React.useState(false);
    const [gittest, setgittestval] = React.useState("");
    const [apptest, setapptestval] = React.useState("");   
    const [selectedValue, setSelectedValue] = React.useState('External');
    const [selectedAppValue, setSelectedAppValue] = React.useState('Internal');


    useEffect(() => {
        return () => {
            setAddAppDirect(null);
          }
    }, []);

    useEffect(() => {
        if(getAddApp && getAddApp.status=="success"){
            setModelOpen1(true);
        }else if (getAddApp && getAddApp.status === "fail") {
            alert(getAddApp.message);
                seterrorValid(true);
                seterrorMessage(getAddApp.message);
       } 
    }, [getAddApp]);

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
        seterrorValid(false);
        setModelOpen(true);
    };

    const handleModelClose = () => {
        seterrorValid(false);
        setModelOpen(false);
    };

    const deleteClose = () => {
        setModelOpen1(false);
    };



    const getgitRepoUrl = (e) => {
        seterrorValid(false);
        setgitRepoUrl(e.target.value);

    }


    const getapplicationPort = (e) => {
        seterrorValid(false);
        setapplicationport(e.target.value);

    }

    const getrepositoryPort = (e) => {
        seterrorValid(false);
        setrepoPort(e.target.value);

    }

    const getapplicationUrl = (e) => {
        seterrorValid(false);
        setapplicatonUrl(e.target.value);
    }
    const getAppName = (e) => {
        seterrorValid(false);
        setappName(e.target.value);

    }

    const onSubmit = async values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
       // window.alert(JSON.stringify(values, 0, 2));
    };

    const checkdast = (event) => {
        seterrorValid(false);
        if (event.target.checked === true) {
            setdastval(true);
        } else {
            setdastval(false);
            setSelectedAppValue('Internal');
            setapplicatonUrl('');
            setapplicationport('');
        }
    }

    const checksast = (event) => {
        seterrorValid(false);
        if (event.target.checked === true) {
            setsastval(true);
        } else {
            setsastval(false);
            if (!scaval) {
                setgitRepoUrl('');
                setrepoPort('');
                setSelectedValue('External')
                setsshpubKey('');
                setsshprivateKey('');
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
                setSelectedValue('External')
                setsshpubKey('');
                setsshprivateKey('');
            }
        }
    }

    const radioChange = (event) => {
        seterrorValid(false);
        setSelectedValue(event.target.value);
        // if (event.target.value == 'Internal') {
        //     setsshpubKey('');
        //     setsshprivateKey('');
        // }
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
            // var storage = JSON.parse(token);
            user_id = token.user_id;
        }

        seterrorValid(false);

        let requestOptions = {
            "applicationname": applicationName,
            "is_sast": sastval,
            "is_dast": dastval,
            "is_sca": scaval,
            "gitrepotype": selectedValue,
            "gitrepourl": gitRepoUrl,
            "applicationurl": applicatonUrl,
            "applicationtype": selectedAppValue,
            "applicationport": applicationport,
            "gitrepoport": repoPor,
            "user_id": Number(user_id),
            "team_id": Number(localStorage.getItem("CreateAppTeamID")),
            "sshkey_pub": sshpubKey,
            "sshkey_pvt": sshprivateKey ,           
			"gittest" : gittest,
			"apptest" : apptest
        }
   
            setAddApp(requestOptions)
        // API.sendPostRestRequest(config.commonapi + "app/create-app", 'POST', requestOptions).then((response) => {
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

     const testappurl = () => {
          let url = config.commonapi +"app/test-app-conn";
        let requestOptions = {
        "applicationurl": applicatonUrl,
        // "https://www.google.com",
			"applicationport": 80
        }

        API.sendPostRestRequest(url, 'POST', requestOptions).then((response) => {
            console.log(response.status)
            if (response.status === "success") {
                setapptestval("success");
            }else  {
                setapptestval("fail")
            }

        }).catch((errorResp) => {
            console.log("error in catch")
           setapptestval("fail")
        })

    }

    const testrepourl = () => {
          let url = config.commonapi +"app/test-git-conn";
          let requestOptions = {
            "gitrepourl": gitRepoUrl,
            //"https://github.com/githubtraining/hellogitworld",
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
        let url = config.commonapi + "app/generate-ssh-key";

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
                                    Create Application
                                 </Typography>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    
                                    <Grid item xs={12} style={{ display: errorValid === false ? "none" : "block" }} >
                                        <span variant="body2" style={{ color: "red" }}>
                                            {errorMessage}
                                        </span>
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            name="appName"
                                            component={TextField}
                                            type="text"
                                            label="Application Name"
                                            onChange={getAppName}
                                        />
                                    </Grid>

                                    <Grid item xs={4} >
                                        <FormControlLabel
                                            label="SAST"
                                            control={
                                                <Checkbox
                                                    name="sast"
                                                    component={Checkbox}
                                                    onClick={checksast}
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

                                                    name="dast"
                                                    color="primary"
                                                    component={Checkbox}
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
                                                    color="primary"
                                                    component={Checkbox}
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
                                            disabled
                                            id="giturl"
                                            label="Repository URL"
                                            onChange={getgitRepoUrl}
                                            name="gitRepo"
                                            value={gitRepoUrl}
                                            name="gitRepo"
                                            fullWidth
                                            autoComplete="given-name"
                                        />

                                            )}

                                    </Grid>

                                    <Grid item xs={7} >
                                        {(sastval || scaval) ? (
                                            <TextField
                                                fullWidth
                                                required
                                                name="repoPort"
                                                value ={repoPor}
                                                type="text"
                                                label="Repository Port"
                                                onChange={getrepositoryPort}
                                            />
                                        ) : (
                                                <TextField
                                                    fullWidth
                                                    required
                                                    value ={repoPor}
                                                    disabled
                                                    name="repoPort"
                                                    type="text"
                                                    label="Repository Port"
                                                    onChange={getrepositoryPort}
                                                />
                                            )}

                                    </Grid>
                                    <Grid item xs={2} >
                                       
                                          {(sastval || scaval) ? (
                                           <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            onClick={testrepourl}
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
                                                fullWidth
                                                required                                                
                                                value={applicatonUrl}
                                                name="appurl"
                                                type="text"
                                                label="Application Url"
                                                onChange={getapplicationUrl}
                                            />
                                        ) : (
                                                <TextField
                                                    fullWidth
                                                    required
                                                    name="appurl"                                                   
                                                    value={applicatonUrl}
                                                    disabled
                                                    type="text"
                                                    label="Application Url"
                                                    onChange={getapplicationUrl}
                                                />

                                            )}
                                    </Grid>

                                    <Grid item xs={7} >
                                        {(dastval) ? (
                                            <TextField
                                                fullWidth
                                                required
                                                name="appPort"
                                                type="text"
                                                value={applicationport}
                                                label="Application Port"
                                                onChange={getapplicationPort}
                                            />
                                        ) : (
                                                <TextField
                                                    fullWidth
                                                    required
                                                    disabled
                                                    name="appPort"
                                                    value={applicationport}
                                                    type="text"
                                                    label="Application Port"
                                                    onChange={getapplicationPort}
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
                                    {(apptest === "fail") ? (
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
                                                disabled={sshpubKey !== ""}
                                                type="button"
                                                variant="contained"
                                                color="primary"
                                                onClick={genrateExtKey}
                                            >
                                                Generate Key
                                      </Button>
                                        </Grid>
                                    ) : (
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

                                    {/* <Grid item xs={12} > */}
                                    <Grid item xs={3} >
                                        <Button
                                            disabled={!dastval && !sastval && !scaval}
                                            onClick={dataSubmitApp}
                                            variant="contained"
                                            color="primary"
                                            type="submit"

                                        >
                                            Save
                                         </Button>
                                    </Grid>
                                    <Grid item xs={9} >
                                        <Button
                                            //disabled={!dastval && !sastval && !scaval}
                                            onClick={dataCancel}
                                            variant="contained"
                                            color="primary"
                                            type="submit"

                                        >
                                            Cancel
                                         </Button>
                                    </Grid>
                                    {/* </Grid> */}


                                </Grid>
                            </Card>
                        </form>
                    {/* )}
                /> */}
                <Box mt={5}>
                    <AlertDialog show={openModel} handleModelClose={handleModelClose} />
                </Box>
                <Box mt={5}>
                    <ApiResponceAlert urlRedirect={"/viewApplication"} body={"Application Created Successfully."} show={openModel1} onclick={deleteClose} />
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
        getAddApp:state.getAddApp
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setAddApp,
        setAddAppDirect
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(CreateApplication);