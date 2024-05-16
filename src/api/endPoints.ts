/**
 * API endpoints for the app.
 */
export const endPoints = {
  /** Endpoints for authentication. */
  auth: {
    /** Endpoint for user login. */
    logIn: 'auth/sign-in',
    /** Endpoint for user sign-up. */
    signUp: 'auth/sign-up',
    /** Endpoint for get user details. */
    getUser: '/auth/profile',
  },
  /** Endpoints for app. */
  primary: {
    /** Get all products */
    products: '/product',
    /** Get categories */
    allCategories: '/product/categories',
    /** Get cart of the user */
    cart: '/cart',
    /** Get order of the user */
    order: '/order',
  },
};
