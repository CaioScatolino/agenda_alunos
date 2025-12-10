import express from "express";
import fs from "fs/promises";
import path from "path";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../agenda.json");
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" });
    const agendaData = JSON.parse(fileContent);
    res.json(agendaData);
  } catch (error) {
    console.error("Failed to read or parse agenda.json:", error);
  }
});

router.get("/:data", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../agenda.json");
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" });
    const agendaData = JSON.parse(fileContent);
    const filteredData = agendaData.filter(
      (item: any) => item.data === req.params.data
    );
    res.json(filteredData);
  } catch (error) {
    console.error("Failed to read or parse agenda.json:", error);
  }
});

export default router;
