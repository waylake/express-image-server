import { Router } from "express";
import multer from "multer";
import { ImageController } from "@/controllers";
import { cacheMiddleware } from "@/middlewares";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const imageController = new ImageController();

router.post("/upload", upload.single("image"), (req, res) =>
  imageController.uploadImage(req, res),
);
router.get("/:id", cacheMiddleware(600), (req, res) =>
  imageController.getImage(req, res),
);
router.delete("/:id", (req, res) => imageController.deleteImage(req, res));
router.get("/", cacheMiddleware(600), (req, res) =>
  imageController.getAllImages(req, res),
);

export default router;
