import { CategoriesSlider } from 'pages';
import { useParams } from 'react-router-dom';

/**
 * Home Component
 * Represents the home page of the application.
 */
export const Home = () => {
  // Use the useParams hook to get the value of categoryName
  const { categoryName = 'All' } = useParams();
  return (
    <div className='pt-navbar flex h-screen w-screen justify-center bg-background dark:bg-background-dark'>
      <div className='w-full'>
        <CategoriesSlider categoryName={categoryName} />
      </div>
    </div>
  );
};
