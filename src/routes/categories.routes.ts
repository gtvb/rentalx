import { Router } from "express";

import { CreateCategoryController } from "../modules/cars/usecase/createCategory/createCategoryController";
import { ListCategoriesController } from "../modules/cars/usecase/listCategories/listCategoriesController";
import { ImportCategoryController } from "../modules/cars/usecase/importCategory/importCategoryController";

import multer from "multer";

const upload = multer({
  dest: "./tmp",
});

const router = Router();
const createCategory = new CreateCategoryController();
const listCategory = new ListCategoriesController();
const importCategory = new ImportCategoryController();

router.post("/", createCategory.handle);
router.get("/", listCategory.handle);
router.post("/import", upload.single("file"), importCategory.handle);

export default router;
