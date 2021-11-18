import { Box } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../Redux-Action';
import TokenValidation from '../Common/TokenValidation';
import MenueItem from '../MenuItems/MenueItem';
import AlertDialog from '../ModelPopup/AlertDialog';

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


function SystemView(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [openModel, setModelOpen] = React.useState(false);
    const history = useNavigate();


    const handleModelClose = () => {
        setModelOpen(false);
    };

   
    

    
    const renderPage = () => {
        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    Hello! Welcome to the System Management
                </Typography>
                <Box mt={5}>
                    <AlertDialog show={openModel} handleModelClose={handleModelClose} />
                </Box>
            </div>


        );
        
    }



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
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(SystemView);