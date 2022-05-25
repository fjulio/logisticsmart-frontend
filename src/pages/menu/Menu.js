import React from "react";
import Cookies from "universal-cookie/es6";
import MenuNav from "../menu/MenuNav";
import '../../css/Menu.css';
import { Container } from "reactstrap";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AddchartIcon from '@mui/icons-material/Addchart';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const cookies = new Cookies();
const links = [{ name: 'Equipment', path: '/equipment' }, { name: 'Purchase Order', path: '/requisition' }, { name: 'Entry', path: '/entry' }, { name: 'User', path: '/user' }, { name: 'Location', path: '/location' }, { name: 'Reports', path: '/path' }, { name: 'Graph', path: '/graphs' }];
const linksPlaneacion = [{ name: 'Orden de compra', path: '/requisition' }, { name: 'Equipo', path: '/equipment' }, { name: 'proveedor', path: '/provider' }]
const linksAlmacen = [{ name: 'Inventario', path: '/requisition' }, { name: 'Locaciones', path: '/location' }]
const linksOperaciones = [{ name: 'Entradas', path: '/entry' }, { name: 'Movimientos', path: '/equipment' }, , { name: 'Salidas', path: '/equipment' }]
class Menu extends React.Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        }
    }

    handleChange = (panel) => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };

    componentDidMount = async () => {
        if (!cookies.get('token')) {
            window.location.href = "./";
        }
    }

    render() {
        return (
            <div>
                <MenuNav />
                <div className="menuPrincipal">
                    <div className="containerSecundario">
                        <div>
                            <Accordion sx={{ bgcolor: '#64ffda', color: 'white' }} expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <MenuItem  >
                                        <ListItemIcon>
                                            <EventNoteIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText>

                                            <Typography
                                                variant="h6"
                                                noWrap
                                                component="div"
                                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                            >
                                                PLANEACIÓN
                                            </Typography>
                                        </ListItemText>
                                    </MenuItem>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MenuList>

                                        {linksPlaneacion.map((page) => (
                                            <MenuItem>
                                                <ListItemText>
                                                    <Typography
                                                        variant="h6"
                                                        noWrap
                                                        component="div"
                                                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                    >
                                                        <Button
                                                            href={page.path}
                                                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                        > {page.name} </Button>
                                                    </Typography>
                                                </ListItemText>
                                            </MenuItem>
                                        )
                                        )}
                                    </MenuList>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ bgcolor: '#1de9b6', color: 'white' }} expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <MenuItem  >
                                        <ListItemIcon>
                                            <AccountBalanceIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText>

                                            <Typography
                                                variant="h6"
                                                noWrap
                                                component="div"
                                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                            >
                                                GESTIÓN DE ALMACÉN
                                            </Typography>
                                        </ListItemText>
                                    </MenuItem>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MenuList>

                                        {linksAlmacen.map((page) => (
                                            <MenuItem>
                                                <ListItemText>
                                                    <Typography
                                                        variant="h6"
                                                        noWrap
                                                        component="div"
                                                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                    >
                                                        <Button
                                                            href={page.path}
                                                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                        > {page.name} </Button>
                                                    </Typography>
                                                </ListItemText>
                                            </MenuItem>
                                        )
                                        )}
                                    </MenuList>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ bgcolor: '#00bfa5', color: 'white' }} expanded={this.state.expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <MenuItem  >
                                        <ListItemIcon>
                                            <EngineeringIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText>

                                            <Typography
                                                variant="h6"
                                                noWrap
                                                component="div"
                                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                            >
                                                OPERACIONES
                                            </Typography>
                                        </ListItemText>
                                    </MenuItem>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MenuList>

                                        {linksOperaciones.map((page) => (
                                            <MenuItem>
                                                <ListItemText>
                                                    <Typography
                                                        variant="h6"
                                                        noWrap
                                                        component="div"
                                                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                    >
                                                        <Button
                                                            href={page.path}
                                                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                        > {page.name} </Button>
                                                    </Typography>
                                                </ListItemText>
                                            </MenuItem>
                                        )
                                        )}
                                    </MenuList>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ bgcolor: '#009688', color: 'white' }} expanded={this.state.expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <MenuItem  >
                                        <ListItemIcon>
                                            <AddchartIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText>

                                            <Typography
                                                variant="h6"
                                                noWrap
                                                component="div"
                                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                            >
                                                INFORMACIÓN
                                            </Typography>
                                        </ListItemText>
                                    </MenuItem>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MenuList>
                                        <MenuItem>
                                            <ListItemText>
                                                <Typography
                                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                >
                                                    Reportes
                                                </Typography>
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemText>

                                                <Typography
                                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                >
                                                    Indicadores
                                                </Typography>
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemText>

                                                <Typography
                                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                >
                                                    Informes
                                                </Typography>
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemText>

                                                <Typography
                                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                >
                                                    Listados
                                                </Typography>
                                            </ListItemText>
                                        </MenuItem>
                                    </MenuList>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ bgcolor: '#00796b', color: 'white' }} expanded={this.state.expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <MenuItem  >
                                        <ListItemIcon>
                                            <SupervisorAccountIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText>

                                            <Typography
                                                variant="h6"
                                                noWrap
                                                component="div"
                                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                            >
                                                ADMINISTRACIÓN
                                            </Typography>
                                        </ListItemText>
                                    </MenuItem>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MenuList>
                                        <MenuItem>
                                            <ListItemText>
                                                <Typography
                                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                >
                                                    Listado de usuarios
                                                </Typography>
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemText>

                                                <Typography
                                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                >
                                                    Crear usuarios
                                                </Typography>
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemText>

                                                <Typography
                                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
                                                >
                                                    Otorgar permisos
                                                </Typography>
                                            </ListItemText>
                                        </MenuItem>
                                    </MenuList>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu