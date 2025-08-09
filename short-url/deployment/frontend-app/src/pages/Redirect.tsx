import Loading from '../ui/Loading';
import { useRedirect } from '../hooks/useRedirect';

function Redirect() {
  const { isPending, isError, error } = useRedirect();

  return (
    <section className="my-8 sm:text-8xl text-4xl">
      {isPending && (
        <div>
          <h1 className="text-8xl">Redirecting...</h1>
          <Loading />
        </div>
      )}

      {isError && <h1>{error?.message}</h1>}
    </section>
  );
}

export default Redirect;
