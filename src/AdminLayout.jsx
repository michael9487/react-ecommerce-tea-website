import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  CssBaseline,
  AppBar,
  Button,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const navItems = [
  { text: "訂單列表", path: "/admin/order-list", icon: <ReceiptLongIcon /> },
  { text: "產品列表", path: "/admin/product-list", icon: <InventoryIcon /> },
  { text: "優惠券", path: "/admin/coupons", icon: <LocalOfferIcon /> },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 清除登入資訊，例如 token
    localStorage.removeItem("admin_token");
    // 導向登入頁
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* 左側 Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/admin"
            sx={{
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            後台管理
          </Typography>
        </Toolbar>
        <List>
          {navItems.map(({ text, path, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={path}
                selected={location.pathname === path}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 主內容區 */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "gray",
          }}
        >
          <Toolbar sx={{ justifyContent: "flex-end", gap: 2 }}>
            <Typography variant="body1" color="inherit">
              管理者
            </Typography>
            <Avatar alt="管理者" src="/static/images/avatar/1.jpg" />
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              登出
            </Button>
          </Toolbar>
        </AppBar>

        {/* 主內容 */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: "64px", // 推開 AppBar 高度
            bgcolor: "#f5f5f5",
          }}
        >
          <Outlet /> {/* 渲染子路由 */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
