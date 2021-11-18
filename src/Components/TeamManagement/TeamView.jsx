import { Box, Grid, Icon, IconButton, InputBase, TextField, Typography, Card } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { makeStyles, useTheme } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import API from '../../Api/HTTP';
import { setUserInfo, setTeamData } from '../../Redux-Action';
import TokenValidation from '../Common/TokenValidation';
import MenueItem from '../MenuItems/MenueItem';
import AlertDialog from '../ModelPopup/AlertDialog';
import ConferMationDailog from '../TeamManagement/ConferMationDailog';
import SearchIcon from "@mui/icons-material/Search";
import TableView from './TableView';
import "./TeamView.css";
import Loader from '../Common/Loader';
import config from '../../Config';





const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        // padding: theme.spacing(2, 2),
        top:10,
        height: '100%',
        // position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
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


function TeamView(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [openModel, setModelOpen] = useState(false);
    const [openModel1, setModelOpen1] = useState(false);
    const history = useNavigate();
    const [errorValid, seterrorValid] = React.useState(false);
    const [loderDisplay, setloderDisplay] = React.useState(false);

    //const [rows, setrows] = React.useState([]);
    const [SelectedTeams, setSelectedTeams] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modelMessage, setModelMessage] = React.useState("");
    const [getSearchText, setSearchText] = React.useState("");
    const [totalrecords, settotalrecords] = React.useState(0);


    //let deleteTeamsSel = [];


    useEffect(() => {
        // if (page === 0 &&(props.getTeamData === null || props.getTeamData === undefined || props.getTeamData.length === 0)) {
        props.setTeamData(page,getSearchText,rowsPerPage);

        // }


    }, []);

    useEffect(() => {

        if(props.getTeamData && props.getTeamData.status=="success"){
            setloderDisplay(false);
            // localStorage.setItem('totalRecord', props.getScanData.totalrecords);
            settotalrecords(props.getTeamData.totalrecords);
        }
        else
        if(props.getTeamData && props.getTeamData.status=="fail"){
            setloderDisplay(false);
        }

    }, [props.getTeamData]);

    const handleModelClose = () => {
        setModelOpen(false);
    };

    const openCreateTeam = () => {
        let path = `/createteam`;
        history(path);

    }

    const searchText = (e) => {
        setSearchText(e.target.value);
        // if (e.target.value === "") {
        //     { pageNumber(0) }
        // }
        props.setTeamData(page,getSearchText,rowsPerPage);
    }

    const getSearchData = () => {
        props.setTeamData(page,getSearchText,rowsPerPage);
        // let url = config.commonapi + "team/teamlist?text=" + getSearchText + "&page=1&recordsperpage=5"
        // //http://192.168.2.112:3007/team/teamlist?text=team1&page=1&recordsperpage=5
        // //  //"http://192.168.2.112:5002/teamlist?page=" + (pageNum+1) + "&recordsperpage=" + rowsPerPage;
        // setloderDisplay(true);
        // API.sendGetRestRequest(url, "GET").then((response) => {
        //     let resp = response.data;
        //     if (response.data.length === 0) {
        //         setloderDisplay(false);
        //         props.setTeamData(null);
        //     } else {
        //         setloderDisplay(false);
        //         // setRowsPerPage(Number(response.recordsperpage));
        //         props.setTotalTeam(response.totalrecords)
        //         localStorage.setItem('totalRecord', response.totalrecords);

        //         props.setTeamData(resp);

        //     }
        // }).catch((errorResp) => {
        //     seterrorValid(null);
        // })


    }



    const deleteAllTeams = () => {
        if (SelectedTeams.length > 0) {
            setModelOpen1(true);
            setModelMessage("This will permanently delete the teams");

        }

    }

    const handleClickOpen = () => {
        setModelOpen(true);
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


    const deleteClose = () => {
        setModelOpen1(false);
    };



    const singleTeamDelete = (teamsId) => {
        let deleteTeamsSel = [];
        deleteTeamsSel.push(Number(teamsId));
        if (teamsId !== null) {
            setModelOpen1(true);
            setSelectedTeams(deleteTeamsSel);
            setModelMessage("This will permanently delete the team");
        }
    }

    const checkSelectedTeams = (teams) => {
        setSelectedTeams(teams);
    }

    const editTeam = (teams) => {
        localStorage.setItem('editTeamId', teams);
        let path = `/updateTeam`;
        history(path);
    }

    const handleClick = (e, index) => {
        // console.log(index);
    }

    // const pageNumber = (pageNum) => {
    //     setPage(pageNum);
    //     setloderDisplay(true);
    //     // console.log("get rows per page in redux " + props.getTeamPerPage)
    //     let url = "";
    //     url = config.commonapi + "/team/teamlist?page=" + (pageNum + 1) + "&recordsperpage=" + localStorage.getItem("numofCountPerPageAfterChange");
    //     // "http://192.168.2.112:5002/

    //     API.sendGetRestRequest(url, "GET").then((response) => {
    //         let resp = response.data;
    //         if (response.data.length === 0) {
    //             setloderDisplay(false);
    //             props.setTeamData(null);
    //         } else {
    //             setloderDisplay(false);
    //             // setRowsPerPage(Number(response.recordsperpage));
    //             // props.setTotalTeam(response.totalrecords)
    //             localStorage.setItem('totalRecord', response.totalrecords);

    //             props.setTeamData(resp);

    //         }
    //     }).catch((errorResp) => {
    //         seterrorValid(null);
    //     })
    // }

    const numofCountPerPage = (e, arg) => {
        setRowsPerPage(arg);
        if (arg !== undefined) {
            // props.setPerPageData(null);
            // props.setPerPageData(arg.toString());
            localStorage.setItem('numofCountPerPageAfterChange', arg);
            //  { pageNumber(0) }
        }


    }

    const deleteRow = (deleteTeam) => {
        console.log(deleteTeam);
    }



    const headCells = [
        { id: "Type", numeric: true, disablePadding: true, width: 260, label: "Team Name", align: "left" },
        { id: "name", numeric: false, disablePadding: true, width: 300, label: "Number of Applications", align: "left" },
        { id: "addedToSpace", numeric: true, disablePadding: true, width: 130, label: "Action", align: "center" }
    ];



    const renderPage = () => {

        // if (loderDisplay) {
        //     return (
        //         <CircularProgress id="lodingBar" />
        //     )
        // } else {
        return (
            <>
                {/* <Grid item xs={12} id="btnStyle">
        

                </Grid> */}


                <Grid component={Card} sx={{padding:2}} id={"tablestyleID"}>

                   
                        <Grid item xs={6} className={"tableHead1"}>
                            <Typography variant="h6" sx={{padding: '6px 16px'}} align="center" noWrap>
                                Team List
                                 </Typography>

  <SearchIcon sx={{padding:'2px', margin: '8px 0px'}}/>
                                         <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={getSearchText}
                                onChange={searchText}
                                inputProps={{ 'aria-label': 'search' }}
                            />

                            {/* <TextField label="Search…"  value={getSearchText}
                                onChange={searchText} variant="standard" /> */}

                          
                        </Grid>

                        <Grid item xs={6} className={"tableHead2"}>

                    

                                        {(SelectedTeams.length > 1) || (SelectedTeams.length === 1 && props.getTeamData.data.length === 1) ? (
                        <Button
                            id="deleteTeam"
                            variant="contained"
                            onClick={deleteAllTeams}
                            color="primary"
                            className={classes.button}
                            endIcon={<DeleteIcon color="secondary" />}
                        >
                            Delete Team
                        </Button>
                    ) : (
                            <Button
                                id="deleteTeam"
                                disabled={true}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<DeleteIcon
                                    disabled={true} />}
                            >
                                Delete Team
                            </Button>
                        )}

                    <Button
                        id="createTeam"
                        variant="contained"
                        onClick={openCreateTeam}
                        color="primary"
                        className={classes.button}
                        endIcon={<AddIcon />}
                    >
                        Create Team
                        </Button>

                        </Grid>

                    </Grid>
                    <br/>

                    {loderDisplay ? <CircularProgress id="lodingBar" /> :
                        (props.getTeamData !== null ? (

                            <TableView title={""} rows={props.getTeamData.data} columns={headCells} editTeam={(teamsId) => { editTeam(teamsId) }}
                                singleTeamDelete={(teamsId) => { singleTeamDelete(teamsId) }}
                                checkSelectedTeams={(teamsId) => { checkSelectedTeams(teamsId) }}
                                handleClick={(e, index) => { handleClick(e, index) }}
                                show={totalrecords}
                                currentPage= {page}
                                ChangeCurrentPage={( index) => { setPage(index);props.setTeamData(index,getSearchText,rowsPerPage); }}
                                numberOfrows ={rowsPerPage}     
                                ChangeRowsPerPage={( index) => {setPage(1); setRowsPerPage(index);props.setTeamData(1,getSearchText,index); }} 
                                deleteRow={(e, index) => deleteRow(e, index)}></TableView>
                        ) : (
                                <Alert severity="error">No Team Found!!!</Alert>
                            ))

                    }


                


                <Box mt={5}>
                    <AlertDialog show={openModel} handleModelClose={handleModelClose} />
                </Box>


                <Box mt={5}>
                    <ConferMationDailog selarray={SelectedTeams} body={modelMessage} show={openModel1} onclick={deleteClose} />
                </Box>

            </>

        );
        // }

    }




    if (TokenValidation.validToken(props.getUserData) === true) {

        return renderPage()
        // return (
        //     <div className={classes.root}>
        //         {<MenueItem></MenueItem>}
        //         <main className={classes.content}>
        //             <div className={classes.toolbar} />
        //             {renderPage()}


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
        getTeamData: state.getTeamData,
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setTeamData,
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(TeamView);