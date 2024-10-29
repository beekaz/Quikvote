
import React, { useState } from "react";
import {
    Stack,
    Link,
    Toolbar,
    Typography,
    Container,
    AppBar,
    Button,
    Drawer,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context";
import { Link as RouterLink } from 'react-router-dom';

const Nav = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = newOpen => () => {
        setOpen(newOpen);
    };
    return (
        <>
            <Button
                variant="text"
                onClick={toggleDrawer(true)}
                sx={{ color: "white", display: { xs: "flex", sm: "none" } }}
            >
                <MenuIcon />
            </Button>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor="right"
                sx={{
                    display: { xs: "inherit", sm: "none" },
                    "& .MuiDrawer-paper": {
                        height: "100%",
                        width: "100%",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                    }}
                >
                    <Button onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </Button>
                </Box>
                <NavList />
            </Drawer>
            <NavList
                sx={{
                    display: { xs: "none", sm: "inherit" },
                }}
            />
        </>
    );
};


const NavList = ({ ...props }) => {
    const { user, logout } = React.useContext(AuthContext);

    const handleLogout = () => {
        logout();
        console.log("User logged out");
    };

    const pages = user?.role === 'Admin' ? [
        { name: "Dashboard", id: "dashboard", path: "/admin-dashboard" },
        { name: "Users", id: "users", path: "/admin/users" },
        { name: "Polls", id: "polls", path: "admin/manage-polls" },
        { name: "Elections", id: "elections", path: "admin/manage-elections" },
        { name: "Surveys", id: "surveys", path: "admin/manage-surveys" },
        { name: "Quizzes", id: "quizzes", path: "admin/manage-quizzes" },
        { name: "Logout", id: "logout", action: handleLogout },
    ] : [
        { name: "Dashboard", id: "dashboard", path: "/user-dashboard" },
        { name: "My Orders", id: "orders", path: "/user/orders" },
        { name: "Profile", id: "profile", path: "/user/profile" },
        { name: "Settings", id: "settings", path: "/user/settings" },
        { name: "Logout", id: "logout", action: handleLogout },
    ];

    return (
        <Stack
            overflow="auto"
            direction={{ xs: "column", sm: "row" }}
            gap={3}
            width={{ xs: "100%", sm: "initial" }}
            textAlign={{ xs: "center", sm: "initial" }}
            fontSize={{ xs: "22px", sm: "initial" }}
            {...props}
        >
            {pages.map(page => (
                page.path ? (
                    <Link
                        component={RouterLink}
                        to={page.path}
                        key={page.id}
                        sx={{
                            color: { xs: "primary", sm: "white" },
                            textDecoration: "none",
                        }}
                    >
                        {page.name}
                    </Link>
                ) : (
                    <Button
                        key={page.id}
                        onClick={page.action}
                        sx={{
                            color: { xs: "primary", sm: "white" },
                            textDecoration: "none",
                        }}
                    >
                        {page.name}
                    </Button>
                )
            ))}
        </Stack>
    );
};

const HeaderLayout = ({ children }) => {
    return (
        <>
            <AppBar>
                <Container>
                    <Toolbar>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                        >
                            <Typography variant="h6">My App</Typography>
                            <Nav />
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main" sx={{ mt: 8 }}>
                {children}
            </Box>
        </>
    );
};

export default HeaderLayout;
