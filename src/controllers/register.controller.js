import Register from '../models/register.model.js'

export const getRegisters = async (req, res) => {
    try{
        let registers 
       
        if(req.user.role === 'user'){
            registers = await Register.find({user: req.user.id}).populate('_id').populate('user').populate({
                path: 'counseling',
                populate: [{
                    path: 'user', 
                    select: 'email name last_name'
                }, {
                    path: 'subject',
                    select: 'title date classroom',
                    populate: {
                        path: 'classroom', 
                        select: 'classroom'
                    }
                },
            ],
            }).lean(); 
            const formattedRegisters = registers.map((register) => ({
                id: register._id,
                user: register.user,
                registerDate: register.registerDate,
                counseling: register.counseling,
                hour: register.counseling?.hour,
                day: register.counseling?.day,
                status: register.status,
            }));
            res.json(formattedRegisters);
    
        }else if(req.user.role === 'teacher'){
            registers = await Register.find().populate({
                path: 'counseling',
                match: { user: req.user.id }, // Asegúrate de que coincida con el ID del profesor
                populate: [
                  { path: 'user', select: 'email name last_name' },
                  {
                    path: 'subject',
                    select: 'title date classroom',
                    populate: { path: 'classroom', select: 'classroom' },
                  },
                ],
              })
              .populate('user') // Popula el usuario asociado al registro
              .lean();
            const formattedRegisters = registers.map((register) => ({
                id: register._id,
                user: register.user,
                registerDate: register.registerDate,
                counseling: register.counseling,
                hour: register.counseling?.hour,
                day: register.counseling?.day,
                status: register.status,
            }));
            console.log(formattedRegisters)
            res.json(formattedRegisters);
        }else if (req.user.role === 'admin') {
            registers = await Register.find().populate('_id').populate('user').populate({
                path: 'counseling',
                populate: [{
                    path: 'user', 
                    select: 'email name last_name'
                }, {
                    path: 'subject',
                    select: 'title date classroom',
                    populate: {
                        path: 'classroom', 
                        select: 'classroom'
                    }
                },
            ],
            }).lean(); 
            const formattedRegisters = registers.map((register) => ({
                id: register._id,
                user: register.user,
                registerDate: register.registerDate,
                counseling: register.counseling,
                hour: register.counseling?.hour,
                day: register.counseling?.day,
                status: register.status,
            }));
            res.json(formattedRegisters);
        }else{
            return res.status(403).json({message:'Unauthorized access'})
        }

        if (!registers) return res.status(404).json({ message: 'No records found' });

        //res.json(registers);
    }catch(error){
        return res.status(500).json({message:"Something went wrong"})
    }
};

export const createRegister = async (req, res) => {
      try {
    const { counseling, status } = req.body;

    if (!counseling || !status) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const existingRegister = await Register.findOne({
        counseling,
        user: req.user.id,
      });
  
      if (existingRegister) {
        return res.status(400).json({ message: "Ya has registrado esta asesoría." });
      }

    const newRegister = new Register({
      counseling,
      status,
      user: req.user.id,
    });

    const savedRegister = await newRegister.save();
    res.status(201).json(savedRegister);
  } catch (error) {
    console.error("Error en createRegister:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }

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