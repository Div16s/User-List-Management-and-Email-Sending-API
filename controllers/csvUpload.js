const List = require('../models/List');
const User = require('../models/User');
const csv = require('fast-csv');
const fs = require('fs');

const csvUpload = async (req, res) => {
    try {
        const { listId } = req.params;
        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        const users = [];
        const errors = [];
        const customProperties = list.customProperties.reduce((acc, prop) => {
            acc[prop.title] = prop.fallbackValue;
            return acc;
        }, {});

        const csvFilePath = req.file.path;
        const stream = fs.createReadStream(csvFilePath);

        csv.parseStream(stream, { headers: true, ignoreEmpty: true, trim: true })
            .on('error', error => {
                console.error(error);
                res.status(400).json({ error: 'CSV parsing error' });
            })
            .on('data', row => {
                if (!row.name || !row.email) {
                    console.log('Missing required fields:', row);
                    errors.push({ row, error: 'Missing required fields' });
                    return;
                }

                const { name, email, ...customProps } = row;

                const userProps = { ...customProperties, ...customProps };
                users.push({ name, email, listId, customProperties: userProps });
            })
            .on('end', async () => {
                const results = await Promise.all(users.map(async (user) => {
                    try {
                        await User.create(user);
                        return null;
                    } catch (err) {
                        return { user, error: err.message };
                    }
                }));

                let failed = results.filter(result => result !== null);
                const successful = users.length - failed.length;
                failed = errors.concat(failed);

                res.json({
                    "Count of users added successfully": successful,
                    "Count of users not added": failed.length,
                    errors: failed,
                    "Current total count of users in the list": await User.countDocuments({ listId }),
                });
            });
    }
    catch (error) {
        console.error('Error uploading CSV:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = csvUpload;
