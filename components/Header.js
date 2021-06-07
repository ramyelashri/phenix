import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useUserStore from 'store/userStore';
import { useRouter } from 'next/router';

export default function Header() {
  const user = useUserStore(state => state.user);
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar>
        <Button onClick={() => router.push('/')} color="inherit">
          <Typography variant="h6">
          Phenix app
          </Typography>
        </Button>
        {user ?
          <>
            Welcome {user.username}
            <Button onClick={() => router.push('/logout')} color="inherit">Logout</Button>
          </>
          :
          <Button onClick={() => router.push('/login')} color="inherit">Login</Button>  
        }
      </Toolbar>
    </AppBar>
  )
}