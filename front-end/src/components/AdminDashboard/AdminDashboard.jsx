import { DashboardCustomizeOutlined } from "@mui/icons-material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { DocumentScanner } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import "./AdminDashboard.module.css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },

  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function AdminDashboard({ children }) {

  const [path, setPath] = useState('/dashboard');
  const navigate = useNavigate();

  const Navigation = [
    {
      title: "Your Dashboard",
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Options ",
    },
    {
      segment: "booking-decision",
      title: "Booking Decision",
      icon: <DashboardCustomizeOutlined />,
    },
    {
      segment: "ongoing-bookings",
      title: "On-Going Bookings",
      icon: <DocumentScanner />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Messages",
    },
    {
      segment: "contact-message",
      title: "Contact Messages",
      icon: <ContactPageIcon />,
    },
    {
      kind: "divider",
    },
  ];

  const navigateRouter = (pathname) => {
    setPath(pathname);
    navigate(pathname)
  }
  
  const router = useMemo(() => ({
    pathname: path, 
    searchParams: new URLSearchParams(),
    navigate: navigateRouter
  }), [path])

  return (
    <div className="dashboard-container">
      <AppProvider
        navigation={Navigation}
        branding={{
          title: "Admin Dashboard",
          logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        }}
        theme={customTheme}
        router={router}
      >
        <DashboardLayout>{children}</DashboardLayout>
      </AppProvider>
    </div>
  );
}