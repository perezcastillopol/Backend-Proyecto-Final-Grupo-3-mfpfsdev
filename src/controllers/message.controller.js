import { insertMsg, selectMsgByTrip, selectMsgById } from '../models/message.model.js';

export const getAllMessageByTrip = async (req, res) => {
  const {tripId} = req.params;
  const msgs = await selectMsgByTrip(tripId);
  if (!msgs || msgs.length === 0) {
    return res.status(404).json({message: 'No messages found for this trip'});
  }
  res.json(msgs);
};

export const createMessage = async(req, res) =>{
  const { insertId } = await insertMsg(req.body);
  const message = await selectMsgById(insertId);
  res.json(message);
}