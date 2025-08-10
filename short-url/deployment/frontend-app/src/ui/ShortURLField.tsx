import { useAtomValue } from 'jotai';
import { shortURLAtom } from '../atoms/urlShortAtom';
import { toast } from 'sonner';

function ShortURLField() {
  const shortURL = useAtomValue(shortURLAtom);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shortURL);
      toast.success('Copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  }

  return (
    <section className="join my-2 sm:w-1/2 w-full grid sm:grid-cols-2 grid-cols-1 justify-items-center">
      <label className="input input-lg join-item col-span-1 w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </g>
        </svg>
        <input type="text" disabled value={shortURL} />
      </label>
      <button
        className="btn btn-secondary btn-lg join-item col-span-1 w-full"
        onClick={copyToClipboard}
      >
        Copy To Clipboard
      </button>
    </section>
  );
}

export default ShortURLField;
