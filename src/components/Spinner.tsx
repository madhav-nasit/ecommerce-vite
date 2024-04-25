/**
 * Spinner Component
 * Displays a loading spinner.
 */
export const Spinner = () => {
  return (
    <div className={`absolute bottom-0 left-0 right-0 top-12 flex items-center justify-center`}>
      <img src='/logo.svg' className={`size-12 animate-spin rounded-full object-contain`} />
    </div>
  );
};
