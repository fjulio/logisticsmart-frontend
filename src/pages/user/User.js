import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie/es6";
import MenuNav from "../menu/MenuNav";
import { Box } from "@mui/system";
import {  TextField } from "@mui/material";
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
import { AccountCircle } from "@material-ui/icons";
import Typography from '@mui/material/Typography';
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
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
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@material-ui/icons";

var DatePicker = require("reactstrap-date-picker")
const data = [];
const dataRoles = [];
const documentTypeData = [{ code: 'TI', name: 'Tarjeta de identidad' }, { code: 'CC', name: 'Cédula de Ciudadanía' }, { code: 'CE', name: 'Cedula de extranjería' }, { code: 'CD', name: 'Carnet Diplomatico' }, { code: 'DE', name: 'Documento Embajada' }];
const cookies = new Cookies();
const baseUrl = "http://localhost:8080/api/";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    m: 2,
};
class User extends React.Component {

    handleClose = () => this.setState({ open: false });
    handleOpen = () => this.setState({ open: true });
    handleCloseUpdate = () => this.setState({ openUpdate: false });
    handleOpenUpdate = (data) => this.setState({ openUpdate: true, form: data, id: data.id});
    constructor() {
        super();
        this.state = {
            documentTypeData: documentTypeData,
            data: data,
            dataRoles: dataRoles,
            open: false,
            openUpdate: false,
            showAlert: false,
            showAlertDelete: false,
            showAlertUpdate: false,
            id: "",
            form: {
                username: "",
                email: "",
                password: "",
                documentNumber: "",
                documentType: "",
                firstName: "",
                lastName: "",
                birthDate: "",
                position: "",
                phone: "",
                rol: "",

            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    getAll = async () => {
        await axios.get(baseUrl + "auth/all")
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


    search = async () => {
        await axios.get(baseUrl + "auth/getByDocument",{params:{documentType: this.state.form.documentType, documentNumber: this.state.form.documentNumber}})
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

    getRoles = async () => {
        await axios.get(baseUrl + "rol/all", {
            headers: { Authorization: 'Bearer ' + cookies.get('token') }
        }).then(response => {
            return response.data;
        }).then(response => {
            var rols = this.state.dataRoles
            rols = response
            this.setState({ dataRoles: rols})
        }).catch(error => {
            console.log(error);
        });;
    }

    delete = async (dato) => {
        var opcion = window.confirm("You want to delete the user: "+dato.username);
        if(opcion){
            await axios.delete(baseUrl + "auth/delete/" + dato.id)
            .then(response => {
                return response.data
            }).then(response => {
                var users = this.state.data
                users = response
                this.setState({ data: users, showAlertDelete: true});
            }).catch(error => {
                console.log(error);
            });
        }
        
    }

    save = async (event) => {
        event.preventDefault();
        await axios.post(baseUrl + "auth/signup", this.state.form)
            .then(response => {
                return response.data;
            }).then(response => {
                this.getAll();
                this.setState({showAlert: true, open: false })
            }).catch(error => {
                console.log(error);
            });;
    }

    update = async (event) => {
        event.preventDefault();
        await axios.put(baseUrl + "auth/update/"+this.state.id, this.state.form)
            .then(response => {
                return response.data;
            }).then(response => {
                this.getAll();
                this.setState({showAlertUpdate: true, openUpdate: false })
            }).catch(error => {
                console.log(error);
            });;
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

    handleClick = async e => {
        this.setState({ showAlert: !this.state.showAlert });
    }
    
    handleClickAlertDelete = async e => {
        this.setState({ showAlertDelete: !this.state.showAlertDelete });
    }

    handleClickAlertUpdate = async e => {
        this.setState({ showAlertUpdate: !this.state.showAlertUpdate });
    }

    componentDidMount = async () => {
        await this.getAll();
        await this.getRoles();
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
                    <h2>USER</h2>
                    <br />
                    <Snackbar open={this.state.showAlert}>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={this.handleClick}>
                            User was successfully created
                        </Alert>
                    </Snackbar>
                    <Snackbar open={this.state.showAlertDelete}>
                        <Alert icon={<WarningOutlined></WarningOutlined>} severity="warning" onClose={this.handleClickAlertDelete}>
                            User was successfully removed
                        </Alert>
                    </Snackbar>
                    <Snackbar open={this.state.showAlertUpdate}>
                        <Alert icon={<InfoOutlined></InfoOutlined>} severity="info" onClose={this.handleClickAlertUpdate}>
                            User was successfully updated
                        </Alert>
                    </Snackbar>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <div>
                           

                            <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                                <InputLabel id="documentType">Document Type</InputLabel>
                                <Select
                                    labelId="documentType"
                                    id="documentType"
                                    value={this.state.form.documentType}
                                    onChange={this.handleChangeForm}
                                    label="document Type"
                                    name="documentType"
                                    variant="standard"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.documentTypeData.map((dt) => (
                                        <MenuItem value={dt.code}>{dt.name}</MenuItem>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                            <TextField
                                id="standard-required"
                                label="Document id"
                                variant="standard"
                                name="documentNumber"
                                onChange={this.handleChangeForm}
                            />
                            {"  "}
                            <Button color="primary" onClick={this.search}><PersonSearchIcon></PersonSearchIcon></Button>

                        </div>

                    </Box>
                    <br />
                    <br />
                    <Button color="success" onClick={this.handleOpen} ><AddCircleRounded></AddCircleRounded></Button>
                    <br />
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="right">Document Type</TableCell>
                                    <TableCell align="right">Document Id</TableCell>
                                    <TableCell align="right">Firstname</TableCell>
                                    <TableCell align="right">Lastname</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Position</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map((data) => (
                                    <TableRow
                                        key={data.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="data">
                                            {data.username}
                                        </TableCell>
                                        <TableCell align="right">{data.documentType}</TableCell>
                                        <TableCell align="right">{data.documentNumber}</TableCell>
                                        <TableCell align="right">{data.firstName}</TableCell>
                                        <TableCell align="right">{data.lastName}</TableCell>
                                        <TableCell align="right">{data.email}</TableCell>
                                        <TableCell align="right">{data.phone}</TableCell>
                                        <TableCell align="right">{data.position}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => this.handleOpenUpdate(data)}><Edit/></IconButton>{" "}
                                            <IconButton color="error" onClick={() => this.delete(data)}><Delete/></IconButton></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} component="form"

                        noValidate
                        autoComplete="off">
                        <div>
                            <Typography>USER REGISTRATION <AccountCircle /></Typography>
                            <br />
                            <TextField
                                label="Document Id"
                                variant="filled"
                                name="documentNumber"
                                onChange={this.handleChangeForm}
                            />
                            {"    "}
                            <FormControl variant="standard" sx={{ m: 0, minWidth: 170 }}>
                                <InputLabel id="documentType">Document Type</InputLabel>
                                <Select
                                    labelId="documentType"
                                    id="documentType"
                                    value={this.state.form.documentType}
                                    onChange={this.handleChangeForm}
                                    label="document Type"
                                    name="documentType"
                                    variant="filled"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.documentTypeData.map((dt) => (
                                        <MenuItem value={dt.code}>{dt.name}</MenuItem>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <br />
                        <div>
                            <TextField
                                label="Firstname"
                                variant="filled"
                                name="firstName"
                                onChange={this.handleChangeForm}
                            />
                            {"    "}
                            <TextField
                                id="standard-required"
                                label="Lastname"
                                variant="filled"
                                name="lastName"
                                onChange={this.handleChangeForm}
                            />
                            {"    "}
                            <TextField
                                id="phone"
                                label="Phone"
                                variant="filled"
                                name="phone"
                                onChange={this.handleChangeForm}
                            />
                        </div>
                        <br />
                        <div>
                            <TextField
                                id="username"
                                label="Username"
                                variant="filled"
                                name="username"
                                onChange={this.handleChangeForm}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">

                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {"    "}
                            <TextField
                                id="email"
                                label="Email"
                                variant="filled"
                                name="email"
                                onChange={this.handleChangeForm}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            @
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {"    "}
                            <TextField
                                id="password"
                                label="password"
                                variant="filled"
                                type="password"
                                name="password"
                                onChange={this.handleChangeForm}
                            />
                        </div>
                        <br />
                        <div>
                            <TextField
                                id="position"
                                label="Position"
                                variant="filled"
                                name="position"
                                onChange={this.handleChangeForm}
                            />
                            {"    "}
                            <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Rol</InputLabel>
                                <Select
                                    labelId="rol"
                                    id="rol"
                                    value={this.state.form.rol}
                                    onChange={this.handleChangeForm}
                                    label="Rol"
                                    name="rol"
                                    variant="filled"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.dataRoles.map((rol) => (
                                        <MenuItem value={rol.code}>{rol.rolName}</MenuItem>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <br />
                        <Button type="button" color="success" onClick={this.save}>save <SaveOutlined></SaveOutlined></Button>
                    </Box>
                </Modal>


                <Modal
                    open={this.state.openUpdate}
                    onClose={this.handleCloseUpdate}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} component="form"

                        noValidate
                        autoComplete="off">
                        <div>
                            <Typography>USER UPDATE <AccountCircle /></Typography>
                            <br />
                            <TextField
                                label="Document Id"
                                variant="filled"
                                name="documentNumber"
                                onChange={this.handleChangeForm}
                                value={this.state.form.documentNumber}
                            />
                            {"    "}
                            <FormControl variant="standard" sx={{ m: 0, minWidth: 170 }}>
                                <InputLabel id="documentType">Document Type</InputLabel>
                                <Select
                                    labelId="documentType"
                                    id="documentType"
                                    value={this.state.form.documentType}
                                    onChange={this.handleChangeForm}
                                    label="document Type"
                                    name="documentType"
                                    variant="filled"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.documentTypeData.map((dt) => (
                                        <MenuItem value={dt.code}>{dt.name}</MenuItem>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <br />
                        <div>
                            <TextField
                                label="Firstname"
                                variant="filled"
                                name="firstName"
                                onChange={this.handleChangeForm}
                                value={this.state.form.firstName}
                            />
                            {"    "}
                            <TextField
                                id="standard-required"
                                label="Lastname"
                                variant="filled"
                                name="lastName"
                                onChange={this.handleChangeForm}
                                value={this.state.form.lastName}
                            />
                            {"    "}
                            <TextField
                                id="phone"
                                label="Phone"
                                variant="filled"
                                name="phone"
                                onChange={this.handleChangeForm}
                                value={this.state.form.phone}
                            />
                        </div>
                        <br />
                        <div>
                            <TextField
                                disabled
                                id="username"
                                label="Username"
                                variant="filled"
                                name="username"
                                onChange={this.handleChangeForm}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">

                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                value={this.state.form.username}
                            />
                            {"    "}
                            <TextField
                                id="email"
                                label="Email"
                                variant="filled"
                                name="email"
                                disabled
                                onChange={this.handleChangeForm}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            @
                                        </InputAdornment>
                                    ),
                                }}
                                value={this.state.form.email}
                            />
                            {"    "}
                            <TextField
                                id="password"
                                label="password"
                                variant="filled"
                                type="password"
                                name="password"
                                onChange={this.handleChangeForm}
                                value={this.state.form.password}
                            />
                        </div>
                        <br />
                        <div>
                            <TextField
                                id="position"
                                label="Position"
                                variant="filled"
                                name="position"
                                onChange={this.handleChangeForm}
                                value={this.state.form.position}
                            />
                            {"    "}
                            <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Rol</InputLabel>
                                <Select
                                    labelId="rol"
                                    id="rol"
                                    value={this.state.form.rol}
                                    onChange={this.handleChangeForm}
                                    label="Rol"
                                    name="rol"
                                    variant="filled"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.dataRoles.map((rol) => (
                                        <MenuItem value={rol.code}>{rol.rolName}</MenuItem>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <br />
                        <Button type="button" color="success" onClick={this.update}>save <SaveOutlined></SaveOutlined></Button>
                    </Box>
                </Modal>

            </div>
        );
    }

}

export default User;