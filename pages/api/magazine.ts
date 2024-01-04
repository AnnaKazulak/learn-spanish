import mongoose, { Schema, Document} from "mongoose";

// Define the Post interface for TypeScript
interface IMagazine extends Document {
    message: string;
}

// Define the Magazine schema
const magazineSchema = new Schema<IMagazine>({
    message: {
        type: String,
        required: true,
    }
});

// Create the Post model using the schema
const Magazine = mongoose.model<IMagazine>('magazine', magazineSchema);

export default Magazine;