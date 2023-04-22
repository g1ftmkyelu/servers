const predictEyeDisease=require('../utils/aiModels/eyeDiagnosisModel')




exports.Diagnose = async (req, res) => {
    try {

        predictEyeDisease(req.file)


       

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
