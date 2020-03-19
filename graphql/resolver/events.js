const Event = require('../../model/event');
const { transformEvent } = require('./merge');
const User = require('../../model/user');


module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event);
            })
        } catch (err) {
            throw err;
        }
    },

    createEvent: async (args, req) => {
        // if(!req.isAuth)
        // {
        //     throw new Error('Unauthenticated');
        // }
        let createdEvent;
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5e6a28f08b37640e78c3d084'
        })
        try {
            await event.save();
            createdEvent = transformEvent(event);
            
            const creator = await User.findById('5e6a28f08b37640e78c3d084');
            if (!creator)
                throw new error('User not exist');

            creator.createdEvents.push(event);
            creator.save();
            return createdEvent;
            
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}