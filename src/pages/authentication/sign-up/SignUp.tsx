import { FC } from 'react';
import { Button, Input } from '../../../components';
import { strings } from '../../../constants';
import { AuthPage } from '../components';

/**
 * SignUp Page
 *
 * Represents the sign-up screen of the application.
 * Users can create a new account by providing their first name, last name, email, and password.
 */
export const SignUp: FC = () => {
  // constants
  const {
    auth: { common, signIn, signUp },
  } = strings;
  return (
    <AuthPage
      src='src/assets/headband.png'
      srcSet='src/assets/headband@2x.png 2x, src/assets/headband@3x.png 3x'
    >
      <div className='w-full md:max-w-md'>
        {/* Heading section */}
        <h1 className='mb-4 text-2xl font-normal md:text-3xl'>{signUp.title}</h1>
        <p className='mb-4 text-sm text-light'>
          {`${signUp.alreadyHaveAccount} `}
          <a className='hover:text-button-hover cursor-pointer font-semibold text-color'>
            {signIn.title}
          </a>
        </p>

        {/* First name and last name input fields */}
        <div className='flex flex-col lg:flex-row'>
          <Input id='fname' label={common.fName} />
          <div className='hidden w-4 lg:block' />
          <Input id='lname' label={common.lName} />
        </div>

        {/* Email input field */}
        <Input id='email' label={common.emailAddress} />

        {/* Password input fields */}
        <Input id='password' type='password' label={common.password} />
        <Input id='confirm-password' type='password' label={common.confirmPassword} />

        {/* Sign-up button */}
        <Button title={signUp.title} className='mt-2 w-full' />
      </div>
    </AuthPage>
  );
};
