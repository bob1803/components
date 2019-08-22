const config = require(  "../../data/config.js");

const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
 // GraphQLID
} = graphql;

const MenuType = new GraphQLObjectType({
  name: "ItemMenu",
  fields: () => ({
    title: { type: GraphQLString },
    link: { type: GraphQLString }
  })
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    menuConfig: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
          return config.menuConfig;
      }
    }
  })
});
module.exports = new GraphQLSchema({
  query: Query
});
