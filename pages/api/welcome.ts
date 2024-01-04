import mongoose, { Document, Schema } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import Magazine from './magazine';

type ResponseData = {
    message: any
}


mongoose.connect(process.env.MONGODB_URI as string);
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
})
mongoose.connection.on("error", (err) => {
    console.log(err);
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const data = await Magazine.find({});
    res.status(200).json({ message: data })
}