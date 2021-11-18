import React,{useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setUserInfoDirect,setRefreshTokan } from '../../Redux-Action';
import LoginView from '../Login/LoginView';
import { connect } from 'react-redux';
import API from '../../Api/HTTP';
import config from '../../Config';


function AlertDialog(props) {

    const handleModelClose = () => {
        props.handleModelClose()
    };
    useEffect(() => {
        if(props.getUserData && props.getUserData.status=="success") handleModelClose();
    }, [props.getUserData]);
    
    const logoutClick = () => {
        // localStorage.removeItem("user");
        // localStorage.clear();
        // if (props.getUserData !== undefined) {

            props.setUserInfoDirect(null);
            handleModelClose();
            return (<LoginView></LoginView>);
        // }

    }

    const sessionContinue = () => {
        var storage = props.getUserData;
        if ( storage !== null) {
            var strDateTime = storage.exp;

            var result = strDateTime - (new Date().getTime() / 1000);
            if (result < 1) {
                logoutClick();
            } else {
                props.setRefreshTokan(storage.auth_token);
            }


        }

    }




    return (
        <div>
            <Dialog
                open={props.show}
                // onClose={handleModelClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Security application Session"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* {props.body} */}
                        Your session is going to expire in 60 seconds. Want to continue the session?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={logoutClick} color="primary">
                        No
          </Button>
                    <Button onClick={sessionContinue} color="primary" autoFocus>
                        Continue
          </Button>
                </DialogActions>
            </Dialog>
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
        setRefreshTokan
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(AlertDialog);