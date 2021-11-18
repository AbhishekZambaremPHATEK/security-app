import API from '../Api/HTTP';
import config from '../Config';

export const setUserInfo = (data) => async dispatch => {
    try {
        const res = await API.sendPostRestRequest(config.commonapi + "auth/login", 'POST', data)
        dispatch({
            type: 'SET_USER_INFO',
            payload: res
        });
      } catch (err) {
        dispatch({
            type: 'SET_USER_INFO',
            payload: err
        });
      }
}

export const setUserInfoDirect = (data) => {
    return {
        type: 'SET_USER_INFO',
        payload: data
    }
}


export const setRegisterUser = (data) => async dispatch => {
    try {
        const res = await API.sendPostRestRequest(config.commonapi + "auth/register", 'POST', data)
        dispatch({
            type: 'SET_USER_INFO',
            payload: res
        });
      } catch (err) {
        dispatch({
            type: 'SET_USER_INFO',
            payload: err
        });
      }
}


export const setRefreshTokan = (auth_token) => async dispatch => {
    try {
        API.setAuthorization("Bearer "+auth_token)
        const res = await API.sendGetRestRequest(config.commonapi + "auth/get-refresh-token", "GET")
            dispatch({
                type: 'SET_USER_INFO',
                payload: res
            });
     
      } catch (err) {
        dispatch({
            type: 'SET_USER_INFO',
            payload: err
        });
      }
}

export const setTeamData = (page,getSearchText='',rowsPerPage) => async dispatch => {
    try {
        var url;
        if(getSearchText==''){
            url=config.commonapi + "team/teamlist?page="+page+"&recordsperpage="+rowsPerPage
        }else{
            url=config.commonapi + "team/teamlist?text=" + getSearchText + "&page="+page+"&recordsperpage="+rowsPerPage
        }
        const res = await API.sendGetRestRequest(url, 'GET')
        dispatch({
            type: 'SET_TEAM_DATA',
            payload: res
        });
      } catch (err) {
        dispatch({
          type: 'SET_TEAM_DATA',
          payload: err
      });
      }
    
}

export const setScanData = (page,getSearchText='',rowsPerPage) => async dispatch => {
    try {
        var url;
        if(getSearchText==''){
            url=config.commonapi + "/scanmgmt/view-scan-list?page="+page+"&recordsperpage="+rowsPerPage
        }else{
            url=config.commonapi + "/scanmgmt/view-scan-list?text=" + getSearchText + "&page="+page+"&recordsperpage="+rowsPerPage
        }
        const res = await API.sendGetRestRequest(url, 'GET')
        dispatch({
            type: 'SET_SCAN_DATA',
            payload: res
        });
      } catch (err) {
        dispatch({
          type: 'SET_SCAN_DATA',
          payload: err
      });
      }
}


export const setAppDetails = (Id) => async dispatch => {
    try {
        const res = await API.sendGetRestRequest(config.commonapi + "/app/" + Id, 'GET')
        dispatch({
            type: 'SET_APP_DETAILS',
            payload: res
        });
      } catch (err) {
        dispatch({
            type: 'SET_APP_DETAILS',
            payload: err
        });
      }
}

export const setAddScanJob = (data) => async dispatch => {
    try {
        const res = await API.sendPostRestRequest(config.commonapi + "/scanmgmt/add-scan-job", 'POST', data)
        dispatch({
            type: 'SET_ADD_SCAN_JOB',
            payload: res
        });
      } catch (err) {
        dispatch({
            type: 'SET_ADD_SCAN_JOB',
            payload: err
        });
      }
}

export const setAddScanJobDirect = (data) => {
    return {
        type: 'SET_ADD_SCAN_JOB',
        payload: data
    }
}

export const setAddTeam = (data) => async dispatch => {
    try {
        const res = await API.sendPostRestRequest(config.commonapi + "team/create-team", 'POST', data)
        dispatch({
            type: 'SET_ADD_TEAM',
            payload: res
        });
      } catch (err) {
        dispatch({
            type: 'SET_ADD_TEAM',
            payload: err
        });
      }
}

export const setAddTeamDirect = (data) => {
    return {
        type: 'SET_ADD_TEAM',
        payload: data
    }
}

export const setUpdateTeam = (data) => async dispatch => {
    try {
        const res = await API.sendPostRestRequest(config.commonapi + "team/update-team", 'POST', data)
        dispatch({
            type: 'SET_UPDATE_TEAM',
            payload: res
        });
      } catch (err) {
        dispatch({
            type: 'SET_UPDATE_TEAM',
            payload: err
        });
      }
}


export const setSearchMembers = (text) => async dispatch => {
    try {
        const res = await API.sendGetRestRequest(config.commonapi + "auth/search-members?text=" + text, "GET")
        dispatch({
            type: 'SET_SEARCH_MEMBERS',
            payload: res
        });
      } catch (err) {
        dispatch({
            type: 'SET_SEARCH_MEMBERS',
            payload: err
        });
      }
}


