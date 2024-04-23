import * as Yup from 'yup';
import { strings } from 'constants';

// Destructure error messages from strings module
const {
  validation: { email, password, name },
} = strings;

// Define Yup schema for validation
export const schema = {
  email: Yup.string().required(email.required).email(email.invalid),
  password: Yup.string()
    .required(password.required)
    .min(8, password.length)
    .matches(/^(?=.*[a-z])/, password.lowercase)
    .matches(/^(?=.*[A-Z])/, password.uppercase)
    .matches(/^(?=.*[0-9])/, password.number)
    .matches(/^(?=.*[!@#\$%\^&\*])/, password.special),
  firstName: Yup.string().required(name.firstName),
  lastName: Yup.string().required(name.lastName),
  confirmPassword: Yup.string()
    .required(password.confirmPassword)
    .oneOf([Yup.ref('password')], password.doNotMatch),
};
