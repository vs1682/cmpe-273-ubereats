export const USER_TYPE = {
  restaurant: 'RESTAURANT',
  customer: 'CUSTOMER'
};

export const LOCAL_STORE_KEYS = {
  user: 'user'
};

const LOGIN_URLS = {
  signIn: '/sign-in',
  signOut: '/sign-out',
  signUp: '/sign-up'
}

const CUSTOMER_URLS = {
  base: '/customer',
  edit: '/customer/edit'
}

const RESTAURANT_URLS = {
  base: '/restaurant',
  edit: '/restaurant/edit',
  dishes: '/restaurant/dishes',
  orders: '/restaurant/orders'
}

export const URLS = {
  login: LOGIN_URLS,
  customer: CUSTOMER_URLS,
  restaurant: RESTAURANT_URLS
}

export const API_URL = 'http://localhost:8000';