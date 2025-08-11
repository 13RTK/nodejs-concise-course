import { useRedirect } from '../../hooks/useRedirect';
import Loading from '../../ui/Loading';

function RedirectProcess() {
  const { isPending, isError, error } = useRedirect();

  return (
    <section className="my-8 sm:text-8xl text-4xl">
      {isPending && (
        <section>
          <h1 className="text-8xl">Redirecting...</h1>
          <Loading />
        </section>
      )}

      {isError && (
        <section>
          <h1>{error?.message}</h1>
        </section>
      )}
    </section>
  );
}

export default RedirectProcess;
