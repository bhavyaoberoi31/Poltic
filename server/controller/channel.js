import Channel from "../model/channel.js";

export const createChannel = async (req, res) => {
    try {

        if(!req.body.email){
             return res.status(400).json("Please provide the email")
        }
        const existingChannel = await Channel.findOne({ email:req.body.email });
        if (existingChannel) {
            return res.status(400).json({ message: "A channel with this email already exists." });
        }

        const newChannel = new Channel(req.body);
        await newChannel.save();
        res.status(201).json(newChannel);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

export const getChannels = async (req, res) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

export const getChannelByEmail = async (req, res) => {
    const email = req.query.email
    console.log(email) ; 
    try {
        const channel = await Channel.findOne({email});
        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }
        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

export const updateChannel = async (req, res) => {
    const id = req.query.id
    try {
        if(!req.body.email){
            return res.status(400).json("Please provide the email")
       }
       const existingChannel = await Channel.findOne({ email:req.body.email });
        if (existingChannel && existingChannel._id.toString() !== id) {
            return res.status(400).json({ message: "A channel with this email already exists." });
        }
        const updatedChannel = await Channel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedChannel) {
            return res.status(404).json({ message: "Channel not found" });
        }
        res.status(200).json(updatedChannel);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
