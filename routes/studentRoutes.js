import express from "express";
import studentController from "../controller/studentController.js";

const router = express.Router();

const studentcontrollers = new studentController();

router.get("/", studentcontrollers.addStudent);
router.post("/add", studentcontrollers.add);
router.get("/students", studentcontrollers.getAllStudents);

//edit
router.get("/edit/:id", studentcontrollers.editStudent);
router.post("/update/:id", studentcontrollers.updateStudent);

router.post("/delete/:id", studentcontrollers.deleteStudent);
export default router;
