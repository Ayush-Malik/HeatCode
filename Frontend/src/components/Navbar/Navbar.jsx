import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    AppBar,
    Container,
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    IconButton,
    Typography,
    Button
} from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";
import { FaHome, FaUserAlt } from "react-icons/fa";
import HeatLogo from "../../images/HeatCode_logo.png";
import "./Navbar.scss";

export default function Navbar() {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const navItems = ["Dashboard", "About", "Contact"];
    const navLinks = ["/dashboard", "/about", "/contact"];
    const navIcons = [<FaHome className="d-icon" />, <FaHome className="d-icon" />, <FaHome className="d-icon" />];

    return (
        <div className="navbar">
            <AppBar component="nav" className="nav">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <AiOutlineMenu />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ mr: 4, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                            className="nav-logo"
                        >
                            <img src={HeatLogo} alt="HeatCode Logo" /> <span>HeatCode</span>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className="nav-links">
                            {navItems.map((item, index) => (
                                <NavLink to={navLinks[index]} key={item} className= {({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                                    <Button>{item}</Button>
                                </NavLink>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }} className="nav-buttons">
                            <Button className="nav-btn">
                                <FaUserAlt className="d-icon" /> Profile
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="nav">
                <Drawer
                className="nav-drawer"
                container={window.document.body}
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 220 },
                }}
                >
                     <Box className="d-box" onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                        <List>
                            {navItems.map((item, index) => (
                                <NavLink to={navLinks[index]} key={item} className= {({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                                    <ListItemButton>
                                        {navIcons[index]}<ListItemText primary={item} />
                                    </ListItemButton>
                                </NavLink>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </div>
    );
}
