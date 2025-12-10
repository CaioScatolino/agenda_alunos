import express from "express";
import fs from "fs/promises";
import path from "path";

// Cria uma nova instância do roteador Express
const router = express.Router();

// Array para armazenar os dados da agenda
let agendaData: any[] = [];

// Define o caminho para o arquivo JSON da agenda
const agendaFilePath = path.join(__dirname, "./../data/agenda.json");

// Carrega os dados da agenda do arquivo JSON ao iniciar o servidor
fs.readFile(agendaFilePath, { encoding: "utf8" })
  .then((fileContent) => {
    agendaData = JSON.parse(fileContent); // Analisa o conteúdo JSON e armazena em agendaData
    console.log("Agenda data loaded successfully.");
  })
  .catch((error) => {
    console.error("Failed to load initial agenda.json:", error); // Loga erro se o carregamento falhar
  });

// Rota GET para obter todos os dados da agenda
router.get("/", (req, res) => {
  res.json(agendaData); // Retorna todos os dados da agenda como JSON
});

// Rota GET para filtrar dados da agenda por um campo 'data' específico
router.get("/data/:data", (req, res) => {
  const filteredData = agendaData.filter(
    (item: any) => item.data === req.params.data
  );
  res.json(filteredData); // Retorna os itens filtrados
});

// Rota GET para filtrar dados da agenda por um campo 'materia' específico
router.get("/materia/:materia", (req, res) => {
  const filteredData = agendaData.filter(
    (item: any) => item.materia === req.params.materia
  );
  res.json(filteredData); // Retorna os itens filtrados
});

// Rota POST para adicionar um novo item à agenda
router.post("/", async (req, res) => {
  const newItem = req.body;
  const allowedFields = ["materia", "data", "hora", "aluno"];
  const receivedFields = Object.keys(newItem);

  const invalidFields = receivedFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: "Um ou mais parâmetros inválidos foram fornecidos.",
      invalidFields: invalidFields,
      allowedFields: allowedFields,
    });
  }

  agendaData.push(newItem);

  try {
    await fs.writeFile(agendaFilePath, JSON.stringify(agendaData, null, 2), {
      encoding: "utf8",
    });
    res
      .status(201)
      .json({ message: "Item adicionado com sucesso!", item: newItem });
  } catch (error) {
    console.error("Erro ao escrever no arquivo agenda.json:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao adicionar o item." });
  }
});

// Exporta o roteador para ser usado em outras partes da aplicação
export default router;
