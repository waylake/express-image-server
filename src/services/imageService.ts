import { ImageDocument } from "@/interfaces";
import { ImageModel } from "@/models";
import { envConfig } from "@/config";

export class ImageService {
  public async uploadImage(
    imageData: Buffer,
    filename: string,
    contentType: string,
  ): Promise<string> {
    const newImage = new ImageModel({
      filename,
      contentType,
      image: imageData,
    });

    const savedImage = await newImage.save();
    return `/api/${envConfig.API_VERSION}/images/${savedImage._id}`;
  }

  public async getImage(id: string): Promise<ImageDocument | null> {
    return ImageModel.findById(id).exec();
  }

  public async deleteImage(id: string): Promise<boolean> {
    const result = await ImageModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  public async getAllImages(): Promise<ImageDocument[]> {
    return ImageModel.find().exec();
  }
}
