import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../../Api/HTTP';
import config from '../../Config';
import { setUserInfo,setDeleteApp } from '../../Redux-Action';


function ConferMationDailog(props) {
    useEffect(() => {
        if(props.getDeleteApp && props.getDeleteApp.status=="success"){
            window.location.reload();
                    handleModelClose();
        }else if (props.getDeleteApp && props.getDeleteApp.status === "fail") {
            handleModelClose();
       } 
    }, [props.getDeleteApp]);
    
    const history = useNavigate();  
    const onCellClickDeleteTeam = () => {
        
        if (props.selarray !== null) {
   
       
            let requestOptions = {
                "delete_ids": props.selarray,
            }
            props.setDeleteApp(requestOptions)
            // API.sendPostRestRequest(config.commonapi +"/app/delete-app", 'POST', requestOptions).then((response) => {
            //     if (response.status === "fail") {
            //         handleModelClose();
                    
            //     } else if (response.status === "success") {
                   
            //         window.location.reload();
            //         handleModelClose();

            //     }

            // }).catch((errorResp) => {
            //     handleModelClose();
                
            // })


        }




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
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.body}
                        {/* Your session is going to expire in 60 seconds. Want to continue the session? */}
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModelClose} color="primary">
                        No
          </Button>
                    <Button onClick={onCellClickDeleteTeam} color="primary" autoFocus>
                        Yes
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const mapStateToProps = state => {
    
    return {
        getUserData: state.getUserData,
        getDeleteApp:state.getDeleteApp
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
        setDeleteApp
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(ConferMationDailog);