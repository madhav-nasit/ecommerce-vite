import { FC } from 'react';
import { useFormik } from 'formik';
import { Button, Input } from '../../../components';
import { strings } from '../../../constants';
import { AuthPage } from '../components';
import * as Yup from 'yup';
import { schema } from '../../../constants/schema';

/**
 * Yup schema for sign-in page
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
  // constants
  const {
    auth: { common, signIn, signUp },
  } = strings;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <AuthPage
      src='src/assets/iphone.png'
      srcSet='src/assets/iphone@2x.png 2x, src/assets/iphone@3x.png 3x'
    >
      <div className='w-full md:max-w-md'>
        {/* Heading section */}
        <h1 className='mb-4 text-3xl font-normal'>{signIn.title}</h1>
        <p className='mb-4 text-sm text-light'>
          {`${signIn.dontHaveAccount} `}
          <a className='cursor-pointer font-semibold text-color hover:text-button-hover'>
            {signUp.title}
          </a>
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
        <Button
          title={signIn.title}
          className='mt-2 w-full'
          onClick={() => formik.handleSubmit()}
        />
      </div>
    </AuthPage>
  );
};
