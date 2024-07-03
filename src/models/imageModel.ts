import mongoose, { Schema, Document } from "mongoose";
import { ImageDocument } from "@/interfaces";

const ImageSchema: Schema = new Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  image: { type: Buffer, required: true },
});

export const ImageModel = mongoose.model<ImageDocument & Document>(
  "Image",
  ImageSchema,
);
