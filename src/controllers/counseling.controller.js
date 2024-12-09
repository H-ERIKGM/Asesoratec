import Counseling from '../models/counseling.model.js'
import mongoose from 'mongoose';
import User from '../models/user.model.js'

export const getCounselings = async (req, res) => {
    const counselings = await Counseling.find()
    .populate('user', 'name last_name email phone')
    .populate({
        path: 'subject',
        populate: [{
            path: 'classroom', 
            select: 'classroom'
        }]});
    
    res.json(counselings);
};

export const createCounseling = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { hour, day,  subject, user} = req.body;

        // Validar que 'subject' no sea undefined
        if (!subject) {
            return res.status(400).json({ message: "Subject is required" });
        }

        // Validar que 'subject' sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(subject)) {
            return res.status(400).json({ message: "Invalid subject ID" });
        }

        const newCounseling = new Counseling({
            hour,
            day,
            user: new mongoose.Types.ObjectId(user),
            subject: new mongoose.Types.ObjectId(subject),
        });

        const saveCounseling = await newCounseling.save();
        res.status(201).json(saveCounseling);
    } catch (error) {
        console.error("Error creating counseling:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getCounseling = async (req, res) => {
    const counseling = await Counseling.findById(req.params.id).populate('user').populate('subject');
    if(!counseling) return res.status(404).json({message: 'Counseling not found'})
    res.json(counseling)
};

export const updateCounseling = async (req, res) => {
    const counseling = await Counseling.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!counseling) return res.status(404).json({message: 'Counseling not found'})
    res.json(counseling)
};

export const deleteCounseling = async (req, res) => {
    const counseling = await Counseling.findByIdAndDelete(req.params.id);
    if(!counseling) return res.status(404).json({message: 'Counseling not found'})
    return res.sendStatus(204);
};

export const getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: "teacher" }).select("name email"); 
        res.json(teachers);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};