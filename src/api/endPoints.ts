/**
 * API endpoints for the app.
 */
export const endPoints = {
  /** Endpoints for authentication. */
  auth: {
    /** Endpoint for user login. */
    logIn: '/auth/login',
    /** Endpoint for user sign-up. */
    signUp: '/auth/sign_up',
    /** Endpoint for get user details. */
    getUser: '/user',
  },
  /** Endpoints for app. */
  primary: {
    /** Get all products */
    products: '/products',
    /** Get categories */
    allCategories: '/products/categories',
    /** Get products for selected category */
    productCategory: '/products/category',
  },
};
