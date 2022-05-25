import React from 'react';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from '../pages/login/Login';
import MenuNav from '../pages/menu/MenuNav';
import User from '../pages/user/User';
import Equipment from '../pages/equipment/Equipment';
import Invoice from '../pages/invoice/Invoice';
import Location from '../pages/location/Location';
import Entry from '../pages/entry/Entry';
import Menu from '../pages/menu/Menu';
import Notification from '../pages/notification/Notification';

function RoutesPage(){
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/user" element={<User/>}/>
                <Route exact path="/equipment" element={<Equipment/>}/>
                <Route exact path="/requisition" element={<Invoice/>}/>
                <Route exact path="/location" element={<Location/>}/>
                <Route exact path="/entry" element={<Entry/>}/>
                <Route exact path="/home" element={<Menu/>}/>
                <Route exact path="/notification" element={<Notification/>}/>
            </Routes>
        </Router>
    );
}

export default RoutesPage;