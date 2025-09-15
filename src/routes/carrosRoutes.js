import express from "express"
import { getAllCarros, getCarroById, criarCarro, deletarCarro, atualizarCarro } from "../controllers/carrosController.js"

const router = express.Router()

router.get("/", getAllCarros);
router.get("/:id", getCarroById);
router.post("/", criarCarro);
router.put("/:id", atualizarCarro);
router.delete("/:id", deletarCarro);




export default router;