import { DashboardCustomizeOutlined } from "@mui/icons-material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { DocumentScanner } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import "./AdminDashboard.css";

export default function PrimaryComponent({ children }) {
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
      segment: "Booking-Decision",
      title: "Booking Decision",
      icon: <DashboardCustomizeOutlined />,
    },
    {
      segment: "Ongoing-Bookings",
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
      segment: "Contact-Message",
      title: "Contact Messages",
      icon: <ContactPageIcon />,
    },
    {
      kind: "divider",
    },
  ];

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

  return (
    <div className="dashboard-container">
      <AppProvider
        navigation={Navigation}
        branding={{
          title: "Admin Dashboard",
          logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        }}
        theme={customTheme}
        // router={router}
      >
        <DashboardLayout>{children}</DashboardLayout>
      </AppProvider>
    </div>
  );
}
