import * as React from 'react';
import { connect } from 'react-redux';
import { setUserInfoDirect } from '../Redux-Action/index';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles, useTheme, withStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Menu, MenuItem} from '@mui/material';

import { useNavigate,useLocation } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import ComputerIcon from '@mui/icons-material/Computer';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SecurityIcon from '@mui/icons-material/Security';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import DashboardView from '../Components/Dashboard/DashboardView';
import LoginView from '../Components/Login/LoginView';
import RegistrationView from '../Components/Registration/RegistrationView';
import NotFound from '../Components/Common/NotFound';
import TeamView from '../Components/TeamManagement/TeamView';
import SystemView from '../Components/SystemManagement/SystemView';
import ScanView from '../Components/ScanManagement/ScanView';
import CreateTeam from '../Components/CreateTeam/CreateTeam';
import CreateApplication from '../Components/CreateApplication/CreateApplication';
import ApplicationView from '../Components/ApplicationView/ApplicationView';
import UpdateTeam from '../Components/CreateTeam/UpdateTeam';
import Updateapplication from '../Components/CreateApplication/Updateapplication';
import ScanManagement from '../Components/ScanManagement/ScanManagement';
import Report from '../Components/Report/Report';
import { borderRadius } from '@mui/system';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  btn: {

  },
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth + 25,
    borderRadius:20,
    marginRight:25,
    marginTop:15,
    width: `calc(100% - ${drawerWidth + 50 }px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function DashboardContent(props) {
const history = useNavigate();
const location = useLocation();
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);
const logoutClick = () => {
    // localStorage.removeItem("user");
    // localStorage.clear();
    if (props.getUserData !== undefined) {

        props.setUserInfoDirect(null);
        handleClose();
        let path = `/login`;
        history(path);

    }

}

const handleClose = () => {
    setAnchorEl(null);
};


const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const openHome = () => {
    // setCurrentPage("dashbord");
    let path = `/dashboard`;
        history(path);
}

const openTeam = () => {
    // setCurrentPage("Team");
    let path = `/team`;
        history(path);
}

const openScan = () => {
    // setCurrentPage("Scan");
    let path = `/scan`;
        history(path);
}

const openSystem = () => {
    // setCurrentPage("System");
    let path = `/system`;
        history(path);
}
console.log(location.pathname);
return location.pathname==='/login' || location.pathname==='/' || location.pathname==='/registration'?
 (<>
    <Redirect exact from="/" to="login" />
                        <Route exact path='/login' component={LoginView} />
                        <Route path='/registration' component={RegistrationView} />
         </>               )
                        :
  (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              {/* <Badge badgeContent={4} color="secondary"> */}
                <NotificationsIcon onClick={handleClick}  />
              {/* </Badge> */}
              <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={logoutClick}>Logout
                                       
                                    </MenuItem>

                                </Menu>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [1],
              backgroundColor: '#F9FAFB',
              borderRadius:2,
              margin:2
            }}
          >
            <SecurityIcon color="primary" />     
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              // noWrap
              // sx={{ flexGrow: 1 }}
            >Security App 
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon color="primary"/>
            </IconButton>
          </Toolbar>
          {/* <Divider /> */}
          <List sx={{px:1}}>
          <ListItem button className={classes.btn} sx={{borderRadius:2,padding:2}}>
                            <ListItemIcon sx={{marginRight:3}}>
                                <HomeIcon  onClick={openHome}/>
                            </ListItemIcon>
                            <ListItemText onClick={openHome} primary="Home" />
                        </ListItem>
                        <ListItem button className={classes.btn} sx={{borderRadius:2,padding:2}}>
                            <ListItemIcon sx={{marginRight:3}}>
                                <GroupIcon onClick={openTeam} />
                            </ListItemIcon>
                            <ListItemText onClick={openTeam} primary="Team Management" />   
                        </ListItem>
                        <ListItem button className={classes.btn} sx={{borderRadius:2,padding:2}}>
                            <ListItemIcon sx={{marginRight:3}}>
                                <VisibilityIcon  onClick={openScan}/>
                            </ListItemIcon>
                            <ListItemText onClick={openScan} primary="Scan Management" />
                        </ListItem>
                        <ListItem button className={classes.btn} sx={{borderRadius:2,padding:2}}>
                            <ListItemIcon sx={{marginRight:3}}>
                                <ComputerIcon  onClick={openSystem} />
                            </ListItemIcon>
                            <ListItemText onClick={openSystem} primary="System Management" />
                        </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* <Router  > */}
                   
                        <Route path='/dashboard' component={DashboardView} />
                        
                        <Route path='/team' component={TeamView} />
                        <Route path='/scan' component={ScanView} />
                        <Route path='/system' component={SystemView} />
                        <Route path='/createteam' component={CreateTeam} />
                        <Route path='/createapplication' component={CreateApplication} />
                        <Route path='/viewApplication' component={ApplicationView} />
                        <Route path='/updateTeam' component={UpdateTeam} />
                        <Route path='/updateapplication' component={Updateapplication} />
                        <Route path='/scanmanagement' component={ScanManagement} />
                        <Route path='/report' component={Report} />
                        {/* <Route path='/demo' component={Demo} /> */}
                        {/* <Route path='**' component={NotFound} /> */}
                    
                {/* </Router> */}
          </Container>
        </Box>
      </Box>
  ) 
}


const mapStateToProps = state => {
    return {
        getUserData: state.getUserData,
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfoDirect,
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(DashboardContent);