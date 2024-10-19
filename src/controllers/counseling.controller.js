import Counseling from '../models/counseling.model.js'

export const getCounselings = async (req, res) => {
    const counselings = await Counseling.find()
    .populate('user', 'name last_name email phone')
    .populate('subject', 'title hourStart hourFinish');

    res.json(counselings);
};

export const createCounseling = async (req, res) => {
    const {hour, day, subjectId} = req.body;
    const existingCounseling = await Counseling.findOne({ 
        hour, 
        day, 
        user: req.user.id, 
        subject: subjectId 
    });

    if (existingCounseling) {
        return res.status(400).json({ message: 'Counseling with the same user, subject, hour, and day already exists' });
    }
    const newCounseling = new Counseling({
        hour,
        day,
        user: req.user.id,
        subject: subjectId
    })
    const saveCounseling = await newCounseling.save();
    res.json(saveCounseling);
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
