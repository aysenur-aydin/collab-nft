import { ConnectButton } from "@mysten/dapp-kit";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import {
  Toolbar,
  AppBar,
  Typography,
  Box,
  CssBaseline,
  Container,
  ThemeProvider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  Button,
  alpha,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsIcon from "@mui/icons-material/Collections";
import responsiveThemeDark from "./theme";

//Components
import { AdminPage } from "./pages/AdminPage";
import { UserPage } from "./pages/UserPage";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(responsiveThemeDark.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Mint NFT", icon: <CollectionsIcon />, path: "/" },
    { text: "Admin", icon: <AdminPanelSettingsIcon />, path: "/admin" },
  ];

  return (
    <ThemeProvider theme={responsiveThemeDark}>
      <CssBaseline />
      <Router>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <AppBar position="sticky" elevation={4}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleDrawer}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CollectionsIcon sx={{ mr: 1.5, fontSize: 28 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(45deg, ${responsiveThemeDark.palette.primary.main}, ${responsiveThemeDark.palette.secondary.light})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mr: 4,
                  }}
                >
                  NFT Studio
                </Typography>

                {!isMobile && (
                  <Box>
                    {menuItems.map((item) => (
                      <Button
                        key={item.text}
                        component={Link}
                        to={item.path}
                        startIcon={item.icon}
                        sx={{
                          mx: 1,
                          color: "white",
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: alpha(
                              responsiveThemeDark.palette.primary.main,
                              0.2,
                            ),
                          },
                        }}
                      >
                        {item.text}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>

              <Box>
                <ConnectButton />
              </Box>
            </Toolbar>
          </AppBar>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: 280,
                bgcolor: responsiveThemeDark.palette.background.default,
              },
            }}
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Menu
              </Typography>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={toggleDrawer}
                    sx={{
                      px: 3,
                      py: 2,
                      "&:hover": {
                        backgroundColor: alpha(
                          responsiveThemeDark.palette.primary.main,
                          0.1,
                        ),
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: responsiveThemeDark.palette.primary.main }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: 600,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: responsiveThemeDark.palette.background.default,
            }}
          >
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Routes>
                <Route path="/" element={<UserPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </Container>
          </Box>

          <Box
            component="footer"
            sx={{
              py: 3,
              textAlign: "center",
              bgcolor: alpha(responsiveThemeDark.palette.background.paper, 0.5),
              mt: "auto",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} NFT Studio - Built on Sui Blockchain
            </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
