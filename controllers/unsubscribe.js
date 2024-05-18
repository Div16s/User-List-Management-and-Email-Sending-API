const User = require('../models/User');

const unSubscribe = async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 
            'User not found'
        });
    }

    user.unsubscribed = true;
    await user.save();

    res.status(200).json({ 
        message: 'You have successfully unsubscribed from our emails.' 
    });
};

module.exports = unSubscribe;
