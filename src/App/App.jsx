import { BrowserRouter as Router, Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
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

import AuthenticationLayout from './Layout/AuthenticationLayout';
import DashboardLayout from './Layout/DashboardLayout';

function DashboardContent() {
    return (
    <Router>
    <Routes>
      <Route path="/" element={<AuthenticationLayout />}>
        <Route index element={<LoginView />} />
        <Route path="login" element={<Navigate to="/" />} />
        <Route path="registration" element={<RegistrationView />}/>
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path='/dashboard' element={<DashboardView/>} />
        <Route path='/team' element={<TeamView/>} />
        <Route path='/scan' element={<ScanView/>} />
        <Route path='/system' element={<SystemView/>} />
        <Route path='/createteam' element={<CreateTeam/>} />
        <Route path='/createapplication' element={<CreateApplication/>} />
        <Route path='/viewApplication' element={<ApplicationView/>} />
        <Route path='/updateTeam' element={<UpdateTeam/>} />
        <Route path='/updateapplication' element={<Updateapplication/>} />
        <Route path='/scanmanagement' element={<ScanManagement/>} />
        <Route path='/report' element={<Report/>} />

      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </Router>
    )
}

export default DashboardContent;