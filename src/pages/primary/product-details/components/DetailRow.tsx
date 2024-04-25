/**
 * DetailRow component renders a single row for product details.
 *
 * @param {Object} props - Props for DetailRow component.
 * @param {string} props.heading - The heading for the detail.
 * @param {string | number} props.value - The value for the detail.
 * @returns {JSX.Element} - Returns JSX for a single row of product details.
 */
export const DetailRow = ({ heading, value }: { heading: string; value: string | number }) => {
  return (
    <div className='mb-4 flex items-center'>
      <span className='font-semibold '>
        {heading}: <span className='font-normal'>{value}</span>
      </span>
    </div>
  );
};
