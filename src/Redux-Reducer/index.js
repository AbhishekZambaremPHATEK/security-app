import { combineReducers } from 'redux';

const getUserData = (State = null, action) => {
    if (action.type === 'SET_USER_INFO') {
        return action.payload
    }
    return State;
}

const getTeamData = (State = null, action) => {
    if (action.type === 'SET_TEAM_DATA') {
        return action.payload
    }
    return State;
}

const getScanData = (State = null, action) => {
    if (action.type === 'SET_SCAN_DATA') {
        return action.payload
    }
    return State;
}

const getAppDetails = (State = null, action) => {
    if (action.type === 'SET_APP_DETAILS') {
        return action.payload
    }
    return State;
}

const getAddScanJob = (State = null, action) => {
    if (action.type === 'SET_ADD_SCAN_JOB') {
        return action.payload
    }
    return State;
}

const getAddTeam = (State = null, action) => {
    if (action.type === 'SET_ADD_TEAM') {
        return action.payload
    }
    return State;
}

const getUpdateTeam = (State = null, action) => {
    if (action.type === 'SET_UPDATE_TEAM') {
        return action.payload
    }
    return State;
}

const getSearchMembers = (State = null, action) => {
    if (action.type === 'SET_SEARCH_MEMBERS') {
        return action.payload
    }
    return State;
}


const getReportData = (State = null, action) => {
    if (action.type === 'SET_REPORT_DATA') {
        return action.payload
    }
    return State;
}

const getReportDataAll = (State = null, action) => {
    if (action.type === 'SET_REPORT_DATA_ALL') {
        return action.payload
    }
    return State;
}

const getAddApp = (State = null, action) => {
    if (action.type === 'SET_ADD_APP') {
        return action.payload
    }
    return State;
}

const getUpdateApp = (State = null, action) => {
    if (action.type === 'SET_UPDATE_APP') {
        return action.payload
    }
    return State;
}

const getDeleteApp = (State = null, action) => {
    if (action.type === 'SET_DELETE_APP') {
        return action.payload
    }
    return State;
}

const getDeleteTeam = (State = null, action) => {
    if (action.type === 'SET_DELETE_TEAM') {
        return action.payload
    }
    return State;
}


const getApplicationData = (State = null, action) => {
    if (action.type === 'SET_APPLICATION_DATA') {
        return action.payload
    }
    return State;
}



export default combineReducers(
    {
        getUserData,
        getTeamData,
        getScanData,
        getReportData,
        getAppDetails,
        getAddScanJob,
        getAddTeam,
        getUpdateTeam,
        getSearchMembers,
        getAddApp,
        getUpdateApp,
        getApplicationData,
        getDeleteApp,
        getDeleteTeam,
        getReportDataAll
    }
);



// const rootReducer =(state= {},action)=>{
//     switch(action.type){
//         case 'SET_USER_INFO':
//             return {...state,"getUserData":{...action.payload}}
//         case 'SET_TEAM_DATA':
//             return {...state,"getTeamData":{...action.payload}}
//         case 'SET_SCAN_DATA':
//             return {...state,"getScanData":{...action.payload}}
//         case 'SET_REPORT_DATA':
//             return {...state,"getReportData":{...action.payload}}    
//         default :      
//             return state              
//     }
// }
// export default rootReducer