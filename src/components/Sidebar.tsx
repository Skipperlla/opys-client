import { Backpack, Group, Home } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AppState } from "@store/index";
import { roles } from "@utils/querys";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React from "react";
const Sidebar = () => {
  const router = useRouter();
  const { User } = useSelector((state: AppState) => {
    return state.user;
  });
  return (
    <Box
      flex={1}
      sx={{
        display: { xs: "none", sm: "block" },
        boxShadow: "2px 0px 8px 0px rgba(0,0,0,0.42)",
        minHeight: "100vh",
      }}
    >
      <List>
        {User?.role !== roles.Admin ? (
          <React.Fragment>
            <ListItemButton onClick={(e) => router.push("/")}>
              <ListItem>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Anasayfa" />
              </ListItem>
            </ListItemButton>
            <ListItemButton onClick={(e) => router.push("/groups")}>
              <ListItem>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Gruplar" />
              </ListItem>
            </ListItemButton>
            <ListItemButton onClick={(e) => router.push("/tasks")}>
              <ListItem>
                <ListItemIcon>
                  <Backpack />
                </ListItemIcon>
                <ListItemText primary="Görevler" />
              </ListItem>
            </ListItemButton>
          </React.Fragment>
        ) : (
          <ListItemButton onClick={(e) => router.push("/createuser")}>
            <ListItem>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Kullanıcı Oluştur" />
            </ListItem>
          </ListItemButton>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
