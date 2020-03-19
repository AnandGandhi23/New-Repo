const bcrypt = require('bcryptjs');
const User = require('../../model/user');
const jwt = require('jsonwebtoken');
const {ApolloError}  = require('apollo-server');

module.exports = {

    createUser: async (args) => {
        try {
            const userResponse = await User.findOne({ email: args.userInput.email })
            if (userResponse) {
                throw new Error("User already exist");
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await user.save()
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },

    login: async (args) => {
        console.log('coming');
        const user = await User.findOne({ email: args.email });
        console.log(user);
        if (!user) {
            throw new ApolloError('User does not exist');
        }
        console.log(user);
        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
            throw new ApolloError('Password is incorrect');
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, 'privateKey',
            { expiresIn: '1h' });

        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1     
        };
    }
}