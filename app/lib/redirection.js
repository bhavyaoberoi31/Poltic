
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const expiry = localStorage.getItem('tokenExpiry');
    
    if (expiry && Date.now() < +expiry) {
      router.replace('/home');
    }
  }, []);
}

export function useRedirectIfNotAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const expiry = localStorage.getItem('tokenExpiry');
    if (!expiry || Date.now() > +expiry) {
      router.replace('/login');
    }
  }, []);
}
