import { Box, Button, Grid, InputBase, Paper, TableContainer, Card } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { makeStyles, useTheme, withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import API from '../../Api/HTTP';
import config from '../../Config';
import { setUserInfo,setApplicationData } from '../../Redux-Action';
import TokenValidation from '../Common/TokenValidation';
import MenueItem from '../MenuItems/MenueItem';
import AlertDialog from '../ModelPopup/AlertDialog';
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// import MaterialTable from 'material-table';
import CircularProgress from '@mui/material/CircularProgress';
import "./ApplicationView.css";
import Alert from '@mui/lab/Alert';
import TableView from './TableView';
import ConferMationDailog from './ConferMationDailog';
// import { DataGrid } from '@mui/x-data-grid';
import DataGrid from 'react-data-grid';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
  ];
  
  const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
  ];
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
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

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);



function ApplicationView({setApplicationData,getApplicationData,getUserData}) {
    const classes = useStyles();
    const theme = useTheme();
    const [openModel, setModelOpen] = React.useState(false);
    const [openModel1, setModelOpen1] = React.useState(false);
    const history = useNavigate();
    const [expanded, setExpanded] = React.useState('panel1');
    const [getTeamName, setTeamName] = React.useState('');
    const [applicationState, setapplicationState] = React.useState([]);
    const [initresp, setinitresp] = React.useState(null);
    const [SelectedApplications, setSelectedApplications] = React.useState([]);
    const [modelMessage, setModelMessage] = React.useState("");
    const [getSearchText, setSearchText] = React.useState("");
    const [errorValid, seterrorValid] = React.useState(false);
    const [loderDisplay, setloderDisplay] = React.useState(true);
    const [page, setPage] = React.useState(1);    
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    var applicationList = React.useState([]);
    var responseArr = [];
    useEffect(() => {
        // if (applicationState === null || applicationState === undefined || applicationState.length === 0) {
        // // if (applicationList === null || applicationList === undefined || applicationList.length === 2) {
            setApplicationData(Number(localStorage.getItem("viewApplicationListTid")),page,getSearchText,rowsPerPage)

        //}

    }, []);

    useEffect(() => {
        if(getApplicationData && getApplicationData.status=="success"){
        

            if(getApplicationData.data.length === 0){
                setloderDisplay(false);
                // props.setApplications(null);
                setapplicationState([]);
                setTeamName(getApplicationData.teamname);
                localStorage.setItem("teamNameForCreateAndUpdate", getApplicationData.teamname);
            }else{
                setloderDisplay(false);
              // setRowsPerPage(Number(getApplicationData.recordsperpage));
               localStorage.setItem('totalAppRecord', getApplicationData.totalrecords);
               let resp = getApplicationData.data;
              
               applicationList = resp;
                // props.setApplications(resp);
                setTeamName(getApplicationData.teamname)
                localStorage.setItem("teamNameForCreateAndUpdate", getApplicationData.teamname);
                
                for (var i = 0; i < applicationList.length; i++) {
                    
                    var tempScaAndSAST = "";
                    if (applicationList[i].is_sast && applicationList[i].is_sca) {
                        tempScaAndSAST = "SAST, SCA"
                    } else if (applicationList[i].is_sca) {
                        tempScaAndSAST = "SCA"
                    } else {
                        tempScaAndSAST = "SAST"
                    }
    
                    var appUrl = "";
                    var gitUrl = "";
                    if ( applicationList[i].applicationurl !== "") {
                        appUrl = applicationList[i].applicationurl
                    } else {
                        appUrl = "Not Applicable"
                    }
    
                    if (applicationList[i].gitrepourl !== "") {
                        gitUrl = applicationList[i].gitrepourl
                    } else {
                        gitUrl = "Not Applicable"
                    }
                    var appType = "";
                    if (applicationList[i].applicationtype === "Internal" ) {
                        appType = "Internal"
                    } else {
                        appType = "External"
                    }
                    var tableobject = {
                        id:applicationList[i].id,
                        accordian: null
                    }

                    var AppInfoArray =[];
                    var displayobjectdast ={
                        scanType: "DAST",
                        applicationtype: applicationList[i].applicationtype,
                        applicationurl: applicationList[i].applicationurl,
                        port: applicationList[i].applicationport,
                        
                    }
                    var displayobjectsast ={
                        scanType: tempScaAndSAST,
                        applicationtype: applicationList[i].gitrepotype,
                        applicationurl: applicationList[i].gitrepourl,
                        port: applicationList[i].gitrepoport,                        
                        
                    }
                    if(applicationList[i].is_sast || applicationList[i].is_sca){
                        AppInfoArray.push(displayobjectsast);
                    }
                    if(applicationList[i].is_dast){
                        AppInfoArray.push(displayobjectdast);
                    }
    
                    tableobject.accordian=(
                        <Accordion className="Accordian" square  onChange={handleChange('panel' + i)}>
                            <AccordionSummary aria-controls={"panel"+ i+"d-content" + i} id={"panel"+ i+"d-header"}>
                                <Typography className="myAccordians">{applicationList[i].applicationname}</Typography>
                                <IconButton id={"action_" + applicationList[i].id} 
                                            title="Edit App"  color="primary"  style={{ display: "none" }} onClick={onCellClickEditApp}>
                                                    <EditIcon />
                                                </IconButton>
                             <IconButton id={"actionDis_" + applicationList[i].id} disabled style={{ display: "block" }}
                                            title="Edit App"  color="primary" onClick={onCellClickEditApp}>
                                                    <EditIcon />
                                                </IconButton>
                                <IconButton id={"actiondel_" + applicationList[i].id} onClick={onCellClickDeleteApp}
                                            title="Delete App"  color="secondary" style={{ display: "none" }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                 <IconButton id={"actionDisdel_" + applicationList[i].id} disabled
                                 onClick={onCellClickDeleteApp}
                                            title="Delete App"  color="secondary" style={{ display: "block" }} >
                                                    <DeleteIcon />
                                                </IconButton>
                            </AccordionSummary>
                            <AccordionDetails>
                                
                            {/* <DataGrid
//   rows={AppInfoArray}
//   columns={[    
                                           
//     { title: 'Scan Type', field: 'scanType' },
//     { title: 'App/Repo Type', field: 'applicationtype' },
//     { title: 'App/Repo Url', field: 'applicationurl' },
//     { title: 'App/Repo Port', field: 'port' },

// ]}
rows={rows}
columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5]}
  checkboxSelection
/> */}
                                    {/* <MaterialTable className="materialTable1"
                                        title="Application Details"
                                        columns={[    
                                           
                                            { title: 'Scan Type', field: 'scanType' },
                                            { title: 'App/Repo Type', field: 'applicationtype' },
                                            { title: 'App/Repo Url', field: 'applicationurl' },
                                            { title: 'App/Repo Port', field: 'port' },
    
                                        ]}
    
                                        data={AppInfoArray}
    
    
                                        options={{
                                            search: false,
                                            paging: false,
                                        }}
                                    /> */}
                                    <DataGrid className='rdg-light' columns={[    
                                           
                                           { name: 'Scan Type', key: 'scanType' },
                                           { name: 'App/Repo Type', key: 'applicationtype' },
                                           { name: 'App/Repo Url', key: 'applicationurl' },
                                           { name: 'App/Repo Port', key: 'port' },
   
                                       ]} rows={AppInfoArray} />
                                       {/* <DataGrid columns={columns} rows={rows} /> */}
                               
                            </AccordionDetails>
                        </Accordion>
                    )
                    responseArr.push(tableobject);
                }
                setapplicationState(responseArr);
            }

           


        }
    }, [getApplicationData]);



    const searchText = (e) => {
        setSearchText(e.target.value); 
        if(e.target.value !== "" && e.key === 'Enter'){
            setloderDisplay(true);
            setApplicationData(Number(localStorage.getItem("viewApplicationListTid")),page,getSearchText,rowsPerPage)
         }       

    }

    const numofCountPerPage = (e, arg) => {        
        setRowsPerPage(arg);   
             
   }

    //     const pageNumber = (pageNum) => {
    //         setPage(pageNum);
    //         setloderDisplay(true);
    //      let url = config.commonapi + "app/applist?page=" + (pageNum+1) + "&team_id=" + Number(localStorage.getItem("viewApplicationListTid"))+"&recordsperpage="  + localStorage.getItem("nummAppPerPage");
       
    //     {apiCalls(url)}
    // }

    // const getSearchData = () => {
        
    //     let url = config.commonapi + "app/applist?text="+getSearchText+"&page=" + page + "&team_id=" + Number(localStorage.getItem("viewApplicationListTid"))+"&recordsperpage="  + localStorage.getItem("nummAppPerPage");
        
    //     {apiCalls(url)}
    // }


    // const apiCalls= (url) => {
    //     API.sendGetRestRequest(url, "GET").then((response) => {

    //     }).catch((errorResp) => {
    //         // setApplicationList(null);
    //     })


    // }

    
    const onCellClickDeleteApp = (e) => {

        var getId = e.currentTarget.id.split("_")[1];
        var selectArra =[];
        if (getId !== null) {
            selectArra.push(getId);
            setSelectedApplications(selectArra);
            setModelOpen1(true);
             setModelMessage("This will permanently delete the application");
        }
        // props.editTeam(getId)
        
    }


    
    const onCellClickEditApp = (e) => {

        var getId = e.currentTarget.id.split("_")[1];
        localStorage.setItem("editeApplicationID", getId);
        let path = `/updateapplication`;
        history(path);
    }

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleModelClose = () => {
        setModelOpen(false);
    };
    const handleClick = (e, index, id) => {
        // console.log(index);
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

    const deleteAllTeams = () => {
        if(SelectedApplications.length> 0){
            setModelOpen1(true); 
            setModelMessage("This will permanently delete the applications");          

        }     
        
    }

    const deleteClose = () => {
        setModelOpen1(false);
    };

    const openCreateApplication = () => {
        localStorage.setItem('CreateAppTeamID', localStorage.getItem("viewApplicationListTid"));        
        let path = `/createapplication`;
        history(path);

    }

    const checkSelectedApps = (teams) => {
        setSelectedApplications(teams);
    }

    const headCells = [
        { id: "Type", numeric: true, disablePadding: true, width: 260, label: "App Details", align: "left" },
         ];


    const renderPage = () => {
        // if (applicationState !== null && applicationState.length === 0) {
        //     return (
        //         <CircularProgress id="lodingBar" />
        //     )
        // } else {

                return (
                    <div>
                        {/* <Grid item xs={12} id="btnStyle">
          

                    </Grid> */}


                        {/* {applicationState} */}















                        <Grid component={Card} sx={{padding:2}} id={"tablestyleID"}>

                   
<Grid item xs={6} className={"tableHead1"}>
    <Typography variant="h6" sx={{padding: '6px 16px'}} align="center" noWrap>
    Team Name: {getTeamName}
         </Typography>
</Grid>

<Grid item xs={6} className={"tableHead2"}>

{(SelectedApplications.length > 1) || (SelectedApplications.length===1 && applicationState.length === 1)? (
                            <Button
                                id="deleteTeam"
                                variant="contained"
                                onClick={deleteAllTeams}
                                color="primary"
                                className={classes.button}
                                endIcon={<DeleteIcon color="secondary" />}
                            >
                                Delete App
                            </Button>
                        ) : (
                                <Button
                                    id="deleteTeam"
                                    disabled={true}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<DeleteIcon
                                        disabled={true}  />}
                                >
                                    Delete App
                                </Button>
                            )}

                        <Button
                            id="createTeam"
                            variant="contained"
                            onClick={openCreateApplication}
                            color="primary"
                            className={classes.button}
                            endIcon={<AddIcon />}
                        >
                            Create App
                        </Button>
</Grid>

</Grid>
<br/>







                        {/* <TableContainer component={Card} id ={"tablestyleID"}> */}
                        {/* {applicationState.length  !== 0 ? (
                            <Grid item xs={12}>
                                    <Grid item xs={6} className = {"tableHead1"}>
                                    <Typography variant="h6" align="center" noWrap>
                                    Application List
                                            </Typography>
                                    </Grid>

                                    <Grid item xs={6} className = {"tableHead2"}>

                                            <InputBase
                                            placeholder="Search…"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            value = {getSearchText}
                                            onChange={searchText}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    <SearchIcon  onClick={getSearchData}
                                    />                          
                                        
                                    </Grid>
                        
                        </Grid>
                        ):(
                           <span></span> 
                        )} */}
                            
                        {loderDisplay ? <CircularProgress id="lodingBar" /> : 
                                 (applicationState.length  !== 0 ? (
                                     <TableView title={""} rows={applicationState} columns={headCells} 
                                     show={Number(localStorage.getItem("totalAppRecord"))}
                                     pageNumber={(index) => {  setPage(index);setApplicationData(Number(localStorage.getItem("viewApplicationListTid")),page,getSearchText,rowsPerPage)                                    }}
                                     numofCountPerPage={(e, index) => { numofCountPerPage(e, index) }}
                                     currentPage= {page}
                                     numberOfrows ={rowsPerPage}
                                    //   editTeam={(teamsId) => { editTeam(teamsId) }} 
                                    //  singleTeamDelete={(teamsId) => { singleTeamDelete(teamsId) }} 
                                     checkSelectedApps={(teamsId) => { checkSelectedApps(teamsId) }} 
                                     handleClick={(e, index) => { handleClick(e, index) }} 
                                    //  deleteRow={(e, index) => deleteRow(e, index)}
                                     ></TableView>
                                 ):(
                                    <Alert severity="error">No Application Found!!!</Alert>
                                 ))
                              }

                    {/* </TableContainer> */}

                        <Box mt={5}>
                            <AlertDialog show={openModel} handleModelClose={handleModelClose} />
                        </Box>
                        <Box mt={5}>
                            <ConferMationDailog selarray={SelectedApplications} body={modelMessage} show={openModel1} onclick={deleteClose} />

                        </Box>
                    </div>

                );
            // }
        // }
    }




    if (TokenValidation.validToken(getUserData) === true) {

        return renderPage()
        // (

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
        getApplicationData:state.getApplicationData
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setApplicationData
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(ApplicationView);