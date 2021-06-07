import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'utils/theme';
import MainLayout from 'layouts/mainLayout';
import Login from 'pages/login';
import useUserStore from 'store/userStore';
import 'styles/_app.scss';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [user, setUser] = useUserStore(state => [state.user, state.setUser]);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    const foundUser = localStorage.getItem('user');
    if(foundUser) {
      setUser(JSON.parse(foundUser));
    }
  }, []);


  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <MainLayout>
          {!user ? <Login/> : <Component {...pageProps} />}
        </MainLayout>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};