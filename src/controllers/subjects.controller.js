import Subject from '../models/subject.model.js'

export const getSubjects = async (req, res) => {
    const subjects = await Subject.find({}).populate('classroom')
    res.json(subjects);
};

export const createSubject = async (req, res) => {
    const {title, hourStart, hourFinish, classroomId} = req.body;
    
    const newSubject = new Subject({
        title,
        hourStart,
        hourFinish,
        classroom: classroomId
    })
    const saveSubject = await newSubject.save();
    res.json(saveSubject);
};

export const getSubject = async (req, res) => {
    const subject = await Subject.findById(req.params.id).populate('classroom');
    if(!subject) return res.status(404).json({message: 'Subject not found'})
    res.json(subject)
};

export const updateSubject = async (req, res) => {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!subject) return res.status(404).json({message: 'Subject not found'})
    res.json(subject)
};

export const deleteSubject = async (req, res) => {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if(!subject) return res.status(404).json({message: 'Subject not found'})
    return res.sendStatus(204);
};
