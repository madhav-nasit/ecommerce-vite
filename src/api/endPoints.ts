/**
 * API endpoints for the app.
 */
export const endPoints = {
  /** Endpoints for authentication. */
  auth: {
    /** Endpoint for user login. */
    logIn: '/auth/login',
    /** Endpoint for user sign-up. */
    signUp: '/users/add',
    /** Endpoint for get user details. */
    getUser: '/auth/me',
  },
  /** Endpoints for app. */
  primary: {
    /** Get all products */
    products: '/products',
    /** Get categories */
    allCategories: '/products/categories',
    /** Get products for selected category */
    productCategory: '/products/category',
    /** Get cart of the user */
    cart: 'carts/user',
  },
};
