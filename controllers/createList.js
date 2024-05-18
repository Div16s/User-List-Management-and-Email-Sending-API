const List = require('../models/List');

const createList = async (req, res) => {
    try {
        const { title, customProperties } = req.body;

        const newList = new List({
            title,
            customProperties
        });

        const savedList = await newList.save();

        res.status(201).json({
            message: 'List created successfully',
            list: savedList
        });
    } catch (error) {
        console.error('Error creating list:', error.message);
        res.status(500).json({ 
            error: error.message 
        });
    }
};

module.exports = createList;
