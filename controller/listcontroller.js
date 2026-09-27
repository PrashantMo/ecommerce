const List = require('../model/listmodel');

const getLists = async (req, res) => {
	try {
		const lists = await List.find();
		return res.status(200).json(lists);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch lists' });
	}
};

module.exports = { getLists };
