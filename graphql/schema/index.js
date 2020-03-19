const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking {
    _id: ID
    event: Event
    user: User,
    createdAt : String,
    updatedAt: String
}

type Event {
    _id: ID!,
    title: String!,
    description: String!,
    price: Float!,
    date: String!,
    creator: User!            
}

input eventInput {
    title: String,
    description: String,
    price: Float,
    date: String  
}

type User{
    _id: ID!,
    email: String!,
    password: String,
    createdEvents: [Event!]
}

type AuthData{
    userId: ID!,
    token: String!,
    tokenExpiration: Int!
}

input userInput {
    email: String!, 
    password: String!
}

type RootQuery{
    events: [Event!]
    bookings: [Booking]
    login(email: String!, password: String!): AuthData
}

type RootMutation{
    createEvent(eventInput: eventInput): Event
    createUser(userInput : userInput) : User
    bookEvent(eventId: String!, userId: String!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)