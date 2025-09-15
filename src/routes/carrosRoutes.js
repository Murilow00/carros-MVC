import express from "express"
import { getAllCarros, getCarrosById, criarNovoCarro,apagarCarro, atulizarCarro } from "../controllers/carrosController.js"

const router = express.Router()

router.get("/", getAllCarros);
router.get("/:id", getCarrosById);
router.post("/", criarNovoCarro);
router.put("/:id", atulizarCarro);
router.delete("/:id", apagarCarro);




export default router;