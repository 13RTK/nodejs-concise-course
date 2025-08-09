import { useForm } from 'react-hook-form';
import FormError from '../../ui/FormError';
import validator from 'validator';
import { useMutation } from '@tanstack/react-query';
import { createShortURL as createShortURLApi } from '../../services/apiURL';
import { toast } from 'sonner';
import { useSetAtom } from 'jotai';
import {
  isURLShortSuccessAtom,
  shortURLAtom,
} from '../../atoms/urlShortStatusAtom';
import { type URLRecord } from '../../types/APIResponse';

type Inputs = {
  originURL: string;
  urlCode: string;
};

function AppForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const setIsURLShortSuccess = useSetAtom(isURLShortSuccessAtom);
  const setShortURL = useSetAtom(shortURLAtom);

  const { mutate: createShortURL, isPending: isCreating } = useMutation({
    mutationKey: ['getOriginURL'],
    mutationFn: (data: Inputs) =>
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

  function onSubmit(data: Inputs) {
    setIsURLShortSuccess(false);
    setShortURL('');
    createShortURL(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:w-1/2 w-9/10 sm:p-2 p-1 border-1 rounded-xl border-cyan-200 my-2 bg-base-100 text-base-content"
    >
      {/* Origin URL */}
      <fieldset className="fieldset flex justify-center">
        <legend className="fieldset-legend text-2xl">Your Origin URL</legend>
        <textarea
          className={`textarea textarea-lg h-48 sm:w-1/2 w-full ${
            errors.originURL ? 'input-error' : ''
          }`}
          placeholder="The URL you want to shorten"
          {...register('originURL', {
            required: 'Origin URL is required',
            validate: (value) => {
              return validator.isURL(value) || 'Invalid URL';
            },
          })}
        />
      </fieldset>
      {errors.originURL && <FormError>{errors.originURL.message}</FormError>}

      {/* Custom URL code */}
      <fieldset className="fieldset flex justify-center mb-2">
        <legend className="fieldset-legend text-2xl">
          Custom your short URL(Optional)
        </legend>

        <label className="sm:w-1/2 input input-lg w-full">
          https://alexshorturl.com/
          <input
            type="text"
            className="grow"
            maxLength={8}
            placeholder="Custom URL code"
            {...register('urlCode')}
          />
        </label>
      </fieldset>

      <button className="btn btn-primary btn-lg" disabled={isCreating}>
        {isCreating && <span className="loading loading-spinner"></span>}
        Generate
      </button>
    </form>
  );
}

export default AppForm;
