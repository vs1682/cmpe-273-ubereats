import graphql from 'graphql';

import Creds from '../services/Creds.js';
import Customer from '../services/Customer.js';
import Dish from '../services/Dish.js';
import Image from '../services/Image.js';
import Order from '../services/Order.js';
import Restaurant from '../services/Restaurant.js';

import { USER_TYPE } from '../utils/constants.js';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList
} = graphql;

const credsType = new GraphQLObjectType({
  name: 'creds',
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    pwd: { type: GraphQLString },
    accountRole: { type: GraphQLString },
    token: { type: GraphQLString },
    customer: { type: customerType },
    restaurant: { type: restaurantType }
  })
});

const customerType = new GraphQLObjectType({
  name: 'customer',
  fields: () => ({
    credId: { type: GraphQLID },
    fullname: { type: GraphQLString },
    dob: { type: GraphQLString },
    city: { type: GraphQLInt },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    nickname: { type: GraphQLString },
    phone: { type: GraphQLString },
    profilePicUrl: { type: GraphQLString },
    about: { type: GraphQLString }
  })
});

const customerFavoriteType = new GraphQLObjectType({
  name: 'customerFavorite',
  fields: () => ({
    custId: { type: GraphQLID },
    restId: { type: GraphQLID }
  })
});

const customerAddressType = new GraphQLObjectType({
  name: 'customerAddress',
  fields: () => ({
    custId: { type: GraphQLID },
    address: { type: GraphQLString }
  })
});

const dishType = new GraphQLObjectType({
  name: 'dish',
  fields: () => ({
    restId: { type: GraphQLID },
    name: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    imageId: { type: GraphQLID },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
    category: { type: GraphQLID },
    type: { type: GraphQLID }
  })
});

