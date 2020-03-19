const Event = require('../../model/event');
const Booking = require('../../model/booking');
const { transformBooking, transformEvent } = require('./merge');

module.exports = {
    
    bookings: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error('Unauthenticated');
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },

    bookEvent: async (args, req) => {
        if(!req.isAuth)
        {
            throw new Error('Unauthenticated');
        }
        const fetchedEvent = await Event.findById(args.eventId);
        const fetchedUser = await User.findById(args.userId);
        const booking = new Booking({
            user: fetchedUser,
            event: fetchedEvent
        });

        const result = await booking.save();
        return transformBooking(result);
    },
    
    cancelBooking: async (args, req) => {
        if(!req.isAuth)
        {
            throw new Error('Unauthenticated');
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');

            await Booking.deleteOne({ _id: booking._id });
            return transformEvent(booking.event);
        } catch (err) {
            throw err;
        }
    }
}