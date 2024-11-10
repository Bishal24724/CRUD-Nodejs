import express from "express";
import connection from "./models/index.js";
import studentRoutes from "./routes/studentRoutes.js";
import session from "express-session";
import flash from "connect-flash";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));


app.use(
  session({
    secret: "bishal",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Make flash messages available globally
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("success");
  res.locals.errorMessage = req.flash("error");
  next();
});

app.use("/", studentRoutes);

app.listen(8000, async () => {
  console.log("The system is running on port 8000");

  try {
    await connection.authenticate();
    await connection.sync();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Unable to connect to database");
  }
});
