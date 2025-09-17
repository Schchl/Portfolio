import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const Header = ({ theme, toggleTheme }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { to: '/', label: 'Présentation' },
    { to: '/comp', label: 'Compétences' },
    { to: '/exp', label: 'Expériences' },
    { to: '/crea', label: 'Créations' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: muiTheme.palette.background.default,
        color: muiTheme.palette.text.primary,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 4,
        py: 2,
        boxShadow: 2,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Desktop Nav */}
      {!isMobile && (
        <Box component="nav" sx={{ display: 'flex', gap: 3 }}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                color: isActive
                  ? muiTheme.palette.primary.main
                  : muiTheme.palette.text.primary,
                fontWeight: isActive ? '600' : 'normal',
                textDecoration: 'none',
                position: 'relative',
                padding: '4px 0',
                transition: 'color 0.3s ease',
              })}
            >
              {label}
            </NavLink>
          ))}
        </Box>
      )}

      {/* Mobile Menu Icon */}
      {isMobile && (
        <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
          <MenuIcon />
        </IconButton>
      )}

      {/* Theme Toggle Button */}
      <Button
        variant="outlined"
        onClick={toggleTheme}
        sx={{
          borderColor: muiTheme.palette.primary.main,
          color: muiTheme.palette.primary.main,
          ml: isMobile ? 1 : 4,
          '&:hover': {
            backgroundColor: muiTheme.palette.primary.main,
            color: '#fff',
          },
        }}
      >
        Mode {theme === 'dark' ? 'Clair' : 'Sombre'}
      </Button>

      {/* Drawer for mobile nav */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
          <List>
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '12px 16px',
                  color: isActive
                    ? muiTheme.palette.primary.main
                    : muiTheme.palette.text.primary,
                  fontWeight: isActive ? '600' : 'normal',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  backgroundColor: isActive ? muiTheme.palette.action.hover : 'transparent',
                  transition: 'background-color 0.3s ease',
                })}
                onClick={() => setDrawerOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
