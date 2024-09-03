import { BookOnlineRounded, CarRentalRounded, CollectionsBookmarkRounded, DashboardRounded, HistoryEduRounded, HistoryRounded, LoginTwoTone, ManageAccountsRounded, PersonOutlineRounded, PersonRounded } from "@mui/icons-material";
import { AppProvider, DashboardLayout } from "@toolpad/core"
import { Link } from "react-router-dom"
import Login from "../Login/Login";
import { Box, createTheme, Typography } from "@mui/material";
import './Dashboard.css'

export default function Dashboard(){
    const Navigation = [
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Home',
        },
        {
          segment: 'dashboard',
          title: 'Dashboard',
          icon: <DashboardRounded />,
        },
        {
          segment: 'history',
          title: 'Booking History',
          icon: <HistoryRounded />,
        },

        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Booking',
        },

        {
            segment: 'book-own',
            title: 'Book For Yourself',
            icon: <CollectionsBookmarkRounded />,
        },
        {
            segment: 'book-guest',
            title: 'Book For Guest',
            icon: <PersonRounded />,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Account',
        },
        {
            segment: 'account',
            title: 'Account',
            icon: <ManageAccountsRounded />,
        },
      ];


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
      });;

      function DemoPageContent() {
        return (
          <Box
            sx={{
              py: 54.9,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: "#121212"
            }}
          >
            <Typography>Dashboard</Typography>
          </Box>
        );
      }
    return (
        <div className="dashboard-container">

            <AppProvider
                navigation={Navigation}
                branding={{    
                    title: 'PSG Cars',
                    
                }}
                
                theme={customTheme}
                
    
                >
                    <DashboardLayout >
                        <DemoPageContent />
                    </DashboardLayout>
            </AppProvider>
        </div>
    )
}