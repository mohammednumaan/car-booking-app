import { AccountBox, BookOnlineRounded, CarRentalRounded, CollectionsBookmarkRounded, DashboardCustomizeOutlined, DashboardRounded, HistoryEduRounded, HistoryRounded, LoginTwoTone, ManageAccountsRounded, PersonOutlineRounded, PersonRounded } from "@mui/icons-material";
import { AppProvider, DashboardLayout } from "@toolpad/core"
import { Box, createTheme, Typography } from "@mui/material";
import './Dashboard.css'
import { useMemo, useState } from "react";
import BookOwn from "../Booking/BookingOwn";

export default function PrimaryComponent({children}){
    const Navigation = [
      {
        kind: 'header',
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
        kind: 'divider'
      }
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

      const [pathname, setPathname] = useState('/book-own');

      const router = useMemo(() => {
        return {
          pathname,
          searchParams: new URLSearchParams(),
          navigate: (path) => setPathname(String(path)),
        };
      }, [pathname]);

      return (
          <div className="dashboard-container">
              <AppProvider
                  navigation={Navigation}
                  branding={{ title: 'PSG Cars'}}              
                  theme={customTheme}
                  // router={router}
              >
                  <DashboardLayout>
                      {children}
                  </DashboardLayout>
              </AppProvider>
          </div>
      )
}