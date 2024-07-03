import { Request, Response } from "express";
import { ImageService } from "@/services";

const imageService = new ImageService();

export class ImageController {
  public async uploadImage(req: Request, res: Response): Promise<void> {
    const image = req.file;
    if (!image) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const imageUrl = await imageService.uploadImage(
      image.buffer,
      image.originalname,
      image.mimetype,
    );

    res.json({ imageUrl });
  }

  public async getImage(req: Request, res: Response): Promise<void> {
    const image = await imageService.getImage(req.params.id);
    if (image) {
      res.contentType(image.contentType);
      res.send(image.image);
    } else {
      res.status(404).send("Image not found");
    }
  }

  public async deleteImage(req: Request, res: Response): Promise<void> {
    const success = await imageService.deleteImage(req.params.id);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Image not found");
    }
  }

  public async getAllImages(req: Request, res: Response): Promise<void> {
    const images = await imageService.getAllImages();
    res.json(images);
  }
}
