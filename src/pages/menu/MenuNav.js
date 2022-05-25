import React, { Component } from 'react';
import Cookies from "universal-cookie/es6";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Menu } from '@mui/material';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const cookies = new Cookies();

const links = [{ name: 'Equipment', path: '/equipment' }, { name: 'Purchase Order', path: '/requisition' }, { name: 'Entry', path: '/entry' }, { name: 'User', path: '/user' }, { name: 'Location', path: '/location' }, { name: 'Reports', path: '/path' }, { name: 'Graph', path: '/graphs' }];
const settings = ['Profile', 'Account', 'Logout', 'Notification'];
const home = [{ name: 'SMART LOGISTIC', path: '/home' }];


const MenuNav = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [shoWButtonUser, setShowButtonUser] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    if (event.currentTarget.innerText == "Logout") {
      cookies.remove('id', { path: "/" });
      cookies.remove('roles', { path: "/" });
      cookies.remove('token', { path: "/" });
      cookies.remove('username', { path: "/" });
      window.location.href = './';
    }
    
    if (event.currentTarget.innerText == "Notification") {
      window.location.href = './notification';
    }

  };


  return (
    <AppBar sx={{ bgcolor: '#009688', color: 'white' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters >

          {home.map((page) => (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Button
                variant="h6"
                href={page.path}
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
              > {page.name} </Button>

            </Typography>

          ))}


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {links.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            SMART LOGISTIC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {links.map((page) => (

              <div>
                {page.name == 'User' || page.name == 'Invoice' ? (cookies.get('roles').map((rol) => rol) == 'ADMINISTRADOR' ?

                  <Button
                    href={page.path}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  > {page.name} </Button>

                  : ""
                )
                  : <Button
                    href={page.path}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  > {page.name} </Button>}

              </div>
            )

            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ color: 'white', mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  {cookies.get('username')}
                </Typography>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  )
}

export default MenuNav;