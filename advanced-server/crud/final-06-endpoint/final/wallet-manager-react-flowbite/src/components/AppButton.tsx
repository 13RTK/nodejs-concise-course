// This component is deprecated temporarily because of the React version of Flowbite.
function AppButton({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const basicButtonClass =
    "inline-flex items-center justify-end space-x-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

  return (
    <button
      type="button"
      className={
        className
          ? `${basicButtonClass} ${className}`
          : `me-2 ${basicButtonClass}`
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default AppButton;
