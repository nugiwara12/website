"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/Inbox";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { IoMdBriefcase } from "react-icons/io";
import { TiMessage } from "react-icons/ti";
import { IoIosSettings } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import BackTop from "./BacktoTop/BacktoTop";
import Navbar from "./Navbar";

const drawerWidth = 240;

const DrawerItem = ({ text, icon, pathname, onClick }) => {
  const isActive = pathname.startsWith("/" + text.toLowerCase());

  return (
    <ListItem
      disablePadding
      className={isActive ? "text-sky-500 bg-slate-100" : "text-slate-700"}
      onClick={() => {
        onClick("/" + text.toLowerCase());
      }}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {isActive && <div className="active-indicator" />}
      </ListItemButton>
    </ListItem>
  );
};

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isCollapse, setIsCollapse] = React.useState(false);
  const pathname = usePathname();

  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/"); //redirect to login page if the user is not authenticated
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); //redirect to the login page after logout
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setIsCollapse(!isCollapse);
  };

  const drawer = (
    <div>
      <div className="flex justify-center items-center text-center ">
        <Image src="/logo/logo.png" width={200} height={200} alt="logo" />
      </div>
      <Divider />
      <List>
        {[
          { text: "Dashboard", icon: <MdDashboard /> },
          { text: "Users", icon: <LuUsers /> },
          { text: "Analytics", icon: <IoAnalyticsSharp /> },
          { text: "Project", icon: <IoMdBriefcase /> },
          { text: "Message", icon: <TiMessage /> },
          { text: "Setting", icon: <IoIosSettings /> },
          { text: "Profile", icon: <FaRegUser /> },
        ].map(({ text, icon }) => (
          <DrawerItem
            key={text}
            text={text}
            icon={icon}
            pathname={pathname}
            onClick={router.push}
          />
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleCollapseToggle}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
            {isCollapse ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
        <List className="ml-4">
          {["Support", "Contact", "Docs"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => router.push("/" + text.toLowerCase())}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#FFFFFF",
          color: "#2f2f2f",
        }}>
        <div className="flex justify-between items-center w-full">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
          <div className="flex items-center space-x-4 pr-4">
            <Navbar />
          </div>
        </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
