import { gql } from "@apollo/client";

const getCustomerProfile = gql`
  query getCustomerProfile($credId: ID!) {
    customer(credId: $credId) {
      credId
      fullname
      dob
      city
      state
      country
      nickname
      phone
      profilePicUrl
      about
    }
  }
`;

const getCustomerFavorites = gql`
  query getCustomerFavorites($custId: ID!) {
    customerFavorites(custId: $custId) {
      custId
      restId
    }
  }
`;

const getCustomerAddresses = gql`
  query getCustomerAddresses($custId: ID!) {
    customerFavorites(custId: $custId) {
      custId
      address
    }
  }
`;

const getRestaurantOrders = gql`
  query getRestaurantOrders($restId: ID!) {
    dishes(restId: $restId) {
      custId
      restId
      name
      ingredients
      imageId
      price
      description
      category
      type
    }
  }
`;

const getRestaurantProfile = gql`
  query getRestaurantProfile($credId: ID!) {
    restaurant(credId: $credId) {
      credId
      name
      location
      description
      phone
      timing
      deliveryModeAllowed
      profilePicUrl
    }
  }
`;

const getRestaurantDishes = gql`
  query getRestaurantDishes($restId: ID!) {
    dishes(restId: $restId) {
      restId
      name
      ingredients
      imageId
      price
      description
      category
      type
    }
  }
`;

const getDishCategories = gql`
  query getDishCategories {
    dishCategories {
      _id
      name
    }
  }
`;

const getDishTypes = gql`
  query getDishTypes {
    dishTypes {
      _id
      name
    }
  }
`;

const getCustomerOrders = gql`
  query getCustomerOrders($custId: ID!) {
    orders(custId: $custId) {
      custId
      restId
      name
      ingredients
      imageId
      price
      description
      category
      type
    }
  }
`;

const getRestaurantOrders = gql`
  query getRestaurantOrders($restId: ID!) {
    orders(restId: $restId) {
      custId
      restId
      name
      ingredients
      imageId
      price
      description
      category
      type
    }
  }
`;

const getOrderStatuses = gql`
  query getOrderStatuses {
    orderStatus {
      _id
      name
    }
  }
`;

export {
  getCustomerProfile,
  getCustomerFavorites,
  getCustomerAddresses,
  getRestaurantProfile,
  getRestaurantDishes,
  getDishCategories,
  getDishTypes,
  getCustomerOrders,
  getRestaurantOrders,
  getOrderStatuses,
};
