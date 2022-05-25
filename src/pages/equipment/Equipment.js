import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie/es6";
import MenuNav from "../menu/MenuNav";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
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
import { InputLabel } from "@mui/material";
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
import { Edit } from "@material-ui/icons";
import { SaveOutlined } from "@material-ui/icons";
import { WarningOutlined } from "@material-ui/icons";
import { InfoOutlined } from "@material-ui/icons";
import { PrecisionManufacturing } from "@mui/icons-material";
import { Search } from "@material-ui/icons";
import InputIcon from '@mui/icons-material/Input';
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Output } from "@mui/icons-material";
import { TablePagination } from "@mui/material";

const data = [];
const dataRoles = [];
const categoryData = [{ code: 'CATEGORY A', name: 'categoria A' }, { code: 'CATEGORY B', name: 'categoria B' }];
const cookies = new Cookies();
const baseUrl = "http://localhost:8080/api/equipment";
const baseInvoice = "http://localhost:8080/api/invoice";
const baseLocation = "http://localhost:8080/api/location";
const baseEntry = "http://localhost:8080/api/entrada";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 8,
    m: 2,
};

const styleModalEntry = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 7,
    m: 2,
};
class Equipment extends React.Component {

    handleClose = () => this.setState({ open: false });
    handleOpen = () => this.setState({ open: true });
    handleCloseUpdate = () => this.setState({ openUpdate: false });
    handleOpenUpdate = (data) => this.setState({ openUpdate: true, form: data, id: data.id });

