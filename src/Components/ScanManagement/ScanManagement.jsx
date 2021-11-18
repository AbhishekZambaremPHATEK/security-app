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
import { setUserInfo,setAppDetails,setAddScanJob,setAddScanJobDirect } from '../../Redux-Action';
import TokenValidation from '../Common/TokenValidation';
import MenueItem from '../MenuItems/MenueItem';
import AlertDialog from '../ModelPopup/AlertDialog';
import "./ScanManagement.css";
import ApiResponceAlert from '../Common/ApiResponceAlert';
import config from '../../Config';
// import DateFnsUtils from '@date-io/date-fns'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { DateTimePicker,MuiPickersUtilsProvider } from "@mui/lab";


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


function ScanManagement({getAppDetails,setAppDetails,getUserData,getAddScanJob,setAddScanJob,setAddScanJobDirect}) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openModel, setModelOpen] = React.useState(false);
    const [openModel1, setModelOpen1] = React.useState(false);
    const history = useNavigate();
    const [applicationName, setappName] = React.useState("Demo");
    const [gitRepoUrl, setgitRepoUrl] = React.useState("https://docs.github.com/en/github/using-git/which-remote-url-should-i-use");
    const [applicatonUrl, setapplicatonUrl] = React.useState("http://localhost:3000/scanmanagement");
    const [applicationport, setapplicationport] = React.useState("443");
    const [repoPor, setrepoPort] = React.useState("8080");
    const [errorMessage, seterrorMessage] = React.useState("");
    const [errorValid, seterrorValid] = React.useState(false);
    const [sshpubKey, setsshpubKey] = React.useState("");
    const [sshprivateKey, setsshprivateKey] = React.useState("");
    const [dastval, setdastval] = React.useState(true);
    const [sastval, setsastval] = React.useState(true);
    const [scaval, setscaval] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('External');
    const [scanningValue, setScanningValue] = React.useState('scan now');
    const [selectedAppValue, setSelectedAppValue] = React.useState('Internal');
    const [appGetData, setappGetData] = React.useState(null);
    const [updateTeamId, setupdateTeamId] = React.useState(null);
    const [updateAppId, setupdateAppId] = React.useState(null);
    const [startDate, setStartDate] = useState(null);
    const [getDate, setSelectedDate] = useState(null);



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
        // if (appGetData === null || appGetData === undefined || appGetData.length === 0 || appGetData === "") {
        // { getTeamData() }
        setAppDetails(localStorage.getItem("scanAppId"))
        //}

        return () => {
            setAddScanJobDirect(null);
          }
    }, []);

    useEffect(() => {
        if(getAppDetails && getAppDetails.status=="success"){
            seterrorValid(false);
            setSelectedAppValue(getAppDetails.data.applicationtype);
                setappName(getAppDetails.data.applicationname);
                setapplicatonUrl(getAppDetails.data.applicationurl);
                setgitRepoUrl(getAppDetails.data.gitrepourl);
                setSelectedValue(getAppDetails.data.gitrepotype);
                setdastval(getAppDetails.data.is_dast);
                if (!getAppDetails.data.is_dast) {
                    setSelectedAppValue('Internal');
                }
                setsastval(getAppDetails.data.is_sast);
                setscaval(getAppDetails.data.is_sca);
                setsshpubKey(getAppDetails.data.sshkey_pub);
                if (getAppDetails.data.applicationport !== -1) {
                    setapplicationport(getAppDetails.data.applicationport);
                }
                if (getAppDetails.data.gitrepoport !== -1) {
                    setrepoPort(getAppDetails.data.gitrepoport);
                }
                setupdateTeamId(getAppDetails.data.team_id);
                setupdateAppId(getAppDetails.data.id);
        }else if (getAppDetails && getAppDetails.status === "fail") {
            seterrorValid(null);
       } 
    }, [getAppDetails]);

    useEffect(() => {
        if(getAddScanJob && getAddScanJob.status=="success"){
            seterrorValid(false);
            setModelOpen1(true);
        }else if (getAddScanJob && getAddScanJob.status === "fail") {
            alert(getAddScanJob.message);
            seterrorValid(true);
            seterrorMessage(getAddScanJob.message);
       } 
    }, [getAddScanJob]);

   
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
        window.alert(JSON.stringify(values, 0, 2));
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

    const scanChangeRadio = (event) => {
        setScanningValue(event.target.value);
        if (event.target.value === "scan now") {
            document.getElementById("datePeaker").style.display = "none"
        } else {
            document.getElementById("datePeaker").style.display = "block"
        }
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
        let date=new Date()
        let requestOptions = {
            "scheduleddatetime": new Date(getDate).toISOString(),
            "jobtype": scanningValue,
            "scan_done_by": Number(getUserData.user_id),
            "app_id": Number(localStorage.getItem("scanAppId")),
            "team_id": Number(localStorage.getItem("scanTeamId")),
            // "currentdatetime": date.getFullYear() +
            // '-' + (date.getMonth() + 1) +
            // '-' + date.getDate() +
            // 'T' + date.getHours() +
            // ':' + date.getMinutes() +
            // ':' + date.getSeconds(),
            // + '.' + (this.getMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z',
            "currentdatetime":date.toISOString()
        }
      console.log(requestOptions);
        setAddScanJob(requestOptions);
    }


    const getrepositoryPort = (e) => {
        seterrorValid(false);
        setrepoPort(e.target.value);

    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // console.log(date.target.value);
        console.log(getDate);
    };




    const renderPage = () => {
        return (
            <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                {/* <Form onSubmit={onSubmit}
                    initialValues={{ employed: true, stooge: 'larry' }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => ( */}
                        <form onSubmit={onSubmit}>
                            <Card style={{ padding: 16 }}>
                                {/* <Grid item xs={12}>
                                    <Typography variant="h8" noWrap fullWidth>
                                        Team Name: {localStorage.getItem("scanTeamName")}
                                    </Typography>
                                </Grid> */}

                                <Typography variant="h6" align="center" noWrap>
                                    Scan View
                                 </Typography>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={12} fullWidth style={{ display: errorValid === false ? "none" : "block" }} >
                                        <span variant="body2" style={{ color: "red" }}>
                                            {errorMessage}
                                        </span>
                                    </Grid>


                                    <Grid item>
                                        <FormControl component="fieldset"  >
                                            <FormLabel component="legend"></FormLabel>
                                            <FormGroup row id={"scanTypes"}>
                                                <FormControlLabel item xs={6}
                                                    label="Scan Now"
                                                    control={
                                                        <Radio
                                                            checked={scanningValue === 'scan now'}
                                                            onChange={scanChangeRadio}
                                                            value="scan now"
                                                            name="radio-button-demo"
                                                            color="primary"
                                                            inputProps={{ 'aria-label': 'scan now' }}
                                                        />

                                                    }
                                                />
                                                <FormControlLabel item xs={6}
                                                    label="schedule Scan"
                                                    control={
                                                        <Radio
                                                            checked={scanningValue === 'scheduled scan'}
                                                            onChange={scanChangeRadio}
                                                            color="primary"
                                                            value="scheduled scan"
                                                            name="radio-button-demo"
                                                            inputProps={{ 'aria-label': 'scheduled scan' }}
                                                        />
                                                    }
                                                />

                                            </FormGroup>
                                        </FormControl>
                                    </Grid>

                                    <form className={classes.container} noValidate style={{ display: setScanningValue === "scan now" ? "block" : "none" }} id={"datePeaker"}>
                                        {/* <TextField
                                            id="datetime-local"
                                            label="Next Scan Date"
                                            type="datetime-local"
                                            // value={getDate}
                                            // defaultValue="2017-05-24T10:30"
                                            onChange={handleDateChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /> */}
                                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                                value={getDate}
                                                disablePast
                                                onChange={handleDateChange}
                                                label="Next Scan Date"
                                            />
                                        {/* </MuiPickersUtilsProvider> */}
                                        </LocalizationProvider>
                                    </form>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="firstName"
                                            onChange={getAppName}
                                            name="appName"
                                            label="Application Name"
                                            inputProps={{ readOnly: true }}
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
                                                    disabled
                                                    name="sast"
                                                    checked={sastval}
                                                    onClick={checksast}
                                                    value={sastval}
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
                                                    disabled
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
                                                    disabled
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
                                                inputProps={{ readOnly: true }}
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
                                                inputProps={{ readOnly: true }}
                                                name="gitRepo"
                                                value={gitRepoUrl}
                                                disabled
                                                fullWidth
                                                autoComplete="given-name"
                                            />

                                        )}

                                    </Grid>

                                    <Grid item xs={12} >
                                        {(sastval || scaval) ? (
                                            <TextField
                                                fullWidth
                                                required
                                                inputProps={{ readOnly: true }}
                                                name="repoPort"
                                                value={repoPor}
                                                type="text"
                                                label="Repository Port"
                                                onChange={getrepositoryPort}
                                            />
                                        ) : (
                                            <TextField
                                                fullWidth
                                                required
                                                disabled
                                                inputProps={{ readOnly: true }}
                                                name="repoPort"
                                                value={repoPor}
                                                type="text"
                                                label="Repository Port"
                                                onChange={getrepositoryPort}
                                            />
                                        )}

                                    </Grid>





                                    <Grid item xs={12} >
                                        {(dastval) ? (
                                            <TextField
                                                required
                                                id="appurl"
                                                label="Application Url"
                                                inputProps={{ readOnly: true }}
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
                                                inputProps={{ readOnly: true }}
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


                                    <Grid item xs={12} >
                                        {(dastval) ? (
                                            <TextField

                                                required
                                                id="appPort"
                                                inputProps={{ readOnly: true }}
                                                label="Application Port"
                                                onChange={getapplicationPort}
                                                name="appPort"
                                                value={applicationport}

                                                fullWidth
                                                autoComplete="given-name"

                                            />
                                        ) : (
                                            <TextField
                                                disabled
                                                required
                                                id="appPort"
                                                inputProps={{ readOnly: true }}
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


                                    {(sastval || scaval) ? (
                                        <Grid item >
                                            <FormControl component="fieldset" disabled >
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


                                    {/* <Grid item xs={12} style={{ display: (selectedValue === "I") || (sshpubKey !== '') === false ? "none" : "block" }}>

                                        <TextareaAutosize id="KeyText" readOnly={true} placeholder={sshpubKey} />
                                    </Grid> */}


                                    <Grid item xs={12} >
                                        <Button
                                            disabled={!dastval && !sastval && !scaval}
                                            onClick={dataSubmitApp}
                                            variant="contained"
                                            color="primary"
                                            type="submit"

                                        >
                                            Scan
                                     </Button>
                                    </Grid>

                                    {/* <Grid item xs={9} >
                                        <Button
                                            disabled={!dastval && !sastval && !scaval}
                                            onClick={dataCancel}
                                            variant="contained"
                                            color="primary"
                                            type="submit"

                                        >
                                            Cancel
                                     </Button>
                                    </Grid> */}


                                </Grid>
                            </Card>
                        </form>
                {/* //     )}
                // /> */}
                <Box mt={5}>
                    <AlertDialog show={openModel} handleModelClose={handleModelClose} />
                </Box>
                <Box mt={5}>
                    <ApiResponceAlert urlRedirect={"/scan"} body={"San Job Added Successfully."} show={openModel1} onclick={deleteClose} />
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
        getAppDetails:state.getAppDetails,
        getAddScanJob:state.getAddScanJob
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setAppDetails,
        setAddScanJob,
        setAddScanJobDirect,
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(ScanManagement);