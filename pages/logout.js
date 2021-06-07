import { useEffect } from 'react';
import useUserStore from 'store/userStore';
import { useRouter } from 'next/router';

export default function Logout() {
  const logout = useUserStore(state => state.logout);
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/');
  })

  return null;
}
