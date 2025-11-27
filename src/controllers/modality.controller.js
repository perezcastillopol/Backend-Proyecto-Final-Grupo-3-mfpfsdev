import { selectAllModalities } from '../models/modality.model.js';

export const getAllModalities = async (req, res) => {
  const modalities = await selectAllModalities();
  res.json(modalities);
};

export const getModalityById = async (req, res) =>{
  res.json(req.modality);
}