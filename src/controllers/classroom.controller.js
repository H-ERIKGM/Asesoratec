import Classroom from '../models/classroom.model.js'

export const getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find({})
        res.json(classrooms);
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
};

export const createClassroom = async (req, res) => {
    try {
        const {classroom} = req.body;
        
        const newClassroom = new Classroom({
            classroom
        })
        const saveClassroom = await newClassroom.save();
        res.json(saveClassroom);
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
};

export const getClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        if(!classroom) return res.status(404).json({message: 'Classroom not found'})
        res.json(classroom)
    } catch (error) {
        return res.status(404).json({message:"Classroom not found"})
    }
};

export const updateClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if(!classroom) return res.status(404).json({message: 'Classroom not found'})
        res.json(classroom)
    } catch (error) {
        return res.status(404).json({message:"Classroom not found"})
    }
};

export const deleteClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findByIdAndDelete(req.params.id);
        if(!classroom) return res.status(404).json({message: 'Classroom not found'})
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({message:"Classroom not found"})

    }
};