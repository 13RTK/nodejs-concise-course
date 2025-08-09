import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { getOriginURL as getOriginURLApi } from '../services/apiURL';

export function useRedirect() {
  const { urlCode = '' } = useParams();

  const {
    mutate: getOriginURL,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ['getShortURL'],
    mutationFn: () => getOriginURLApi(urlCode || ''),
    onSuccess: (data) => {
      // Redirect to origin URL
      window.location.href = data.data as string;
    },
  });

  useEffect(() => {
    getOriginURL();
  }, []);

  return {
    isPending,
    isError,
    error,
  };
}
