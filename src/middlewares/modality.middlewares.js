import {selectModalityById} from '../models/modality.model.js';

export const checkIdModality = async (req, res, next) => {
    const {modalityId} = req.params;
    if (isNaN(modalityId)){
        return res.status(400).json ({message: 'ID must be a number'})
    }
    const result = await selectModalityById(modalityId);
    if (!result){
        return res.status (404).json({message: "Modality not found"});
    }
    req.modality = result;
    next ();
}