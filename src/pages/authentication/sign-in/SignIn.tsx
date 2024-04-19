import { FC } from 'react';
import { Button, Input } from '../../../components';
import { strings } from '../../../constants';
import { AuthPage } from '../components';

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
          <a className='hover:text-button-hover cursor-pointer font-semibold text-color'>
            {signUp.title}
          </a>
        </p>

        {/* Email and password input fields */}
        <Input id='email' label={common.emailAddress} />
        <Input id='password' type='password' label={common.password} />

        {/* Sign-in button */}
        <Button title={signIn.title} className='mt-2 w-full' />
      </div>
    </AuthPage>
  );
};
