const { async } = require('@firebase/util');
const EHR = require('../models/EHR');
const Patient = require('../models/patients');


exports.getAllEHR = async (req, res) =>{
  try{
    const ehrs= await EHR.find().exec();
    return res.status(200).json(ehrs)
  }
  catch(err){
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
}





// Get EHR by patient ID
exports.getEHRByPatientId = async (req, res) => {
    const {id} = req.params;
  
    try {
      // Find patient by ID
      const myEhr = await EHR.findOne({patientId:id});
  
      if (!myEhr)  {
        return res.status(404).json({
          success: false,
          message: 'EHR not found'
        });
      }
  
  
      res.status(200).json(myEhr);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };

// Create a new EHR
exports.createEHR = async (req, res) => {
  try {
    const { patientId, allergies, surgeryHistory, geneticallyInheritedDiseases, specialNeeds, additionalNotes } = req.body;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    const ehr = new EHR({ patientId, allergies, surgeryHistory, geneticallyInheritedDiseases, specialNeeds, additionalNotes });
    await ehr.save();
    res.status(201).json({ success: true, data: ehr });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update an existing EHR
exports.updateEHR = async (req, res) => {
  try {
    const {id} = req.params;
    const ehr=req.body

    await EHR.findByIdAndUpdate(
      id,
      ehr,
      { new: true }
    );

    res.status(200).json({ success: true, message:'EHR updated successfully'});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete an EHR
exports.deleteEHR = async (req, res) => {
  try {
    const {id}=req.params
    const ehr = await EHR.findByIdAndDelete(id);
    if (!ehr) {
      return res.status(404).json({ success: false, message: 'EHR not found' });
    }
    res.status(200).json({ success: true, message: 'EHR deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
