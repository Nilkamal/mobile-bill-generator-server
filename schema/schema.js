const graphql = require('graphql');
const _ = require("lodash");
const mongoose = require("mongoose"); //For making ease to work with mongodb
const uri = 'mongodb+srv://nilkamal:test123@mymongo-7mzlx.mongodb.net/billdb?retryWrites=true'
const Bill = require('../models/bill');

//Connecting with mongodb on the cloud
mongoose.connect(uri, { useNewUrlParser: true }, function(err) {
    console.log(err);
  });
  
  //Displaying message when connection is eastablished
  mongoose.connection.once("open", () => {
    console.log("connected to my db");
  });


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull

} = graphql;

const BillType = new GraphQLObjectType({
    name: "Bill",
    fields: () => ({
        id: {type: GraphQLID},
        billNumber: {type: GraphQLInt},
        date: {type: GraphQLString},
        customerName: {type: GraphQLString},
        address: {type: GraphQLString},
        imeiNumber: {type: GraphQLString},
        modelNumber: {type: GraphQLString},
        chargerNumber: {type: GraphQLString},
        warrenty: {type: GraphQLString},
        amount: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        bill: {
            type: BillType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                // return _.find(billsArray, {id: args.id});
                return Bill.findById(args.id);
            }
        },
        bills: {
            type: new GraphQLList(BillType),
            resolve: (parent, args) => {
                // return billsArray;
                return Bill.find({});
            }
            
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBill:  {
        type: BillType,
        args: {
            billNumber: {type: new GraphQLNonNull(GraphQLString)},
            date: {type: new GraphQLNonNull(GraphQLString)},
            customerName: {type: new GraphQLNonNull(GraphQLString)},
            address: {type: new GraphQLNonNull(GraphQLString)},
            imeiNumber: {type: new GraphQLNonNull(GraphQLString)},
            modelNumber: {type: new GraphQLNonNull(GraphQLString)},
            warrenty: {type: new GraphQLNonNull(GraphQLString)},
            chargerNumber: {type: new GraphQLNonNull(GraphQLString)},
            amount: {type: new GraphQLNonNull(GraphQLInt)},
        },
        resolve(parent, args) {
            let bill = new Bill({
                billNumber : args.billNumber,
                date: args.date,
                customerName: args.customerName,
                address: args.address,
                imeiNumber: args.imeiNumber,
                modelNumber: args.modelNumber,
                modelNumber: args.modelNumber,
                warrenty: args.warrenty,
                chargerNumber: args.chargerNumber,
                amount: args.amount
            })
            return bill.save();
        }
    }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})