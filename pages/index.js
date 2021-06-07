import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import useUserStore from 'store/userStore';

export default function Index() {
  const router = useRouter();
  const user = useUserStore(state => state.user);

  if(user) {
    router.push('/cart')
  }
  
  return (
    <div>
      <h2>Welcome to Cartio</h2>
      <p>
        Start your journey by 
        <Button onClick={() => router.push('/login')} color="primary">Logging in ..</Button>  
      </p>
    </div>
  )
}