    constructor() {
        super();
        this.state = {
            categoryData: categoryData,
            openModalEntry: false,
            openModalMovement: false,
            data: data,
            page: 0,
            rowsPerPage: 5,
            dataLocations: [],
            dataRoles: dataRoles,
            open: false,
            entryId:"",
            openUpdate: false,
            showAlert: false,
            showAlertDelete: false,
            showAlertUpdate: false,
            id: "",
            form: {
                name: "",
                category: "",
                netWeight: "",
                grossWeight: "",
                height: "",
                width: "",
                equipmentLong: "",
                requisition: "",
                invoice: {
                    id: "",
                    dateInvoice: "",
                    code: ""
                }
            },
            entry: {
                expectedEntryDate: "",
                expectedDepartureDate: "",
                realEntryDate: "",
                realDepartureDate: "",
                location: { id: "" },
                emailTo: "",
                equipment: {
                    id: "",
                    requisition: ""
                }
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    setRowsPerPage = () => this.setState({ rowsPerPage: 5 });

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setRowsPerPage(+event.target.value);
        this.setState({ page: 0 });
    };

    handleCloseEntryRegistry = () => this.setState({ openModalEntry: false });
    handleOpenEntryRegistry = async (data) => {
        this.setState({ form: data });
        this.setState({ entry: { ...this.state.entry, equipment: { ...this.state.entry.equipment, id: data.id } } })
        await axios.get(baseLocation + "/searchCapacity", { params: { equipmentId: data.id }, headers: { Authorization: 'Bearer ' + cookies.get('token') } })
            .then(response => {
                return response.data
            })
            .then(response => {
                var users = this.state.data
                users = response
                this.setState({ dataLocations: users });
            })
            .catch(error => {
                console.log(error);
            });

        this.setState({ openModalEntry: true });
    }
    handleCloseEntryMovement = () => this.setState({ openModalMovement: false });
    handleOpenEntryMovement = async (data) => {
        this.setState({ form: data });
        this.setState({ entry: { ...this.state.entry, equipment: { ...this.state.entry.equipment, id: data.id } } })
        await axios.get(baseEntry + "/equipment/"+ data.id, {headers: { Authorization: 'Bearer ' + cookies.get('token') } })
            .then(response => {
                return response.data
            })
            .then(response => {
                if(response != "" && response != null && response != undefined){
                    this.setState({ entry: response });
                    this.setState({ entryId: response.id ,entry: { ...this.state.entry, location:{...this.state.entry.location, id: response.location.id} } })
                }
            })
            .catch(error => {
                console.log(error);
            });

        await axios.get(baseLocation + "/searchCapacity", { params: { equipmentId: data.id }, headers: { Authorization: 'Bearer ' + cookies.get('token') } })
            .then(response => {
                return response.data
            })
            .then(response => {
                var users = this.state.data
                users = response
                this.setState({ dataLocations: users });
            })
            .catch(error => {
                console.log(error);
            });

        this.setState({ openModalMovement: true });
    }

    getAll = async () => {
        await axios.get(baseUrl + "/findAll", {
            headers: { Authorization: 'Bearer ' + cookies.get('token'), Cache: 'no-cache' }
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
        await axios.get(baseUrl + "/search", { params: { name: this.state.form.name, invoiceId: this.state.form.invoice.id, category: this.state.form.category }, headers: { Authorization: 'Bearer ' + cookies.get('token') } })
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

    searchInvoice = async () => {
        await axios.get(baseInvoice + "/searchCode", { params: { code: this.state.form.invoice.code }, headers: { Authorization: 'Bearer ' + cookies.get('token') } })
            .then(response => {
                return response.data
            })
            .then(response => {
                console.log(response.id);
                this.setState({ form: { ...this.state.form, invoice: { ...this.state.form.invoice, id: response.id, dateInvoice: response.dateInvoice } } });
            })
            .catch(error => {
                console.log(error);
            });
    }

    delete = async (dato) => {
        var opcion = window.confirm("You want to delete the equipment: " + dato.name);
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

    registryEntry = async (event) => {
        event.preventDefault();
        await axios.post(baseEntry + "/save", this.state.entry, { headers: { Authorization: 'Bearer ' + cookies.get('token') } })
            .then(response => {
                return response.data;
            }).then(response => {
                this.getAll();
                this.setState({ showAlertUpdate: true, openModalEntry: false })
            }).catch(error => {
                console.log(error);
            });;
    }

    getOutEntry = async (event) => {
        event.preventDefault();
        await axios.put(baseEntry + "/edit/" + this.state.entryId, this.state.entry, { headers: { Authorization: 'Bearer ' + cookies.get('token') } })
            .then(response => {
                return response.data;
            }).then(response => {
                this.getAll();
                this.setState({ showAlertUpdate: true, openModalMovement: false })
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

    handleChangeEntry = async e => {
        await this.setState({
            entry: {
                ...this.state.entry,
                [e.target.name]: e.target.value
            }
        });
    }

    handleChangeEquipment = async e => {
        await this.setState({
            entry: {
                ...this.state.entry,
                equipment: {
                    ...this.state.entry.equipment,
                    [e.target.name]: e.target.value
                }

            }
        });
    }

    handleChangeLocation = async e => {
        await this.setState({
            entry: {
                ...this.state.entry,
                location: {
                    ...this.state.entry.location,
                    [e.target.name]: e.target.value
                }

            }
        });
    }

    handleChangeFormInvoice = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                invoice: {
                    ...this.state.form.invoice,
                    [e.target.name]: e.target.value
                }

            }
        });
    }

    findAlertAndSendEmail = async() =>{

        await axios.get(baseEntry + "/alert/departure", {
            headers: { Authorization: 'Bearer ' + cookies.get('token'), Cache: 'no-cache' }
        }).then(response => {
            return response.data
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
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
        await this.findAlertAndSendEmail();
        await this.getAll();
        if (!cookies.get('token')) {
            window.location.href = "./";
        }
        this.setState({
            entry: {
              ...this.state.entry,
              emailTo: cookies.get('email')
            }
          });
    }

    render() {
        return (
            <div>
                <MenuNav />
                <Container>
                    <br />
                    <h2>EQUIPMENT</h2>
                    <br />
                    <Snackbar open={this.state.showAlert}>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={this.handleClick}>
                            Equipment was successfully created
                        </Alert>
                    </Snackbar>
                    <Snackbar open={this.state.showAlertDelete}>
                        <Alert icon={<WarningOutlined></WarningOutlined>} severity="warning" onClose={this.handleClickAlertDelete}>
                            Equipment was successfully removed
                        </Alert>
                    </Snackbar>
                    <Snackbar open={this.state.showAlertUpdate}>
                        <Alert icon={<InfoOutlined></InfoOutlined>} severity="info" onClose={this.handleClickAlertUpdate}>
                            Equipment was successfully updated
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
                                <InputLabel id="height">Category</InputLabel>
                                <Select
                                    labelId="category"
                                    id="category"
                                    value={this.state.form.category}
                                    onChange={this.handleChangeForm}
                                    label="category"
                                    name="category"
                                    variant="standard"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.categoryData.map((dt) => (
                                        <MenuItem value={dt.code}>{dt.name}</MenuItem>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                            <TextField
                                id="standard-required"
                                label="Name Equipment"
                                variant="standard"
                                name="name"
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
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>name</TableCell>
                                        <TableCell align="right">Category</TableCell>
                                        <TableCell align="right">Height (m³)</TableCell>
                                        <TableCell align="right">Gross Weight</TableCell>
                                        <TableCell align="right">Width (m³)</TableCell>
                                        <TableCell align="right">Long (m³)</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Invoice</TableCell>
                                        <TableCell align="right">Purchase Order</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data) => (
                                        <TableRow
                                            key={data.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="data">
                                                {data.name}
                                            </TableCell>
                                            <TableCell align="right">{data.category}</TableCell>
                                            <TableCell align="right">{data.height}</TableCell>
                                            <TableCell align="right">{data.grossWeight}</TableCell>
                                            <TableCell align="right">{data.width}</TableCell>
                                            <TableCell align="right">{data.equipmentLong}</TableCell>
                                            <TableCell align="right">{data.status}</TableCell>
                                            <TableCell align="right">{data.requisition}</TableCell>
                                            <TableCell align="right">{data.invoice.code}</TableCell>
                                            <TableCell align="right">
                                                <IconButton color="primary" onClick={() => this.handleOpenUpdate(data)} size="small"><Edit /></IconButton>{" "}
                                                <IconButton color="error" onClick={() => this.delete(data)} size="small"><Delete /></IconButton>{" "}
                                                {data.status != "En Espera" && data.requisition != "" ? <IconButton color="error" onClick={() => this.handleOpenEntryMovement(data)} size="small"><Output></Output></IconButton> : <IconButton color="success" onClick={() => this.handleOpenEntryRegistry(data)} size="small"><InputIcon></InputIcon></IconButton>}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={this.state.data.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            onPageChange={this.handleChangePage}
                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                        />
                    </Paper>
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
                            <Typography><PrecisionManufacturing /> EQUIPMENT REGISTRATION</Typography>
                            <br />
                            <TextField
                                label="Name"
                                variant="filled"
                                name="name"
                                onChange={this.handleChangeForm}
                            />
                            {"    "}
                            <TextField
                                label="Width (m³)"
                                variant="filled"
                                name="width"
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
                        <div>

                            <TextField
                                label="Equipment long (m³)"
                                variant="filled"
                                name="equipmentLong"
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
                            {"    "}
                            <TextField
                                label="Height (m³)"
                                variant="filled"
                                name="height"
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
                        <div>

                            {"    "}
                            <TextField
                                label="Gross Weight"
                                variant="filled"
                                name="grossWeight"
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
                                label="Net Weight"
                                variant="filled"
                                name="netWeight"
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
                        <div>
                            <TextField
                                id="invoiceNumber"
                                label="Invoice number"
                                variant="filled"
                                disabled
                            />
                            {"    "}
                            <TextField
                                id="code"
                                label="Purchase order"
                                variant="filled"
                                name="code"
                                onChange={this.handleChangeFormInvoice}

                            />
                            {"    "}
                            <Button color="primary" onClick={this.searchInvoice}><Search></Search></Button>
                        </div>
                        <br />
                        <div>
                            <TextField
                                id="dateInvoice"
                                label="Order Date"
                                variant="filled"
                                name="dateInvoice"
                                onChange={this.handleChangeFormInvoice}
                                value={this.state.form.invoice.dateInvoice}
                                disabled
                            />
                            {"    "}
                            <TextField
                                id="invoiceId"
                                label="Requisition Id"
                                variant="filled"
                                name="id"
                                onChange={this.handleChangeForm}
                                disabled
                                value={this.state.form.invoice.id}
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
                        <Button type="button" disabled={this.state.form.invoice.id == ""} color="success" onClick={this.save}>save <SaveOutlined></SaveOutlined></Button>
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
                            <Typography><PrecisionManufacturing /> EQUIPMENT UPDATE <PrecisionManufacturing /></Typography>
                            <br />
                            <TextField
                                label="Name"
                                variant="filled"
                                name="name"
                                onChange={this.handleChangeForm}
                                value={this.state.form.name}
                            />
                            {"    "}
                            <TextField
                                label="Width (m³)"
                                variant="filled"
                                name="width"
                                onChange={this.handleChangeForm}
                                value={this.state.form.width}
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
                        <div>

                            <TextField
                                label="Equipment Long (m³)"
                                variant="filled"
                                name="equipmentLong"
                                onChange={this.handleChangeForm}
                                value={this.state.form.equipmentLong}
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment invoiceId="start">
                                            #
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {"    "}
                            <TextField
                                label="Height (m³)"
                                variant="filled"
                                name="height"
                                onChange={this.handleChangeForm}
                                value={this.state.form.height}
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
                        <div>

                            {"    "}
                            <TextField
                                label="Gross Weight"
                                variant="filled"
                                name="grossWeight"
                                onChange={this.handleChangeForm}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            #
                                        </InputAdornment>
                                    ),
                                }}
                                value={this.state.form.grossWeight}
                            />
                            {"    "}
                            <TextField
                                id="netWeight"
                                label="Net Weight"
                                variant="filled"
                                name="netWeight"
                                onChange={this.handleChangeForm}
                                value={this.state.form.netWeight}
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
                        <div>
                            <TextField
                                id="requisition"
                                label="Invoice Number"
                                variant="filled"
                                disabled
                            />
                            {"    "}
                            <TextField
                                disabled
                                id="invoiceId"
                                label="Purchase Order Id"
                                variant="filled"
                                name="id"
                                onChange={this.handleChangeForm}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            #
                                        </InputAdornment>
                                    ),
                                }}
                                value={this.state.form.invoice.id}
                            />


                        </div>
                        <br />
                        <Button type="button" color="success" onClick={this.update}>save <SaveOutlined></SaveOutlined></Button>
                    </Box>
                </Modal>

                <Modal
                    open={this.state.openModalEntry}
                    onClose={this.handleCloseUpdate}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModalEntry} component="form"

                        noValidate
                        autoComplete="off">
                        <div>
                            <Typography><CheckIcon /> ENTRY REGISTRATION</Typography>
                            <br />
                            <TextField
                                label="Expect entry date"
                                variant="filled"
                                name="expectedEntryDate"
                                onChange={this.handleChangeEntry}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {"    "}
                            <TextField
                                label="Expected departure date"
                                variant="filled"
                                name="expectedDepartureDate"
                                onChange={this.handleChangeEntry}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <br />
                        <div>
                            <TextField
                                id="name"
                                label="Equipment"
                                variant="filled"
                                disabled
                                name="name"
                                onChange={this.handleChangeForm}
                                value={this.state.form.name}
                            />
                            {"    "}
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                                <InputLabel id="height">Location (m³)</InputLabel>
                                <Select
                                    labelId="location"
                                    id="location"
                                    value={this.state.entry.location.id}
                                    onChange={this.handleChangeLocation}
                                    label="Location"
                                    name="id"
                                    variant="standard"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.dataLocations.map((dt) => (
                                        <MenuItem value={dt.id}>{dt.locationName}</MenuItem>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <TextField
                                id="requisition"
                                label="Invoice number"
                                variant="filled"
                                name="requisition"
                                onChange={this.handleChangeEquipment}
                            />
                        </div>
                        <br />
                        <Button type="button" color="success" onClick={this.registryEntry}>save<SaveOutlined></SaveOutlined></Button>
                        {"            "}
                        <Button type="button" color="danger" onClick={this.handleCloseEntryRegistry}>Close X</Button>
                    </Box>
                </Modal>

                <Modal
                    open={this.state.openModalMovement}
                    onClose={this.handleCloseEntryMovement}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModalEntry} component="form"

                        noValidate
                        autoComplete="off">
                        <div>
                            <Typography><CheckIcon /> MOVEMENT REGISTRATION</Typography>
                            <br />
                            <TextField
                                label="Expect entry date"
                                variant="filled"
                                name="expectedEntryDate"
                                onChange={this.handleChangeEntry}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {"    "}
                            <TextField
                                label="Expected departure date"
                                variant="filled"
                                name="expectedDepartureDate"
                                onChange={this.handleChangeEntry}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <br />
                        <div>
                            <TextField
                                id="name"
                                label="Equipment"
                                variant="filled"
                                disabled
                                name="name"
                                onChange={this.handleChangeForm}
                                value={this.state.form.name}
                            />
                            {"    "}
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                                <InputLabel id="height">Location (m³)</InputLabel>
                                <Select
                                    labelId="location"
                                    id="location"
                                    value={this.state.entry.location.id}
                                    onChange={this.handleChangeLocation}
                                    label="Location"
                                    name="id"
                                    variant="standard"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.dataLocations.map((dt) => (
                                        <MenuItem value={dt.id}>{dt.locationName}</MenuItem>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <TextField
                                id="requisition"
                                label="Invoice number"
                                variant="filled"
                                name="requisition"
                                disabled
                                onChange={this.handleChangeEquipment}
                                value={this.state.form.requisition}
                            />
                        </div>
                        <br />
                        <Button type="button" color="success" onClick={this.getOutEntry}>save<SaveOutlined></SaveOutlined></Button>
                        {"            "}
                        <Button type="button" color="danger" onClick={this.handleCloseEntryMovement}>Close X</Button>
                    </Box>
                </Modal>

            </div>
        );
    }

}

export default Equipment;