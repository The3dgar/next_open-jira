import { db } from '@/api/db';
import { EntryModel, IEntry } from '@/api/models';
import mongoose, { MongooseError } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string } | IEntry;

export default function handlerEntryById(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: 'el id no es valido:' + id });

  switch (req.method) {
    case 'GET':
      return getEntryById(req, res);
    case 'PUT':
      return updateEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: '' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entry = await EntryModel.findById(id);

  if (!entry) {
    await db.disconnect();
    return res.status(404).json({ message: 'Entry not found:' + id });
  }

  try {
    const { description = entry.description, status = entry.status } = req.body;
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    await db.disconnect();

    return res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    let message =
      'message' in error ? error!.message : 'Algo salio mal, revisar el server';
    return res.status(400).json({
      message,
    });
  }
};

const getEntryById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const entry = await EntryModel.findById(id);

  await db.disconnect();
  if (!entry) {
    return res.status(404).json({ message: 'Entry not found:' + id });
  }

  return res.status(200).json(entry);
};

const deleteEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const entry = await EntryModel.findByIdAndDelete(id);

  await db.disconnect();
  if (!entry) {
    return res.status(404).json({ message: 'Entry not found:' + id });
  }  

  return res.status(200).json(entry);
};
