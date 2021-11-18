import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../../Api/HTTP';
import { setUserInfo } from '../../Redux-Action';


function ApiResponceAlert(props) {

    const history = useNavigate();  
    const onCellClickDeleteTeam = () => {

        let path = props.urlRedirect;
        history(path);
        handleModelClose();

    }



    const handleModelClose = () => {
        props.onclick()
    };
    return (
         <div>
            <Dialog
                open={props.show}
                // onClose={handleModelClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.body}
                        {/* Your session is going to expire in 60 seconds. Want to continue the session? */}
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleModelClose} color="primary">
                      
          </Button> */}
                    <Button onClick={onCellClickDeleteTeam} color="primary" autoFocus>
                        OK
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
        setUserInfo,
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(ApiResponceAlert);