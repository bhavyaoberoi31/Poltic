
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const expiry = localStorage.getItem('tokenExpiry');
      if (expiry && Date.now() < Number(expiry)) {
        router.replace('/home');
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);
}

export function useRedirectIfNotAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
    const expiry = localStorage.getItem('tokenExpiry');
      if (!expiry || Date.now() > Number(expiry)) {
        router.replace('/login');
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);
}
