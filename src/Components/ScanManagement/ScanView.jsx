import { Box, Grid, InputBase, Paper, TableContainer, Card } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import SearchIcon from "@mui/icons-material/Search";
import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setScanData,setUserInfo } from '../../Redux-Action';
import TokenValidation from '../Common/TokenValidation';
import MenueItem from '../MenuItems/MenueItem';
import AlertDialog from '../ModelPopup/AlertDialog';
import TableView from './TableView';
import API from '../../Api/HTTP';
import config from '../../Config';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/lab/Alert';

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


function ScanView(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [loderDisplay, setloderDisplay] = React.useState(false);
    const [errorValid, seterrorValid] = React.useState(false);
    const [openModel, setModelOpen] = React.useState(false);
    const history = useNavigate();    
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [getSearchText, setSearchText] = React.useState("");

    const [totalrecords, settotalrecords] = React.useState(0);
    


    useEffect(() => {
        setloderDisplay(true);
        // if (page === 0 &&(props.getTeamData === null || props.getTeamData === undefined || props.getTeamData.length === 0)) {
            props.setScanData(page,getSearchText,rowsPerPage)
        // }

    }, []);


    useEffect(() => {

        if(props.getScanData && props.getScanData.status=="success"){
            setloderDisplay(false);
            // localStorage.setItem('totalRecord', props.getScanData.totalrecords);
            settotalrecords(props.getScanData.totalrecords);
        }
        else
        if(props.getScanData && props.getScanData.status=="fail"){
            setloderDisplay(false);
        }

    }, [props.getScanData]);

    const handleModelClose = () => {
        setModelOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e, index,id) => {
        setAnchorEl(e.currentTarget);
    };

    setInterval(() => {
        const storage = props.getUserData;
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


//    const pageNumber = (pageNum) => {
//     setPage(pageNum);
//     setloderDisplay(true);
//     // console.log("get rows per page in redux " + props.getTeamPerPage)
//     let url = "";
//     url = config.commonapi + "/scanmgmt/view-scan-list?page=" + (pageNum + 1) + "&recordsperpage=" + localStorage.getItem("numofRowsPerPageAfterChange");
    
//     // "http://192.168.2.112:5002/  http://192.168.2.112/scanmgmt/view-scan-list?page=1&recordsperpage=1

//     API.sendGetRestRequest(url, "GET").then((response) => {
//         let resp = response.data;
//         if (response.data.length === 0) {
//             setloderDisplay(false);
//             props.setScanData(null);
//         } else {
//             setloderDisplay(false);
//             // setRowsPerPage(Number(response.recordsperpage));
//             // props.setTotalScan(response.totalrecords)
//             localStorage.setItem('totalRecord', response.totalrecords);

//             props.setScanData(resp);

//         }
//     }).catch((errorResp) => {
//         seterrorValid(null);
//     })
//    }

   const redirectScan = (id,team_id) => {
   // setPage(pageNum);
   localStorage.setItem("scanAppId", id)
   localStorage.setItem("scanTeamId", team_id)
   history(`/scanmanagement`);
   }

   const reportScan = (id) => {
    // setPage(pageNum);
    history(`/report`);
    }
   

   

   const searchText = (e) => {
    setSearchText(e.target.value); 
    // if(e.target.value !== "" && e.key === 'Enter'){
    //     {getSearchData()}
    //  }       

    }

    const rows = [
        { id: 1,  lastName: 'ban', firstName: 'Jon',scanType: 'SAST', age: 35,  DateofScan: '02/02/2021 3:35:00'  }, 
        { id: 2, lastName: 'dan', firstName: 'Cersei', scanType: 'DAST', age: 42,  DateofScan: '02/02/2021 3:35:00'  },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', scanType: 'SAST', age: 45 , DateofScan: '02/02/2021 2:35:00'   },
        { id: 4, lastName: 'Stark', firstName: 'Arya', scanType: 'SCA', age: 16, DateofScan: '02/01/2021 3:35:00'  },      
        { id: 5, lastName: 'Sasane', firstName: 'aaryan', scanType: 'SAST', age: 45,  DateofScan: '15/02/2021 3:35:00'  },
        { id: 6, lastName: 'Shankar', firstName: 'gauri', scanType: 'DAST', age: 16,  DateofScan: '02/02/2021 3:15:00'  },      
      ];

   const headCells = [
    { id: "Type", numeric: true, disablePadding: true, width: 160, label: "Team Name", align: "center"},
    { id: "Type", numeric: true, disablePadding: true, width: 160, label: "Application Name", align: "center"},
    { id: "Type", numeric: true, disablePadding: true, width: 120, label: "Scan Type", align: "center" },
    { id: "Type", numeric: true, disablePadding: true, width: 120, label: "Date of Scan", align: "center" },
    { id: "Type", numeric: true, disablePadding: true, width: 120, label: "Next Scheduled Date", align: "center" },
    { id: "Type", numeric: true, disablePadding: true, width: 120, label: "Status", align: "center" },
    { id: "Type", numeric: true, disablePadding: true, width: 120, label: "Action", align: "center" },
   
  
     ];
    
    const renderPage = () => {
        return (
            <div>
                


                {/* {applicationState} */}

                <TableContainer component={Card} id ={"tablestyleID"}>
                    <Grid item xs={12} sx={{padding:2}}>
                            <Grid item xs={6} className = {"tableHead1"}>
                            <Typography variant="h6" sx={{padding: '6px 16px'}} align="center" noWrap>
                            Scan List
                            </Typography>
                                <SearchIcon sx={{padding:'2px', margin: '8px 0px'}}/>
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
                            </Grid>

                            <Grid item xs={6} className = {"tableHead2"}>

                           
                            {/* <SearchIcon  
                            //onClick={getSearchData}
                            />                           */}
                                
                            </Grid>
                
                </Grid>
                </TableContainer>
                    <br/>
                {loderDisplay ? <CircularProgress id="lodingBar" /> : 
                         (props.getApplications !== null ? (
                             <TableView title={""} 
                             rows={props.getScanData ? props.getScanData.data: rows} 
                             columns={headCells} 
                             redirectScan={(id,team_id) => { redirectScan(id,team_id) }}
                             reportScan={(teamsId) => { reportScan(teamsId) }}
                             show={totalrecords}
                            //  pageNumber={(index) => { setPage(index);props.setScanData(index,getSearchText,rowsPerPage); }}                            
                             currentPage= {page}
                             ChangeCurrentPage={( index) => { setPage(index);props.setScanData(index,getSearchText,rowsPerPage); }}
                             numberOfrows ={rowsPerPage}     
                             ChangeRowsPerPage={( index) => { setPage(1); setRowsPerPage(index);props.setScanData(1,getSearchText,index); }}                        
                             handleClick={(e, index,id) => { handleClick(e, index,id) }} 
                             ></TableView>
                          ):(
                            <Alert severity="error">No Application Found!!!</Alert>
                         )) 
                     } 

           

                <Box mt={5}>
                    <AlertDialog show={openModel} handleModelClose={handleModelClose} />
                </Box>
                
            </div>

        );
        
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


    if (TokenValidation.validToken(props.getUserData) === true) {

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

    }else{
        return <Navigate to='/login'  />
    }
}

const mapStateToProps = state => {
    return {
        getUserData: state.getUserData,
        getScanData:state.getScanData
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setScanData
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(ScanView);