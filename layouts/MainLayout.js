import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Header from 'components/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="mainLayout">
      <CssBaseline />
      <Head>
        <title>Phenix app</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <Header/>

      <main className="mainLayout__content">
        {children}
      </main>

      <footer className="mainLayout__footer">
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">
            Phenix app
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </footer>
    </div>
  )
}

export default MainLayout;
