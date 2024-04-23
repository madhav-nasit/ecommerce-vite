import { FC, useLayoutEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import * as Yup from 'yup';
import { Button, Input } from 'components';
import { routes, schema, strings } from 'constants';
import { useAuthContext } from 'hooks';
import { AuthPageContext } from 'pages';

/**
 * Yup schema for sign-in page validation
 */
const SignInSchema = Yup.object().shape({
  email: schema.email,
  password: schema.password,
});

/**
 * SignIn Component
 *
 * Represents the sign-in screen of the application.
 * Users can sign in with their email and password.
 */
export const SignIn: FC = () => {
  // Constants for localization
  const {
    auth: { common, signIn, signUp },
  } = strings;

  // Hooks
  const { login } = useAuthContext(); // Authentication context
  const navigate = useNavigate(); // Navigation hook

  // Outlet context for setting image assets
  const { setImageAssets } = useOutletContext<AuthPageContext>();

  // Set up image assets on component mount
  useLayoutEffect(() => {
    setImageAssets({
      src: 'src/assets/iphone.png', // Main image source
      srcSet: 'src/assets/iphone@2x.png 2x, src/assets/iphone@3x.png 3x', // Image source set for responsive design
    });
  }, []);

  // Formik form configuration for sign-in form
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      // Handle form submission
      login({
        email: values.email,
        firstName: 'Test',
        lastName: 'User',
      });
      // Navigate to home page after successful sign-in
      navigate(routes.root, { replace: true });
    },
  });

  return (
    <div className='w-full md:max-w-md'>
      {/* Heading section */}
      <h1 className='mb-4 text-3xl font-normal'>{signIn.title}</h1>
      <p className='mb-4 text-sm text-light dark:text-light-dark'>
        {`${signIn.dontHaveAccount} `}
        {/* Link to sign-up page */}
        <Link
          className='dark:hover:text-hover cursor-pointer font-semibold text-color hover:text-button-hover dark:text-color-dark'
          to={routes.signUp}
          replace
        >
          {signUp.title}
        </Link>
      </p>

      {/* Email and password input fields */}
      <Input
        id='email'
        label={common.emailAddress}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
        required
      />
      <Input
        id='password'
        type='password'
        label={common.password}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
        required
      />

      {/* Sign-in button */}
      <Button title={signIn.title} className='mt-2 w-full' onClick={() => formik.handleSubmit()} />
    </div>
  );
};
