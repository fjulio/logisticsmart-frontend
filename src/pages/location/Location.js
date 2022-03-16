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
const baseUrl = "http://localhost:8080/api/location";
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
class Location extends React.Component {

    handleClose = () => this.setState({ open: false });
    handleOpen = () => this.setState({ open: true });
    handleCloseUpdate = () => this.setState({ openUpdate: false });
    handleOpenUpdate = (data) => this.setState({ openUpdate: true, form: data, id: data.id });
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
            form: {
                locationName: "",
                latitude: "",
                longitude: "",
                localization: "",
                realArea: "",
                capacity: ""
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    getAll = async () => {
        await axios.get(baseUrl + "/all", {
            headers: { Authorization: 'Bearer ' + cookies.get('token'), Cache: 'no-cache'}
        }).then(response => {
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
        await axios.get(baseUrl + "/search", { params: { name: this.state.form.locationName}, headers: { Authorization: 'Bearer ' + cookies.get('token') } })
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

    delete = async (dato) => {
        var opcion = window.confirm("You want to delete the location: " + dato.name);
        if (opcion) {
            await axios.delete(baseUrl + "/delete/" + dato.id, {
                headers: { Authorization: 'Bearer ' + cookies.get('token') }
            })
                .then(response => {
                    return response.data
                }).then(response => {
                    var users = this.state.data
                    users = response
                    this.setState({ data: users, showAlertDelete: true });
                }).catch(error => {
                    console.log(error);
                });
        }

    }

    save = async (event) => {
        event.preventDefault();
        await axios.post(baseUrl + "/save", this.state.form, { headers: { Authorization: 'Bearer ' + cookies.get('token') } })
            .then(response => {
                return response.data;
            }).then(response => {
                this.getAll();
                this.setState({ showAlert: true, open: false })
            }).catch(error => {
                console.log(error);
            });;
    }

    update = async (event) => {
        event.preventDefault();
        await axios.put(baseUrl + "/update/" + this.state.id, this.state.form, { headers: { Authorization: 'Bearer ' + cookies.get('token') } })
            .then(response => {
                return response.data;
            }).then(response => {
                this.getAll();
                this.setState({ showAlertUpdate: true, openUpdate: false })
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
                    <h2>LOCATION</h2>
                    <br />
                    <Snackbar open={this.state.showAlert}>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={this.handleClick}>
                            Location was successfully created
                        </Alert>
                    </Snackbar>
                    <Snackbar open={this.state.showAlertDelete}>
                        <Alert icon={<WarningOutlined></WarningOutlined>} severity="warning" onClose={this.handleClickAlertDelete}>
                            Location was successfully removed
                        </Alert>
                    </Snackbar>
                    <Snackbar open={this.state.showAlertUpdate}>
                        <Alert icon={<InfoOutlined></InfoOutlined>} severity="info" onClose={this.handleClickAlertUpdate}>
                            Location was successfully updated
                        </Alert>
                    </Snackbar>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <div>
                            <TextField
                                id="standard-required"
                                label="Location Name"
                                variant="standard"
                                name="locationName"
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
                                    <TableCell>Location Name</TableCell>
                                    <TableCell align="right">Latitude</TableCell>
                                    <TableCell align="right">Longitude</TableCell>
                                    <TableCell align="right">Localization</TableCell>
                                    <TableCell align="right">Area</TableCell>
                                    <TableCell align="right">Total Capacity (m³)</TableCell>
                                    <TableCell align="right">Actual Capacity (m³)</TableCell>
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
                                            {data.locationName}
                                        </TableCell>
                                        <TableCell align="right">{data.latitude}</TableCell>
                                        <TableCell align="right">{data.longitude}</TableCell>
                                        <TableCell align="right">{data.localization}</TableCell>
                                        <TableCell align="right">{data.realArea}</TableCell>
                                        <TableCell align="right">{data.capacityTotal}</TableCell>
                                        <TableCell align="right">{data.capacity}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => this.handleOpenUpdate(data)}><Edit/></IconButton>{" "}
                                            <IconButton color="error" onClick={() => this.delete(data)}><Delete/></IconButton>{" "}</TableCell>
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
                            <Typography><PrecisionManufacturing /> LOCATION REGISTRATION</Typography>
                            <br />
                            <TextField
                                label="Location Name"
                                variant="filled"
                                name="locationName"
                                onChange={this.handleChangeForm}
                            />
                            {"    "}
                            <TextField
                                label="Latitude"
                                variant="filled"
                                name="latitude"
                                onChange={this.handleChangeForm}
                            />
                        </div>
                        <br />
                        <div>

                            <TextField
                                id="longitudeId"
                                label="Longitude"
                                variant="filled"
                                name="longitude"
                                onChange={this.handleChangeForm}
                            />
                            {"    "}
                            <TextField
                                label="Localization"
                                variant="filled"
                                name="localization"
                                onChange={this.handleChangeForm}
                                
                            />
                        </div>
                        <br />
                        <div>

                            {"    "}
                            <TextField
                                id="realAreaId"
                                label="Area"
                                variant="filled"
                                name="realArea"
                                onChange={this.handleChangeForm}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            #
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {"    "}
                            <TextField
                                id="capacityId"
                                label="Capacity"
                                variant="filled"
                                name="capacity"
                                onChange={this.handleChangeForm}
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            #
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <br />
                        <Button type="button" color="success" onClick={this.save}>save <SaveOutlined></SaveOutlined></Button>
                    </Box>
                </Modal>
                <Modal
                    open={this.state.openUpdate}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} component="form"

                        noValidate
                        autoComplete="off">
                        <div>
                            <Typography><PrecisionManufacturing /> LOCATION REGISTRATION</Typography>
                            <br />
                            <TextField
                                label="Location Name"
                                variant="filled"
                                name="locationName"
                                onChange={this.handleChangeForm}
                                value={this.state.form.locationName}
                            />
                            {"    "}
                            <TextField
                                label="Latitude"
                                variant="filled"
                                name="latitude"
                                onChange={this.handleChangeForm}
                                value={this.state.form.latitude}
                            />
                        </div>
                        <br />
                        <div>

                            <TextField
                                id="longitudeId"
                                label="Longitude"
                                variant="filled"
                                name="longitude"
                                onChange={this.handleChangeForm}
                                value={this.state.form.longitude}
                            />
                            {"    "}
                            <TextField
                                label="Localization"
                                variant="filled"
                                name="localization"
                                onChange={this.handleChangeForm}
                                value={this.state.form.localization}
                            />
                        </div>
                        <br />
                        <div>

                            {"    "}
                            <TextField
                                id="realAreaId"
                                label="Area"
                                variant="filled"
                                name="realArea"
                                onChange={this.handleChangeForm}
                                value={this.state.form.realArea}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            #
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {"    "}
                            <TextField
                                id="capacityId"
                                label="Capacity"
                                variant="filled"
                                name="capacity"
                                value={this.state.form.capacity}
                                onChange={this.handleChangeForm}
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            #
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <br />
                        <Button type="button" color="success" onClick={this.update}>save <SaveOutlined></SaveOutlined></Button>
                        {"            "}
                        <Button type="button" color="danger" onClick={this.handleCloseUpdate}>Close X</Button>
                    </Box>
                </Modal>

            </div>
        );
    }

}

export default Location;