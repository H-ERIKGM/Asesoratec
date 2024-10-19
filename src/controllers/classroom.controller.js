import Classroom from '../models/classroom.model.js'

export const getClassrooms = async (req, res) => {
    const classrooms = await Classroom.find({})
    res.json(classrooms);
};

export const createClassroom = async (req, res) => {
    const {classroom} = req.body;
    
    const newClassroom = new Classroom({
        classroom
    })
    const saveClassroom = await newClassroom.save();
    res.json(saveClassroom);
};

export const getClassroom = async (req, res) => {
    const classroom = await Classroom.findById(req.params.id);
    if(!classroom) return res.status(404).json({message: 'Classroom not found'})
    res.json(classroom)
};

export const updateClassroom = async (req, res) => {
    const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!classroom) return res.status(404).json({message: 'Classroom not found'})
    res.json(classroom)
};

export const deleteClassroom = async (req, res) => {
    const classroom = await Classroom.findByIdAndDelete(req.params.id);
    if(!classroom) return res.status(404).json({message: 'Classroom not found'})
    return res.sendStatus(204);
};