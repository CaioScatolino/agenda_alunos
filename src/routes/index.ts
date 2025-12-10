import express from "express";
import agendaRouter from "./agenda";

const router = express.Router();

router.use("/agenda", agendaRouter);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

export default router;
