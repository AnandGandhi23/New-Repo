const bcrypt = require('bcryptjs');
const User = require('../../model/user');

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
    }
}