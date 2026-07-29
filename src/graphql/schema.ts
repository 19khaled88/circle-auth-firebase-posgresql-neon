import {gql} from 'graphql-tag'

export const typeDefs = gql`
    extend schema
        @link(url:"https://specs.apollo.dev/federation/v2.3",import:["@key"])

    type User @key(fields:"id"){
        id: ID!
        email:String!
        name:String!
        avatarUrl:String
        bio:String 
        role:String!
        isActive:Boolean!
        createdAt:String!
    }

    type Query {
        me:User 
        user(id:ID!):User
        users(limit:Int,offset:Int):[User!]!
    }

    type Mutation{
        updateProfile(name:String,bio:String,avatarUrl:String):User!
        deactivateUser(id:ID!):User!
    }
`;