// start creating server here
import express from "express";
let todos = [];
let counter = 1;

// todo schema:
// {
//     id: Number,
//     title: String,
//     description: String
// }

const app = express();

app.use(express.text())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create/todo", (req, res) => {
  const { title, description } = JSON.parse(req.body)
  todos.push({ id: counter, title: title, description: description });
  counter++;
  return res.status(200).json(todos);
});

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.get("/todos", (req, res) => {
  return res.status(200).json(todos);
});

app.get("/todo", (req, res) => {
  const { id } = req.query;

  const foundTodo = todos.find(todo => todo.id == id);

  if (foundTodo === undefined) {
    return res.status(404).json({ error: "Todo not found" });
  }
  return res.status(200).json(foundTodo);
});

app.delete("/todo", (req, res) => {
  const { id } = req.query;
  
  const todoToDelete = todos.findIndex((todo) => todo.id == id);
  if (todoToDelete === -1) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }
  
  todos.splice(todoToDelete, 1);
  return res.status(200).json({ message: "Todo successfully deleted" });
});

app.listen(3000, () => console.log("App is listening on port 3000"));
