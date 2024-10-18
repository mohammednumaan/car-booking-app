import { AccountBox, CarRentalRounded, DashboardCustomizeOutlined,  DocumentScanner,  HistoryRounded} from "@mui/icons-material";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { AppProvider, DashboardLayout } from "@toolpad/core"
import { createTheme } from "@mui/material";
import './Dashboard.css'
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
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

export default function PrimaryComponent({children}){

  const [path, setPath] = useState('/dashboard');
  const navigate = useNavigate();
  

  const Navigation = [
    {
      title: 'Your Dashboard',
    },
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardCustomizeOutlined />,
    },
    {
      kind: 'divider'
    },
    {
      kind: 'header',
      title: 'Bookings',
    },
    {
      segment: 'book-own',
      title: 'Book For You',
      icon: <CarRentalRounded />,
    },
    {
      segment: 'history',
      title: 'History',
      icon: <HistoryRounded />,
    },
    {
      segment: 'document',
      title: 'Download',
      icon: <DocumentScanner />,
    },
    {
      kind: 'divider'
    },
    {
      kind: 'header',
      title: 'Account Settings'
    },
    {
      segment: 'account',
      title: 'Account',
      icon: <AccountBox />,
    },
    {
      segment: 'contact',
      title: 'Contact Us',
      icon: <ContactPageIcon />,
    },
    {
      kind: 'divider'
    }
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
        branding={{ title: 'PSG Cars' }}
        theme={customTheme}
        router={router}
      >
        <DashboardLayout>
            {children}
        </DashboardLayout>
      </AppProvider>
    </div>
  )
}