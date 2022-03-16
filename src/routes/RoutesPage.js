import React from 'react';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from '../pages/login/Login';
import MenuNav from '../pages/menu/MenuNav';
import User from '../pages/user/User';
import Equipment from '../pages/equipment/Equipment';
import Invoice from '../pages/invoice/Invoice';
import Location from '../pages/location/Location';
import Entry from '../pages/entry/Entry';

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
            </Routes>
        </Router>
    );
}

export default RoutesPage;