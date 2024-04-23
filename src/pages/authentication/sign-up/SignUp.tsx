import { FC, useLayoutEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useOutletContext } from 'react-router-dom';
import * as Yup from 'yup';
import { Button, Input } from 'components';
import { schema, strings } from 'constants';
import { AuthPageContext } from 'pages';

/**
 * Yup schema for sign-up page validation
 */
const SignUpSchema = Yup.object().shape({
  email: schema.email, // Validation schema for email
  password: schema.password, // Validation schema for password
  firstName: schema.firstName, // Validation schema for first name
  lastName: schema.lastName, // Validation schema for last name
  confirmPassword: schema.confirmPassword, // Validation schema for password confirmation
});

/**
 * SignUp Page
 *
 * Represents the sign-up screen of the application.
 * Users can create a new account by providing their first name, last name, email, and password.
 */
export const SignUp: FC = () => {
  // Constants for localization
  const {
    auth: { common, signIn, signUp },
  } = strings;

  // Hook for setting image assets
  const { setImageAssets } = useOutletContext<AuthPageContext>();

  // Set up image assets on component mount
  useLayoutEffect(() => {
    setImageAssets({
      src: 'src/assets/headband.png', // Main image source
      srcSet: 'src/assets/headband@2x.png 2x, src/assets/headband@3x.png 3x', // Image source set for responsive design
    });
  }, []);

  // Formik form configuration for sign-up form
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className='w-full md:max-w-md'>
      {/* Heading section */}
      <h1 className='mb-4 text-2xl font-normal md:text-3xl'>{signUp.title}</h1>
      <p className='mb-4 text-sm text-light dark:text-light-dark'>
        {`${signUp.alreadyHaveAccount} `}
        {/* Link to sign-in page */}
        <Link
          className='dark:hover:text-hover cursor-pointer font-semibold text-color hover:text-button-hover dark:text-color-dark'
          to={`/signin`}
          replace
        >
          {signIn.title}
        </Link>
      </p>

      {/* First name and last name input fields */}
      <div className='flex flex-col lg:flex-row'>
        <Input
          id='firstName'
          label={common.fName}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.errors.firstName}
          required
        />
        {/* Spacer for responsive design */}
        <div className='hidden w-4 lg:block' />
        <Input
          id='lastName'
          label={common.lName}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.errors.lastName}
          required
        />
      </div>

      {/* Email input field */}
      <Input
        id='email'
        label={common.emailAddress}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
        required
      />

      {/* Password input fields */}
      <Input
        id='password'
        type='password'
        label={common.password}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
        required
      />
      <Input
        id='confirmPassword'
        type='password'
        label={common.confirmPassword}
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={formik.errors.confirmPassword}
        required
      />

      {/* Sign-up button */}
      <Button title={signUp.title} className='mt-2 w-full' onClick={() => formik.handleSubmit()} />
    </div>
  );
};
