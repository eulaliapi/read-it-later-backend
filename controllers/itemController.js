const User = require("../models/User");

const createItem = async (req, res) => {
    if(!req.params?.userId) {
        return res.status(400).json({"message": "userId required"});
    }

    const userId = req.params.userId.toString();

    const {title, url} = req.body;

    if(!title || !url) {
        return res.status(400).json({"message": "title and url are required"});
    }

    const itemToCreate = {"title": title, "url": url};

    const user = await User.findOne({_id: userId});

    if(!user) {
        return res.status(400).json({"message": `No user matches ${req.params.userId}`});
    }

    try{

        const itemId = await user.items.push(itemToCreate);
        const updatedUser = await user.save();
        const createdItemObjectId = updatedUser.items[itemId-1]._id;
  
        const createdItem = await User.findOne({_id: userId, "items._id": createdItemObjectId}, {"items.$": 1});
        res.status(201).json(createdItem);

    }catch(err){
        res.status(404).json({"message": err.message});
    }

};

const deleteItem = async (req, res) => {

    if(!req.params?.userId) {
        return res.status(400).json({"message": "userId required"});
    }

    if(!req.params?.itemId) {
        return res.status(400).json({"message": "itemId required"});
    }
    const userId = req.params.userId.toString();
    const itemId = req.params.itemId.toString();

    const item = await User.findOne({_id: userId, "items._id": itemId}, {"items.$": 1});

    if(!item){
        return res.status(400).json({"message": "No item found"});
    }

    await User.updateOne({"_id": userId}, {"$pull": {"items": {"_id": itemId}}});
    res.sendStatus(204);
};

module.exports = {
    createItem,
    deleteItem
};