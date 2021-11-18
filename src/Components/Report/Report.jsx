import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputBase, Paper, Radio, TableContainer, TextField, Card } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import SearchIcon from "@mui/icons-material/Search";
import React,{ useEffect, useState }  from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setReportData,setReportDataAll } from '../../Redux-Action';
import TokenValidation from '../Common/TokenValidation';
import MenueItem from '../MenuItems/MenueItem';
import AlertDialog from '../ModelPopup/AlertDialog';
import TableView from './TableView';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
// import DateFnsUtils from '@date-io/date-fns'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { DateTimePicker,MuiPickersUtilsProvider } from "@mui/lab";
// import addWeeks from 'date-fns/addWeeks';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/a';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateRangePicker from '@mui/lab/DateRangePicker';

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


function Report(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [openModel, setModelOpen] = React.useState(false);
    const history = useNavigate();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [getSearchText, setSearchText] = React.useState("");
    const [selectedFileValue, setselectedFileValue] = React.useState("a");
    const [appid, setappid] = React.useState(0);
    const [startDate, setstartDate] = React.useState();
    const [endDate, setendDate] = React.useState();

    const [rows, setRows] = React.useState(    [
        { id: 1, applicationname: 'Snow', teamname: 'Jon' , username: "Anup", scan_types: 'SAST', age: 35, jobstartdate: '2/3/2021 3:30:15', jobenddate:'2/3/2021 3:35:15', TimeStamp: '2/1/2021 11:30:15',TimeTake: "5min" }, 
        { id: 2, applicationname: 'Lannister', teamname: 'Cersei', username: "Hanu", scan_types: 'DAST', age: 42 ,jobstartdate: '2/3/2021 3:20:15', jobenddate:'2/3/2021 3:25:15', TimeStamp: '2/1/2021 11:30:15',TimeTake: "5min" },
        { id: 3, applicationname: 'Lannister', teamname: 'Jaime', username: "Avi", scan_types: 'SAST', age: 45, jobstartdate: '1/3/2021 3:10:15', jobenddate:'1/3/2021 3:15:15', TimeStamp: '2/1/2021 11:30:15',TimeTake: "5min"  },
        { id: 4, applicationname: 'Stark', teamname: 'Arya', username: "Datta" , scan_types: 'SCA', age: 16, jobstartdate: '1/3/2021 3:30:15', jobenddate:'1/3/2021 3:35:15', TimeStamp: '2/1/2021 11:30:15',TimeTake: "5min"  },      
        { id: 5, applicationname: 'Sasane', teamname: 'aaryan', username: "Akki", scan_types: 'SAST', age: 45, jobstartdate: '1/3/2021 1:30:15', jobenddate:'1/3/2021 1:35:15', TimeStamp: '2/1/2021 11:30:15',TimeTake: "5min"  },
        { id: 6, applicationname: 'Shankar', teamname: 'gauri', username: "Santosh",  scan_types: 'DAST', age: 16 , jobstartdate: '2/1/2021 11:20:15', jobenddate:'2/1/2021 11:25:15', TimeStamp: '2/1/2021 11:30:15',TimeTake: "5min" },      
      ]);


    useEffect(() => {
        const id=parseInt(localStorage.getItem("app_id"));
        setappid(id);
    }, []);

    useEffect(() => {        
        console.log("app_id my",appid);
        props.setReportData(page,rowsPerPage,appid);
        props.setReportDataAll(appid);
    }, [appid]);

    useEffect(() => {

        if(props.getReportData && props.getReportData.status=="success"){
            setRows(props.getReportData.data)
            // setloderDisplay(false);
            // localStorage.setItem('totalRecord', props.getScanData.totalrecords);
            // settotalrecords(props.getReportData.totalrecords);
        }
        else
        if(props.getReportData && props.getReportData.status=="fail"){
            // setloderDisplay(false);
        }

    }, [props.getReportData]);

    const handleModelClose = () => {
        setModelOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
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

    const numofCountPerPage = (e, arg) => {
        setRowsPerPage(arg);

    }

    const pageNumber = (pageNum) => {
        setPage(pageNum);
    }

    const filterDate = () => {
        props.setReportData(1,5,appid,new Date(startDate).toISOString(),new Date(endDate).toISOString());
    }
    
    const FileTypeChange = (event) => {
        setselectedFileValue(event.target.value)

    }

    function msToTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds;
      }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

    const datediff=(start,end)=>{
        const date1 = new Date(start);
const date2 = new Date(end);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log(diffTime + " milliseconds");
console.log(diffDays + " days");

return msToTime(diffTime);
    }

    const downloadFile = () => {
        if(selectedFileValue === 'a'){
            {exportPDF()}
        }else if(selectedFileValue === 'b'){
            {exportCSV()}
        }else{
           
        let filterdata={};
        props.getReportDataAll.status=="success" && props.getReportDataAll.data.map(row=>{
            filterdata={ teamname:row.teamname, applicationname:row.applicationname, jobstartdate:row.jobstartdate, jobenddate:row.jobenddate, username:row.username, TimeTake:datediff(row.jobenddate,row.jobstartdate), scan_types:row.scan_types,jobresult:row.jobresult}
        });
        const fileData = JSON.stringify(filterdata)

        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentDate = new Date();
        const timestamp = currentDate.getTime();

        link.download = `${"RportJSON_"+timestamp}.json`;
        link.href = url;
        link.click(); 
        }
    }

    const exportCSV = () => {
        let filterdata=[];
        props.getReportDataAll.status=="success" && props.getReportDataAll.data.map((row,i)=>{
            filterdata[i]={ teamname:row.teamname, applicationname:row.applicationname, jobstartdate:row.jobstartdate, jobenddate:row.jobenddate, username:row.username, TimeTake:datediff(row.jobenddate,row.jobstartdate), scan_types:row.scan_types,jobresult:row.jobresult}
        });
        return(
            <CSVLink style={{color:"white",textDecoration: "none"}} data={filterdata} >
            Download</CSVLink>
        )
    }
    const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "All Job's Report";
    
    const headers = [["Team Name", "Application Name", "Scan start date", "Scan end date", "Scan done by", "Time taken", "Scan type", "Scan result"]];

    const data = props.getReportDataAll.status=="success" && props.getReportDataAll.data.map(row=> [row.teamname!=""||null||undefined ? row.teamname :"No Data",row.applicationname!=""||null||undefined ? row.applicationname :"No Data",row.jobstartdate!=""||null||undefined ? row.jobstartdate :"No Data",row.jobenddate!=""||null||undefined ? row.jobenddate :"No Data",row.username!=""||null||undefined ? row.username :"No Data",(row.jobenddate!=""||null||undefined) || (row.jobstartdate!=""||null||undefined)? datediff(row.jobenddate,row.jobstartdate) :"No Data",row.scan_types!=""||null||undefined ? row.scan_types :"No Data",row.jobresult!=""||null||undefined ? row.jobresult :"No Data"]);


    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("RportPDF_" + timestamp+ ".pdf")
  }

    

    const redirectScan = (id) => {
        // setPage(pageNum);
        let path = `/scanmanagement`;
        history(path);
    }



    const searchText = (e) => {
        setSearchText(e.target.value);
        // if(e.target.value !== "" && e.key === 'Enter'){
        //     {getSearchData()}
        //  }       

    }


    const headCells = [
        { id: "Type", numeric: true, disablePadding: true, width: 1, label: "", align: "center" },
        { id: "Type", numeric: true, disablePadding: true, width: 80, label: "Team Name", align: "center" },
        { id: "Type", numeric: true, disablePadding: true, width: 80, label: "Application Name", align: "center" },
        { id: "Type", numeric: true, disablePadding: true, width: 150, label: "Job start date", align: "center" },
        { id: "Type", numeric: true, disablePadding: true, width: 150, label: "Job end date", align: "center" },
        { id: "Type", numeric: true, disablePadding: true, width: 100, label: "Scan done by", align: "center" },

        { id: "Type", numeric: true, disablePadding: true, width: 50, label: "Time taken (HH:MM:SS)", align: "center" },
        // { id: "Type", numeric: true, disablePadding: true, width: 100, label: "TimeStamp", align: "center" },
        { id: "Type", numeric: true, disablePadding: true, width: 50, label: "Scan type", align: "center" },
        { id: "Type", numeric: true, disablePadding: true, width: 50, label: "Scan result", align: "center" },

        { id: "Type", numeric: true, disablePadding: true, width: 80, label: "Downdload", align: "center" },

    ];

    const renderPage = () => {
        return (
            <div>



                {/* {applicationState} */}
                {/* <Grid item xs={12} className ={"row"}>
       
                </Grid> */}

                <Grid sx={{padding:2}} component={Card} id={"tablestyleID"}>
                    {/* <Grid item xs={12} sx={{padding:2}}> */}
                        <Grid item xs={3} className={"tableHead1"}>
                            <Typography variant="h6" sx={{padding: '6px 16px'}} align="center" noWrap>
                                Report
                                    </Typography>
                                    {/* <SearchIcon sx={{padding:'2px', margin: '8px 0px'}}/> */}
                                               {/* <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value = {getSearchText}
                                    onChange={searchText}
                                    inputProps={{ 'aria-label': 'search' }}
                                /> */}
                        </Grid>

                        <Grid item xs={9} className = {"tableHead2"}>

                        {/* <FormGroup row>
                        <FormControlLabel control={

                        } />
                        <FormControlLabel control={
                            
                        } />
                        </FormGroup> */}

                                      {/* <form   id={"datePeaker1"}> */}
                        {/* <TextField
                            id="datetime-local"
                            label="Start Date"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}
                           <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                            renderInput={(props) => <TextField sx={{marginRight:'10px'}} size="small" {...props} />}
                                                value={startDate}
                                                // disablePast
                                                onChange={(date)=> setstartDate(date)}
                                                label="Start Date"
                                            />
                                  </LocalizationProvider>
                    {/* </form> */}


                    {/* <form className={classes.container}  id={"datePeaker2"}> */}
                        {/* <TextField
                            id="datetime-local1"
                            label="End Date"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}
                          <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                            renderInput={(props) => <TextField sx={{marginRight:'10px'}} size="small" {...props} />}
                                                value={endDate}
                                                // disablePast
                                                minDate
                                                onChange={(date)=> setendDate(date)}
                                                label="End Date"
                                            />
                                       </LocalizationProvider>
                    {/* </form> */}
                    <Button
                        id="serchReport"
                        variant="contained"
                        onClick={filterDate}
                        color="primary"
                        className={classes.button}
                        size="small"
                    >
                        Search
                        </Button>              
                                
                        </Grid>
                
                    {/* </Grid> */}

                    </Grid>
                    <br/>
                    {/* {loderDisplay ? <CircularProgress id="lodingBar" /> :  */}
                    {/* (props.getApplications !== null ? ( */}
                    <TableView title={""}
                        rows={rows}
                        columns={headCells}
                        redirectScan={(teamsId) => { redirectScan(teamsId) }}
                        show={Number(props.getReportData ? props.getReportData.totalrecords : 0)}
                        currentPage={page}
                        numberOfrows={rowsPerPage}
                        ChangeCurrentPage={( index) => { setPage(index);props.setReportData(index,rowsPerPage,appid); }}
                        ChangeRowsPerPage={( index) => { setPage(1); setRowsPerPage(index);props.setReportData(1,index,appid); }}                        
                        handleClick={(e, index) => { handleClick(e, index) }}
                    ></TableView>


                    {/* ):(
                            <Alert severity="error">No Application Found!!!</Alert>
                         )) */}
                    {/* } */}

                

                <Grid sx={{padding:2}} component={Card}>
                    <FormControl component="fieldset" id={"fileTypeID"}>
                        <FormLabel component="legend">File Type</FormLabel>
                        <FormGroup row>
                            <FormControlLabel item xs={3}
                                label="PDF"
                                control={
                                    <Radio
                                        checked={selectedFileValue === 'a'}
                                        onChange={FileTypeChange}
                                        value="a"
                                        name="radio-button-demo"
                                        color="primary"
                                        inputProps={{ 'aria-label': 'a' }}
                                    />

                                }
                            />
                            <FormControlLabel item xs={3}
                                label="CSV"
                                control={
                                    <Radio
                                        checked={selectedFileValue === 'b'}
                                        onChange={FileTypeChange}
                                        color="primary"
                                        value="b"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'b' }}
                                    />

                                }
                            />
                            <FormControlLabel item xs={3}
                                label="Json"
                                control={
                                    <Radio
                                        checked={selectedFileValue === 'c'}
                                        onChange={FileTypeChange}
                                        color="primary"
                                        value="c"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'c' }}
                                    />

                                }
                            />
                            {selectedFileValue !== 'b' ?(
                                <Button
                                 onClick={downloadFile}
                                variant="contained"
                                color="primary"
                                type="submit"

                            >
                                Download
                                     </Button>
                            ):(
                            
                            <Button
                                 //onClick={downloadFile}
                                variant="contained"
                                color="primary"
                                type="submit"

                            >
                                {exportCSV()}
                            {/* <CSVLink data={rows} >
                                Download  </CSVLink> */}
                                     </Button>

                            
                           
                            )}

                            
                        </FormGroup>
                    </FormControl>
                </Grid>



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

    } else {
        return <Navigate to='/login' />
    }
}

const mapStateToProps = state => {
    return {
        getReportData: state.getReportData,
        getUserData: state.getUserData,
        getReportDataAll:state.getReportDataAll
    }
}

const mapDispatchToProps = () => {
    return {
        setReportData,
        setReportDataAll
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(Report);