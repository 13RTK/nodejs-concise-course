import { useAtomValue } from 'jotai';

import AppForm from '../features/home/AppForm';
import ShortURLField from '../ui/ShortURLField';

import { isURLShortSuccessAtom } from '../atoms/urlShortAtom';

function Home() {
  const isURLShortSuccess = useAtomValue(isURLShortSuccessAtom);

  return (
    <>
      <AppForm />
      {isURLShortSuccess && <ShortURLField />}
    </>
  );
}

export default Home;