export const setAddApp = (data) => async dispatch => {
    try {
        const res = await API.sendPostRestRequest(config.commonapi + "app/create-app", 'POST', data)
        dispatch({
            type: 'SET_ADD_APP',
            payload: res
        });
      } catch (err) {
        dispatch({
            type: 'SET_ADD_APP',
            payload: err
        });
      }
}

export const setAddAppDirect = (data) => {
    return {
        type: 'SET_ADD_APP',
        payload: data
    }
}

export const setUpdateApp = (data) => async dispatch => {
    try {
        const res = await API.sendPostRestRequest(config.commonapi + "app/update-app", 'POST', data)
        dispatch({
            type: 'SET_UPDATE_APP',
            payload: res
        });
      } catch (err) {
        dispatch({
            type: 'SET_UPDATE_APP',
            payload: err
        });
      }
}

export const setApplicationData = (team_id,page,getSearchText='',rowsPerPage) => async dispatch => {
    try {
        var url;
        if(getSearchText==''){
            url=config.commonapi + "app/applist?page=" + page + "&team_id=" + team_id+"&recordsperpage="  + rowsPerPage
        }else{
            url=config.commonapi + "app/applist?text="+getSearchText+"&page=" + page + "&team_id=" + team_id +"&recordsperpage="  + rowsPerPage
        }
        const res = await API.sendGetRestRequest(url, 'GET')
        dispatch({
            type: 'SET_APPLICATION_DATA',
            payload: res
        });
      } catch (err) {
        dispatch({
          type: 'SET_APPLICATION_DATA',
          payload: err
      });
      }
    
}

export const setDeleteApp = (data) => async dispatch => {
  try {
      const res = await API.sendPostRestRequest(config.commonapi +"/app/delete-app", 'POST', data)
      dispatch({
          type: 'SET_DELETE_APP',
          payload: res
      });
    } catch (err) {
      dispatch({
          type: 'SET_DELETE_APP',
          payload: err
      });
    }
}

export const setDeleteTeam = (data) => async dispatch => {
  try {
      const res = await API.sendPostRestRequest(config.commonapi + "team/delete-team", 'POST', data)
      dispatch({
          type: 'SET_DELETE_TEAM',
          payload: res
      });
    } catch (err) {
      dispatch({
          type: 'SET_DELETE_TEAM',
          payload: err
      });
    }
}

export const setDeleteTeamDirect = (data) => {
    return {
        type: 'SET_DELETE_TEAM',
        payload: data
    }
}

export const setReportData = (page,rowsPerPage,app_id,startDate=null,endDate=null) => async dispatch => {
    try {
        var url;
        if(startDate==null || endDate==null){
            url=config.commonapi + "/scanmgmt/generate-report?type=pagewise&page="+page+"&recordsperpage="+rowsPerPage+"&app_id="+app_id
        }else{
            url=config.commonapi + "/scanmgmt/generate-report?type=pagewise&page="+page+"&recordsperpage="+rowsPerPage+"&app_id="+app_id+"&start_date="+startDate+"&end_date="+endDate
        }
        
        const res = await API.sendGetRestRequest(url, 'GET')
        dispatch({
            type: 'SET_REPORT_DATA',
            payload: res
        });
      } catch (err) {
        dispatch({
          type: 'SET_REPORT_DATA',
          payload: err
      });
      }
    
}

export const setReportDataAll = (appid) => async dispatch => {
    try {
        const res = await API.sendGetRestRequest(config.commonapi + "/scanmgmt/generate-report?app_id="+appid, 'GET')
        dispatch({
            type: 'SET_REPORT_DATA_ALL',
            payload: res
        });
      } catch (err) {
        dispatch({
          type: 'SET_REPORT_DATA_ALL',
          payload: err
      });
      }
    
}

// export const setPage = (page) => {
//     return {
//         type: 'SET_PAGE_INFO',
//         payload: page
//     }
// }

// export const setTeam = (team) => {
//     return {
//         type: 'SET_TEAM_INFO',
//         payload: team
//     }
// }



// export const setCurrentEditTeamID = (team) => {
//     return {
//         type: 'SET_EDIT_TEAM_ID',
//         payload: team
//     }
// }

// export const setTotalTeam = (team) => {
//     return {
//         type: 'SET_TOTAL_TEAM',
//         payload: team
//     }
// }

// export const setReg = (reg) => {
//     return {
//         type: 'SET_REG_INFO',
//         payload: reg
//     }
// }



// export const setPerPageData = (reg) => {
//     return {
//         type: 'SET_TEAM_PERPAGE',
//         payload: reg
//     }
    
// }

// export const setApplications = (reg) => {
//     return {
//         type: 'SET_APPLICATION_DATA',
//         payload: reg
//     }
    
// }







