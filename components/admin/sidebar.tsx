"use client"

import type React from "react"
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, IconButton } from "@mui/material"
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Assignment as AssignmentIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material"
import { useRouter } from "next/router"
import { styled } from "@mui/material/styles"
import { LogoutButton } from "@/components/auth/logout-button"

const drawerWidth = 240

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface Props {
  open: boolean
  handleDrawerClose: () => void
}

const Sidebar: React.FC<Props> = ({ open, handleDrawerClose }) => {
  const theme = useTheme()
  const router = useRouter()

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
    { text: "Reports", icon: <BarChartIcon />, path: "/admin/reports" },
    { text: "Assignments", icon: <AssignmentIcon />, path: "/admin/assignments" },
  ]

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={() => router.push(item.path)}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Botón de cierre de sesión */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <LogoutButton />
      </div>
    </Drawer>
  )
}

export default Sidebar
