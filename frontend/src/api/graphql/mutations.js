import { gql } from "@apollo/client";

const signUpCustomer = gql`
  mutation signup(
    $email: String!
    $pwd: String!
    $accountRole: String!
    $fullname: String!
  ) {
    signup(
      email: $email
      pwd: $pwd
      accountRole: $accountRole
      fullname: $fullname
    ) {
      email
      accountRole
      _id
      token
      customer {
        credId
        fullname
      }
    }
  }
`;

const signInCustomer = gql`
  mutation signin($email: String!, $pwd: String!, $accountRole: String!) {
    signup(email: $email, pwd: $pwd, accountRole: $accountRole) {
      email
      accountRole
      _id
      token
      customer {
        credId
        fullname
      }
    }
  }
`;

const updateCustomer = gql`
  mutation updateCustomer(
    $credId: ID!
    $fullname: String
    $dob: String
    $city: Float
    $state: String
    $country: String
    $nickname: String
    $phone: String
    $profilePicUrl: String
    $about: String
  ) {
    updateCustomer(
      credId: $credId
      fullname: $fullname
      dob: $dob
      city: $city
      state: $state
      country: $country
      nickname: $nickname
      phone: $phone
      profilePicUrl: $profilePicUrl
      about: $about
    ) {
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

const signUpRestaurant = gql`
  mutation signup(
    $email: String!
    $pwd: String!
    $accountRole: String!
    $fullname: String!
    $location: String!
  ) {
    signup(
      email: $email
      pwd: $pwd
      accountRole: $accountRole
      fullname: $fullname
      location: $location
    ) {
      email
      accountRole
      _id
      token
      restaurant {
        credId
        name
        location
      }
    }
  }
`;

const signInRestaurant = gql`
  mutation signin($email: String!, $pwd: String!, $accountRole: String!) {
    signin(email: $email, pwd: $pwd, accountRole: $accountRole) {
      email
      accountRole
      _id
      token
      restaurant {
        credId
        name
        location
      }
    }
  }
`;

const updateRestaurant = gql`
  mutation updateRestaurant(
    $credId: ID!
    $name: String
    $location: String
    $description: String
    $phone: String
    $timing: String
    $deliveryModeAllowed: Boolean
    $profilePicUrl: String
  ) {
    updateRestaurant(
      credId: $credId
      name: $name
      location: $location
      description: $description
      phone: $phone
      timing: $timing
      deliveryModeAllowed: $deliveryModeAllowed
      profilePicUrl: $profilePicUrl
    ) {
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

const addDish = gql`
  mutation addDish(
    $restId: ID!
    $name: String!
    $ingredients: String
    $imageUrl: String
    $price: String!
    $description: String
    $category: String
    $type: String
  ) {
    addDish(
      restId: $restId
      name: $name
      ingredients: $ingredients
      imageUrl: $imageUrl
      price: $price
      description: $description
      category: $category
      type: $type
    ) {
      restId
      name
      ingredients
      imageUrl
      price
      description
      category
      type
    }
  }
`;

const updateDish = gql`
  mutation updateDish(
    $dishId: ID!
    $restId: ID!
    $name: String!
    $ingredients: String
    $imageUrl: String
    $price: String!
    $description: String
    $category: String
    $type: String
  ) {
    updateDish(
      dishId: $dishId
      restId: $restId
      name: $name
      ingredients: $ingredients
      imageUrl: $imageUrl
      price: $price
      description: $description
      category: $category
      type: $type
    ) {
      dishId
      restId
      name
      ingredients
      imageUrl
      price
      description
      category
      type
    }
  }
`;

const createOrder = gql`
  mutation createOrder(
    $custId: ID!
    $restId: ID!
    $amount: Float
    $note: String
    $deliveryMode: Boolean
    $orderedAt: String
    $status: ID!
  ) {
    createOrder(
      custId: $custId
      restId: $restId
      amount: $amount
      note: $note
      deliveryMode: $deliveryMode
      orderedAt: $orderedAt
      status: $status
    ) {
      _id
      custId
      restId
      amount
      note
      deliveryMode
      orderedAt
      status
    }
  }
`;

const updateOrderStatus = gql`
  mutation updateOrderStatus($orderId: ID!, $status: ID!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      _id
      custId
      restId
      amount
      note
      deliveryMode
      orderedAt
      status
    }
  }
`;

export {
  signUpCustomer,
  signInCustomer,
  updateCustomer,
  signUpRestaurant,
  signInRestaurant,
  updateRestaurant,
  addDish,
  updateDish,
  createOrder,
  updateOrderStatus,
};