const dishCategoryType = new GraphQLObjectType({
  name: 'dishCategory',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const dishTypeType = new GraphQLObjectType({
  name: 'dishType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const imageType = new GraphQLObjectType({
  name: 'image',
  fields: () => ({
    _id: { type: GraphQLID },
    url: { type: GraphQLString }
  })
});

const orderType = new GraphQLObjectType({
  name: 'order',
  fields: () => ({
    custId: { type: GraphQLID },
    restId: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    note: { type: GraphQLString },
    deliveryMode: { type: GraphQLBoolean },
    orderedAt: { type: GraphQLString },
    status: { type: GraphQLID }
  })
});

const orderItemType = new GraphQLObjectType({
  name: 'orderItem',
  fields: () => ({
    orderId: { type: GraphQLID },
    dishId: { type: GraphQLID },
    quantity: { type: GraphQLInt }
  })
});

const orderStatusType = new GraphQLObjectType({
  name: 'orderStatus',
  fields: () => ({
    orderId: { type: GraphQLID },
    dishId: { type: GraphQLID },
    quantity: { type: GraphQLInt }
  })
});

const restaurantType = new GraphQLObjectType({
  name: 'restaurant',
  fields: () => ({
    credId: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    description: { type: GraphQLString },
    phone: { type: GraphQLString },
    timing: { type: GraphQLString },
    deliveryModeAllowed: { type: GraphQLBoolean },
    profilePicUrl: { type: GraphQLString },
    dishes: { type: new GraphQLList(dishType) }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: credsType,
      args: {
        email: { type: GraphQLString },
        pwd: { type: GraphQLString },
        accountRole: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const [err, data] = await Creds.find(args);

        if (err) {
          return {
            message: err.message || 'Some error occurred while signing in.'
          };
        }

        return {
          _id: data._id,
          email: data.email,
          accountRole: data.accountRole,
          token: data.token
        };
      }
    },
    customer: {
      type: customerType,
      args: {
        credId: { type: GraphQLID }
      },
      resolve: async (parent, args) => {
        const credId = parent ? parent.id : args.credId;
        const [err, data] = await Customer.find({ credId });

        if (err) {
          return {
            message:
              err.message || 'Some error occurred while fetching profile.'
          };
        }

        return data;
      }
    },
    customerFavorites: {
      type: new GraphQLList(customerFavoriteType)
    },
    customerAddresses: {
      type: new GraphQLList(customerAddressType)
    },
    restaurant: {
      type: restaurantType,
      args: {
        credId: { type: GraphQLID }
      },
      resolve: async (parent, args) => {
        const credId = parent ? parent.id : args.credId;
        const [err, data] = await Restaurant.find({ credId });

        if (err) {
          return {
            message:
              err.message || 'Some error occurred while fetching profile.'
          };
        }

        const [dishErr, dishes] = await Dish.findAll({ restId: credId });

        return {
          ...data,
          dishes
        };
      }
    },
    dishes: {
      type: new GraphQLList(dishType),
      args: {
        restId: { type: GraphQLID }
      },
      resolve: async (parent, args) => {
        const restId = parent ? parent.id : args.restId;
        const [err, data] = await Dish.findAll({ restId });

        if (err) {
          return {
            message: err.message || 'Some error occurred while fetching dish.'
          };
        }

        return data;
      }
    },
    dishTypes: {
      type: new GraphQLList(dishTypeType)
    },
    dishCategories: {
      type: new GraphQLList(dishCategoryType)
    },
    orderStatuses: {
      type: new GraphQLList(orderStatusType)
    },
    orders: {
      type: new GraphQLList(orderStatusType),
      what: customerFavoriteType,
      customerAddressType: customerAddressType,
      imageType,
      orderItemType
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signin: {
      type: credsType,
      args: {
        email: { type: GraphQLString },
        pwd: { type: GraphQLString },
        accountRole: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const [err, data] = await Creds.find(args);

        if (err) {
          return {
            message: err.message || 'Some error occurred while signing in.'
          };
        }

        let profileErr = null;
        let profileData = {};
        const profile = {};

        if (data.accountRole === USER_TYPE.customer) {
          [profileErr, profileData] = await Customer.find({
            credId: data.id
          });

          profile.customer = profileData;
        } else {
          [profileErr, profileData] = await Restaurant.find({
            credId: data.id
          });

          profile.restaurant = profileData;
        }

        if (profileErr) {
          return {
            message:
              profileErr.message ||
              'Some error occurred while fetching profile.'
          };
        }

        return {
          _id: data._id,
          email: data.email,
          accountRole: data.accountRole,
          token: data.token,
          ...profile
        };
      }
    },
    signup: {
      type: credsType,
      args: {
        email: { type: GraphQLString },
        pwd: { type: GraphQLString },
        accountRole: { type: GraphQLString },
        fullname: { type: GraphQLString },
        location: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const [err, data] = await Creds.create(args);

        if (err) {
          return {
            message: err.message || 'Some error occurred while signing in.'
          };
        }

        let profileErr = null;
        let profileData = {};
        const profile = {};

        if (data.accountRole === USER_TYPE.customer) {
          [profileErr, profileData] = await Customer.create({
            fullname: args.fullname,
            credId: data.id
          });

          profile.customer = profileData;
        } else {
          [profileErr, profileData] = await Restaurant.create({
            fullname: args.fullname,
            location: args.location,
            credId: data.id
          });

          profile.restaurant = profileData;
        }

        if (profileErr) {
          return {
            message:
              profileErr.message ||
              'Some error occurred while fetching profile.'
          };
        }

        return {
          _id: data.id,
          email: data.email,
          accountRole: data.accountRole,
          token: data.token,
          ...profile
        };
      }
    },
    updateCustomer: {
      type: restaurantType,
      args: {
        credId: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        phone: { type: GraphQLString },
        timing: { type: GraphQLString },
        deliveryModeAllowed: { type: GraphQLBoolean },
        profilePicUrl: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const [err, data] = await RestaurantService.update(args);

        if (err) {
          return {
            message:
              err.message ||
              'Some error occurred while updating the Restaurant.'
          };
        }

        return data;
      }
    },
    updateRestaurant: {
      type: restaurantType,
      args: {
        credId: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        phone: { type: GraphQLString },
        timing: { type: GraphQLString },
        deliveryModeAllowed: { type: GraphQLBoolean },
        profilePicUrl: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const [err, data] = await RestaurantService.update(args);

        if (err) {
          return {
            message:
              err.message ||
              'Some error occurred while updating the Restaurant.'
          };
        }

        return data;
      }
    },
    addDish: {
      type: dishType,
      args: {
        restId: { type: GraphQLID },
        name: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
        category: { type: GraphQLID },
        type: { type: GraphQLID }
      },
      resolve: async (parent, args) => {
        let imgErr, imgData;
        if (args.imageUrl) {
          [imgErr, imgData] = await Image.create({
            url: args.imageUrl
          });
        }

        const [err, data] = await Dish.create({
          ...args,
          imageId: imgData ? imgData.id : null
        });

        if (imgErr || err) {
          return {
            message:
              err.message || 'Some error occurred while creating the Dish.'
          };
        }

        return data;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default schema;
