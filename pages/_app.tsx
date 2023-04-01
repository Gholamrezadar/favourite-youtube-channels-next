import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChannelItem, Data, DataContext } from '../components/context/DataContext'
import { useState } from 'react';
import Layout from '../components/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Head from 'next/head';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


function MyApp({ Component, pageProps }: AppProps) {
  const [overallData, setOverallData] = useState<ChannelItem[]>([]);
  const [yearData, setYearData] = useState<Map<number, ChannelItem[]>>(new Map());
  const [minYear, setMinYear] = useState(0);
  const [maxYear, setMaxYear] = useState(0);

  const dataContextDefaultValue: Data = {
    title: "Hello new data",
    overallData: overallData,
    yearData: yearData,
    minYear: 0,
    maxYear: 0,
    setMinYear: setMinYear,
    setMaxYear: setMaxYear,
    setOverallData: setOverallData,
    setYearData: setYearData,
  }

  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataContext.Provider value={dataContextDefaultValue}>
          <Head>
            <title>Favourite Youtube Channels</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DataContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default MyApp
