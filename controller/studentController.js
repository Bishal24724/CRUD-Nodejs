import { Student } from "../models/studentModel.js";

export default class studentController {
  async getAllStudents(req, res) {
    const student = await Student.findAll();
    const message = req.flash("success"); 
    req.session.message = null;
    res.render("student", { student, message });
  }

  async addStudent(req, res) {
    res.render("index");
  }
  async add(req, res) {
    const { name, age, email, address } = req.body;
    try {
      await Student.create({ name, age, email, address });

      req.flash("success", "Student record has been successfully created.");
      res.redirect("/students");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errorMessages = error.errors.map((err) => err.message);
        return res.render("index", { errorMessages });
      }
      res.status(500).send("Server error.");
    }
  }

  async editStudent(req, res) {
    const id = req.params.id;
    try {
      const student = await Student.findOne({ where: { id } });
      if (student) {
        res.render("editStudent", { student });
      } else {
        res.status(404).send("student not found");
      }
    } catch (err) {
      res.status(500).send("Error");
    }
  }
  async updateStudent(req, res) {
    const { id } = req.params;
    const { name, age, email, address } = req.body;
    try {
      const student = await Student.findByPk(id);
      if (student) {
        await student.update({ name, age, email, address });
        req.flash("success", "Student record has been successfully updated.");
        res.redirect("/students");
      } else {
        res.status(404).send("student record not found");
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errorMessages = error.errors.map((err) => err.message);
        return res.render("index", { errorMessages });
      }
      res.status(500).send("Error while updating student data");
    }
  }

  async deleteStudent(req, res) {
    const { id } = req.params;
    try {
      const student = await Student.findByPk(id);
      //  const message= "Data deleted successfully";
      
      if (student) {
        await student.destroy();
        req.flash("success", "Student record has been successfully deleted.");
        res.redirect("/students");
      } else {
        res.status(404).send("student not found");
      }
    } catch (error) {
      res.status(500).send("Error while deleting student");
    }
  }
}
