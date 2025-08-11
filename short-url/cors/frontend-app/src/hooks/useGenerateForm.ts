import { useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { type URLRecord } from '../types/APIResponse';
import { type AppFormInput } from '../types/AppFormInput';

import { isURLShortSuccessAtom, shortURLAtom } from '../atoms/urlShortAtom';
import { createShortURL as createShortURLApi } from '../services/apiURL';

export function useGenerateForm() {
  const setIsURLShortSuccess = useSetAtom(isURLShortSuccessAtom);
  const setShortURL = useSetAtom(shortURLAtom);

  const { mutate: createShortURL, isPending: isCreating } = useMutation({
    mutationKey: ['getOriginURL'],
    mutationFn: (data: AppFormInput) =>
      createShortURLApi(data.originURL, data.urlCode || ''),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      const urlRecord = data.data as URLRecord;

      setShortURL(urlRecord.shortURL);
      setIsURLShortSuccess(true);

      toast.success(data.message || 'Short URL created successfully');
    },
  });

  function onSubmit(data: AppFormInput) {
    setIsURLShortSuccess(false);
    setShortURL('');
    createShortURL(data);
  }

  return {
    onSubmit,
    isCreating,
  };
}
