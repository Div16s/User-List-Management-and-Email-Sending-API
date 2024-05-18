const User = require('../models/User');

const unSubscribe = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error:
                    'User not found'
            });
        }

        user.unsubscribed = true;
        await user.save();

        res.status(200).json({
            message: 'You have successfully unsubscribed from our email services.'
        });
    }
    catch (error) {
        console.error('Error unsubscribing user:', error.message);
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = unSubscribe;
