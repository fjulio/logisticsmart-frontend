import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie/es6";
import MenuNav from "../menu/MenuNav";
import { Box } from "@mui/system";
import { Icon, TextField } from "@mui/material";
import { Button } from "reactstrap";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { InputAdornment } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Container } from "reactstrap";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { AddCircleRounded } from "@material-ui/icons";
import { Snackbar } from "@material-ui/core";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { SaveOutlined } from "@material-ui/icons";
import { WarningOutlined } from "@material-ui/icons";
import { InfoOutlined } from "@material-ui/icons";
import { PrecisionManufacturing } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@material-ui/icons";

const data = [];
const cookies = new Cookies();
const baseUrl = "http://localhost:8080/api/notification";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    m: 2,
};
class Notification extends React.Component {
    constructor() {
        super();
        this.state = {
            data: data,
            open: false,
            openUpdate: false,
            showAlert: false,
            showAlertDelete: false,
            showAlertUpdate: false,
            id: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    findByUserId = async () => {
        await axios.get(baseUrl + "/"+cookies.get('id'), { headers: { Authorization: 'Bearer ' + cookies.get('token') } })
            .then(response => {
                return response.data
            })
            .then(response => {
                var users = this.state.data
                users = response
                this.setState({ data: users });
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChangeForm = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    componentDidMount = async () => {
        await this.findByUserId();
        if (!cookies.get('token')) {
            window.location.href = "./";
        }
    }

    render() {
        return (
            <div>
                <MenuNav />
                <Container>
                    <br />
                    <h2>NOTIFICATIONS</h2>
                    <br />
                    <br />
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell align="right">Message</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map((data) => (
                                    <TableRow
                                        key={data.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="data">
                                            {data.type}
                                        </TableCell>
                                        <TableCell align="right">{data.message}</TableCell>
                                        <TableCell align="right">{data.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>

            </div>
        );
    }

}

export default Notification;