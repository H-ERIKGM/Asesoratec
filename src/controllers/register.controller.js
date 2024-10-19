import Register from '../models/register.model.js'

export const getRegisters = async (req, res) => {
    let registers 
    if(req.user.role === 'user'){
        registers = await Register.find({user: req.user.id}).populate('user').populate('counseling');
    }else if(req.user.role === 'teacher'){
        registers = await Register.find({'counseling.user': req.user.id}).populate('user').populate('counseling');
    }else if (req.user.role === 'admin') {
        registers = await Register.find().populate('user').populate('counseling');
    }else{
        return res.status(403).json({message:'Unauthorized access'})
    }

    if (!registers) return res.status(404).json({ message: 'No records found' });

    res.json(registers);
};

export const createRegister = async (req, res) => {
    const {status, registerDate, endDate, counselingId} = req.body;
    
    const newRegister = new Register({
        status,
        registerDate,
        endDate,
        user: req.user.id,
        counseling: counselingId
    })
    const saveRegister = await newRegister.save();
    res.json(saveRegister);
};

export const getRegister = async (req, res) => {
    const register = await Register.findById(req.params.id).populate('user').populate('counseling');
    if(!register) return res.status(404).json({message: 'Counseling not found'})
    res.json(register)
};

export const updateRegister = async (req, res) => {
    const register = await Register.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!register) return res.status(404).json({message: 'Register not found'})
    res.json(register)
};

export const deleteRegister = async (req, res) => {
    const register = await Register.findByIdAndDelete(req.params.id);
    if(!register) return res.status(404).json({message: 'Register not found'})
    return res.sendStatus(204);
};