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
import { SaveOutlined } from "@material-ui/icons";
import { WarningOutlined } from "@material-ui/icons";
import { InfoOutlined } from "@material-ui/icons";
import { FileCopy, PrecisionManufacturing } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@material-ui/icons";

var DatePicker = require("reactstrap-date-picker")
const data = [];
const dataRoles = [];
const dataCountries = [];
const categoryData = [{ code: 'CATEGORY A', name: 'categoria A' }, { code: 'CATEGORY B', name: 'categoria B' }];
const cookies = new Cookies();
const baseUrl = "http://localhost:8080/api/invoice";
const baseProviderUrl = "http://localhost:8080/api/provider";
const baseEquipmentUrl = "http://localhost:8080/api/equipment";
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
class Invoice extends React.Component {

  handleClose = () => this.setState({ open: false });
  handleOpen = () => this.setState({ open: true });
  handleCloseUpdate = () => this.setState({ openUpdate: false });
  handleOpenUpdate = (data) => this.setState({ openUpdate: true, form: data, id: data.id });
  handleOpenEquipment = (data) => this.setState({ openEquipment: true, id: data.id, form: data, equipment: { ...this.state.equipment, invoice: { ...this.state.equipment.invoice, id: data.id, code: data.code, dateInvoice: data.dataInvoice } } });
  handleCloseEquipment = () => this.setState({ openEquipment: false });
  constructor() {
    super();
    this.state = {
      categoryData: categoryData,
      data: data,
      dataCountries: dataCountries,
      dataRoles: dataRoles,
      open: false,
      openEquipment: false,
      openUpdate: false,
      showAlert: false,
      showAlertDelete: false,
      showAlertUpdate: false,
      id: "",
      form: {
        dateInvoice: "",
        price: "",
        amount: "",
        code: "",
        provider: {
          id: "",
          providerName: "",
          country: ""
        }
      },
      equipment: {
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
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getCountries = async () => {
    await axios.get(baseProviderUrl + "/countries", {
      headers: { Authorization: 'Bearer ' + cookies.get('token'), Cache: 'no-cache' }
    }).then(response => {
      return response.data
    })
      .then(response => {
        var countries = this.state.dataCountries
        countries = response
        this.setState({ dataCountries: countries });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAll = async () => {
    await axios.get(baseUrl + "/all", {
      headers: { Authorization: 'Bearer ' + cookies.get('token'), Cache: 'no-cache' }
    }).then(response => {
      return response.data
    })
      .then(response => {
        var invoice = this.state.data
        invoice = response
        invoice = response
        this.setState({ data: invoice });
      })
      .catch(error => {
        console.log(error);
      });
  }

  saveEquipment = async (event) => {
    event.preventDefault();
    await axios.post(baseEquipmentUrl + "/save", this.state.equipment, { headers: { Authorization: 'Bearer ' + cookies.get('token') } })
      .then(response => {
        return response.data;
      }).then(response => {
        this.getAll();
        this.setState({ showAlertUpdate: true, openEquipment: false })
      }).catch(error => {
        console.log(error);
      });;
  }

  search = async () => {
    await axios.get(baseUrl + "/search", { params: { code: this.state.form.code }, headers: { Authorization: 'Bearer ' + cookies.get('token') } })
      .then(response => {
        return response.data
      })
      .then(response => {
        var invoice = this.state.data
        invoice = response
        this.setState({ data: invoice });
      })
      .catch(error => {
        console.log(error);
      });
  }

  delete = async (dato) => {
    var opcion = window.confirm("You want to delete the invoice: " + dato.code);
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

  handleChangeEquipment = async e => {
    await this.setState({
      equipment: {
        ...this.state.equipment,
        [e.target.name]: e.target.value
      }
    });
  }

  handleChangeEquipmentInvoice = async e => {
    await this.setState({
      equipment: {
        ...this.state.equipment,
        invoice: {
          ...this.state.equipment.invoice,
          [e.target.name]: e.target.value
        }

      }
    });
  }

  handleChangeFormProvider = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        provider: {
          ...this.state.form.provider,
          [e.target.name]: e.target.value
        }

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
    await this.getCountries();
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
          <h2>PURCHASE ORDER</h2>
          <br />
          <Snackbar open={this.state.showAlert}>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={this.handleClick}>
            Purchase Order was successfully created
            </Alert>
          </Snackbar>
          <Snackbar open={this.state.showAlertDelete}>
            <Alert icon={<WarningOutlined></WarningOutlined>} severity="warning" onClose={this.handleClickAlertDelete}>
            Purchase Order was successfully removed
            </Alert>
          </Snackbar>
          <Snackbar open={this.state.showAlertUpdate}>
            <Alert icon={<InfoOutlined></InfoOutlined>} severity="info" onClose={this.handleClickAlertUpdate}>
            Purchase Order was successfully updated
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
                label="Requisition number"
                variant="standard"
                name="code"
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
                  <TableCell>Purchase Order Number</TableCell>
                  <TableCell align="right">Requisition Date</TableCell>
                  <TableCell align="right">Provider</TableCell>
                  <TableCell align="right">Provider country</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Price</TableCell>
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
                      {data.code}
                    </TableCell>
                    <TableCell align="right">{data.dateInvoice}</TableCell>
                    <TableCell align="right">{data.provider == null ? "" : data.provider.providerName}</TableCell>
                    <TableCell align="right">{data.provider == null ? "" : data.provider.country}</TableCell>
                    <TableCell align="right">{data.amount}</TableCell>
                    <TableCell align="right">{data.price}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => this.handleOpenUpdate(data)}><Edit/></IconButton>{" "}
                      <IconButton color="error" onClick={() => this.delete(data)}><Delete/></IconButton>{" "}
                      <IconButton color="success" onClick={() => this.handleOpenEquipment(data)}><AddCircleRounded /></IconButton>
                    </TableCell>
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
              <Typography><FileCopy /> PURCHASE ORDER REGISTRATION</Typography>
              <br />
              <TextField
                label="Requisiton number"
                variant="filled"
                name="code"
                onChange={this.handleChangeForm}
              />
              {"    "}
              <TextField
                label="Requisition Date"
                variant="filled"
                name="dateInvoice"
                onChange={this.handleChangeForm}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <br />
            <div>

              <TextField
                id="amountid"
                label="Amount"
                variant="filled"
                name="amount"
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
                label="Price"
                variant="filled"
                name="price"
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
              <h1>PROVIDER</h1>
              <br />
              <TextField
                id="providerName"
                label="Provider Name"
                variant="filled"
                name="providerName"
                onChange={this.handleChangeFormProvider}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      #
                    </InputAdornment>
                  ),
                }}
              />
              {"    "}
              <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                <InputLabel id="height">Country</InputLabel>
                <Select
                  labelId="Country"
                  id="country"
                  value={this.state.form.provider.country}
                  onChange={this.handleChangeFormProvider}
                  label="country"
                  name="country"
                  variant="filled"
                  variant="standard"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.dataCountries.map((dt) => (
                    <MenuItem value={dt.countryName}>{dt.countryName}</MenuItem>
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
              <Typography><FileCopy /> PURHCASE ORDER UPDATE</Typography>
              <br />
              <TextField
                label="Order number"
                variant="filled"
                name="code"
                onChange={this.handleChangeForm}
                value={this.state.form.code}
              />
              {"    "}
              <TextField
                label="Order Date"
                variant="filled"
                name="dateInvoice"
                onChange={this.handleChangeForm}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <br />
            <div>

              <TextField
                id="amountid"
                label="Amount"
                variant="filled"
                name="amount"
                onChange={this.handleChangeForm}
                type="number"
                value={this.state.form.amount}
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
                label="Price"
                variant="filled"
                name="price"
                onChange={this.handleChangeForm}
                type="number"
                value={this.state.form.price}
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
              <h1>PROVIDER</h1>
              <br />
              <TextField
                id="providerName"
                label="Provider Name"
                variant="filled"
                name="providerName"
                onChange={this.handleChangeFormProvider}
                value={this.state.form.provider.providerName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      #
                    </InputAdornment>
                  ),
                }}
              />
              {"    "}
              <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                <InputLabel id="height">Country</InputLabel>
                <Select
                  labelId="Country"
                  id="country"
                  value={this.state.form.provider.country}
                  onChange={this.handleChangeFormProvider}
                  label="country"
                  name="country"
                  variant="filled"
                  variant="standard"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.dataCountries.map((dt) => (
                    <MenuItem value={dt.countryName}>{dt.countryName}</MenuItem>
                  )
                  )}
                </Select>
              </FormControl>
            </div>
            <br />
            <Button type="button" color="success" onClick={this.update}>save <SaveOutlined></SaveOutlined></Button>
          </Box>
        </Modal>

        <Modal
          open={this.state.openEquipment}
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
                onChange={this.handleChangeEquipment}
              />
              {"    "}
              <TextField
                label="width"
                variant="filled"
                name="width"
                onChange={this.handleChangeEquipment}
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
                id="standard-required"
                label="equipmentLong"
                variant="filled"
                name="equipmentLong"
                onChange={this.handleChangeEquipment}
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
                label="height"
                variant="filled"
                name="height"
                onChange={this.handleChangeEquipment}
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
                id="grossWeight"
                label="Gross Weight"
                variant="filled"
                name="grossWeight"
                onChange={this.handleChangeEquipment}
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
                id="netWeight"
                label="Net Weight"
                variant="filled"
                name="netWeight"
                onChange={this.handleChangeEquipment}
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
                label="Purchase Order"
                variant="filled"
                name="requisition"
                onChange={this.handleChangeEquipment}
              />
              {"    "}
              <TextField
                id="code"
                label="Invoice number"
                variant="filled"
                name="code"
                onChange={this.handleChangeEquipmentInvoice}
                disabled
                value={this.state.form.code}

              />
            </div>
            <br />
            <div>
              <TextField
                id="dateInvoice"
                label="Invoice Date"
                variant="filled"
                name="dateInvoice"
                onChange={this.handleChangeEquipmentInvoice}
                value={this.state.form.dateInvoice}
                disabled
              />
              {"    "}
              <TextField
                id="invoiceId"
                label="invoice Id"
                variant="filled"
                name="id"
                onChange={this.handleChangeEquipmentInvoice}
                disabled
                value={this.state.id}
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
            <Button type="button" color="success" onClick={this.saveEquipment}>save <SaveOutlined></SaveOutlined></Button>
            {"            "}
            <Button type="button" color="danger" onClick={this.handleCloseEquipment}>Close </Button>
          </Box>
        </Modal>


      </div>
    );
  }

}

export default Invoice;