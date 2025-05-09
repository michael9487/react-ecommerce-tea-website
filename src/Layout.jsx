import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Grid2 from "@mui/material/Grid2"; //新版改Gridv2
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

const navItems = [
  { text: "產品", to: "/products" },
  { text: "關於我們", to: "/about-us" },
  { text: "聯絡我們", to: "/contact-us" },
  { text: "Login", to: "/login" },
];
const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#8B4513", padding: 0 }}
        >
          <Toolbar sx={{ minHeight: "48px", padding: 0 }}>
            <Grid2 container sx={{ alignItems: "center", width: "100%" }}>
              {/* 左側標題 */}
              <Grid2 size={6}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    backgroundColor: "#8B4513",
                    color: "#FFFFFF",
                    "&:hover": {
                      transform: "none",
                      textDecoration: "none",
                      cursor: "pointer",
                    },
                  }}
                >
                  好喝茶飲
                </Button>
              </Grid2>

              {/* 右側按鈕或漢堡選單 */}
              <Grid2
                size={6}
                container
                justifyContent="flex-end"
                alignItems="center"
                gap={1}
              >
                {isMobile ? (
                  <>
                    <IconButton
                      color="inherit"
                      onClick={toggleDrawer(true)}
                      edge="end"
                      size="large"
                      aria-label="open drawer"
                      sx={{ mr: 1 }}
                    >
                      <MenuIcon />
                    </IconButton>

                    <Drawer
                      anchor="right"
                      open={drawerOpen}
                      onClose={toggleDrawer(false)}
                      PaperProps={{
                        sx: {
                          width: "100%", // 滿版寬度
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          bgcolor: "#8B4513",
                          height: "100%",
                        }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                      >
                        <List>
                          {navItems.map(({ text, to }) => (
                            <ListItem key={text} disablePadding>
                              <ListItemButton
                                component={Link}
                                to={to}
                                sx={{
                                  color: "#fff",
                                  textTransform: "none",
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                }}
                              >
                                <ListItemText primary={text} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Drawer>
                  </>
                ) : (
                  navItems.map(({ text, to }) => (
                    <Button
                      key={text}
                      color="inherit"
                      component={Link}
                      to={to}
                      sx={{
                        backgroundColor: "#8B4513",
                        padding: "8px 16px",
                        color: "#FFFFFF",
                        textTransform: "none",
                        "&:hover": {
                          transform: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          textDecoration: "none",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {text}
                    </Button>
                  ))
                )}
              </Grid2>
            </Grid2>
          </Toolbar>
        </AppBar>

        {/* 主內容 */}
        <Box component="main" sx={{ flexGrow: 1, paddingTop: "64px" }}>
          {children}
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{ p: 2, backgroundColor: "#333333", textAlign: "center" }}
        >
          <Typography variant="body1" sx={{ color: "#fff" }}>
            著作 © 2025
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
