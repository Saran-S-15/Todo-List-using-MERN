import express from 'express';
import { create_List, delete_list, edit_list, fetch_lists } from '../controllers/Todo.controller.js';

const router = express.Router();

router.post("/create", create_List);

router.get("/fetch", fetch_lists);

router.delete("/delete/:id", delete_list);

router.put("/edit/:id", edit_list);

export default router;