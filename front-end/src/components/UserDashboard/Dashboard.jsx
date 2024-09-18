import { BookOnlineRounded, CarRentalRounded, CollectionsBookmarkRounded, DashboardCustomizeOutlined, DashboardRounded, HistoryEduRounded, HistoryRounded, LoginTwoTone, ManageAccountsRounded, PersonOutlineRounded, PersonRounded } from "@mui/icons-material";
import { AppProvider, DashboardLayout } from "@toolpad/core"
import { Box, createTheme, Typography } from "@mui/material";
import './Dashboard.css'

export default function PrimaryComponent({children}){
    const Navigation = [
      {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardCustomizeOutlined />,
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
    return (
        <div className="dashboard-container">
            <AppProvider
                navigation={Navigation}
                branding={{ title: 'PSG Cars'}}              
                theme={customTheme}
            >
                <DashboardLayout >
                  {children}
                </DashboardLayout>
            </AppProvider>
        </div>
    )
}