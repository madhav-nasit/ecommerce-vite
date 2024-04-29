import { FC, useLayoutEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import * as Yup from 'yup';
import { Button, Input, Spinner } from 'components';
import { routes, schema, strings } from 'constants';
import { useAuthContext } from 'hooks';
import { AuthPageContext } from 'pages';
import { useSignInMutation } from 'queries';
import { showSuccessToast } from 'utils';

/**
 * Yup schema for sign-in page validation
 */
const SignInSchema = Yup.object().shape({
  userName: schema.userName,
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

  // API call for sign in
  const { mutateAsync, isPending } = useSignInMutation();

  // Outlet context for setting image assets
  const { setImageAssets } = useOutletContext<AuthPageContext>();

  // Set up image assets on component mount
  useLayoutEffect(() => {
    setImageAssets({
      src: '/iphone.png', // Main image source
      srcSet: '/iphone@2x.png 2x, /iphone@3x.png 3x', // Image source set for responsive design
    });
  }, []);

  // Formik form configuration for sign-in form
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      try {
        // Handle form submission
        const user = await mutateAsync({
          username: values.userName,
          password: values.password,
        });
        if (!!user && user?.token) {
          formik.resetForm();
          login({ user, token: user?.token });
          showSuccessToast({ message: signIn.signInSuccess });
          // Navigate to home page after successful sign-in
          navigate(routes.root, { replace: true });
        }
      } catch (error) {}
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
          className='cursor-pointer font-semibold text-color hover:text-button-hover dark:text-color-dark dark:hover:text-hover'
          to={routes.signUp}
          replace
        >
          {signUp.title}
        </Link>
      </p>

      {/* Email and password input fields */}
      <Input
        id='userName'
        label={common.userName}
        onChange={formik.handleChange}
        value={formik.values.userName}
        error={formik.errors.userName}
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
      {!!isPending && <Spinner />}
    </div>
  );
};
