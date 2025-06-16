import Subject from '../models/subject.model.js'
import Classroom from '../models/classroom.model.js';

export const getSubjects = async (req, res) => {
    const subjects = await Subject.find({}).populate('classroom')
    res.json(subjects);
};
export const createSubject = async (req, res) => {
    try {
        const { title, hourStart, hourFinish, classroom } = req.body;
        
        // Convertir hourStart y hourFinish a minutos
        const [startHour, startMinute] = hourStart.split(':').map(Number);
        const [finishHour, finishMinute] = hourFinish.split(':').map(Number);

        // Buscar el ObjectId del classroom usando su ID
        const classroomDoc = await Classroom.findById(classroom);
        if (!classroomDoc) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        const subjectData = {
            title,
            hourStart: startHour, // Convertir a minutos
            hourFinish:  finishHour,
            classroom: classroomDoc._id, // Usa el ObjectId de classroom
        };

        const subject = new Subject(subjectData);
        await subject.save();

        res.status(201).json(subject);
    } catch (error) {
   //posible fallo // 
   return res.status(500).json({ error: error.message });
    }
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
