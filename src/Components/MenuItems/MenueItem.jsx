import { Link, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles, useTheme } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ComputerIcon from '@mui/icons-material/Computer';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfoDirect } from '../../Redux-Action';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
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



function MenueItem(props) {

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


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const openHome = () => {
        setCurrentPage("dashbord");
        let path = `/dashboard`;
            history(path);
    }

    const openTeam = () => {
        setCurrentPage("Team");
        let path = `/team`;
            history(path);
    }

    const openScan = () => {
        setCurrentPage("Scan");
        let path = `/scan`;
            history(path);
    }

    const openSystem = () => {
        setCurrentPage("System");
        let path = `/system`;
            history(path);
    }


    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClickOpen = () => {
        setModelOpen(true);
    };

    const handleModelClose = () => {
        setModelOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState("dashbord");
    const [openModel, setModelOpen] = React.useState(false);
    const history = useNavigate();

    const headerPage = () => {
        if (currentPage === "dashbord") {
            return (
                <Typography variant="h6" noWrap>
                    Dashboard
                </Typography>
            )
      
         }
    }


        return (
            <div>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                    Security App
                </Typography>
                        {/* {headerPage()} */}
                        <Link color="inherit" style={{ position: "absolute", right: 20 }}>
                            <Badge color="secondary" spacing={24}>
                                <PersonSharpIcon onClick={handleClick} />
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
                            </Badge>

                        </Link>

                    </Toolbar>

                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon  onClick={openHome}/>
                            </ListItemIcon>
                            <ListItemText onClick={openHome} primary="Home" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <GroupIcon onClick={openTeam} />
                            </ListItemIcon>
                            <ListItemText onClick={openTeam} primary="Team Management" />   
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <VisibilityIcon  onClick={openScan}/>
                            </ListItemIcon>
                            <ListItemText onClick={openScan} primary="Scan Management" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ComputerIcon  onClick={openSystem} />
                            </ListItemIcon>
                            <ListItemText onClick={openSystem} primary="System Management" />
                        </ListItem>


                    </List>
                </Drawer>
            </div>
          
        );
    
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

export default connect(mapStateToProps, mapDispatchToProps())(MenueItem);