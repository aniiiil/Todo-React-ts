import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getTodo, saveTodo } from "./utils/saveFeature";

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodo());
  const [title, setTitle] = useState<TodoItemType["title"]>("");

  const addTodo = (): void => {
    const newTodo: TodoItemType = {
      id: String(Math.random() * 1000),
      title,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const completeTodoHandler = (id: TodoItemType["id"]): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodoHandler = (id: TodoItemType["id"]): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const editTodoHandler = (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  useEffect(() => {
    saveTodo(todos);
  }, [todos]);

  return (
    <Container maxWidth="md" sx={{ height: "100vh", marginTop: "35px" }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography sx={{ fontSize: "30px", fontWeight: "400" }}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>

      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") addTodo();
        }}
        fullWidth
        required
        label={"Add Task"}
        sx={{ margin: "1rem 0" }}
      />
      <Button
        onClick={addTodo}
        sx={{ margin: "1rem auto", width: "155px" }}
        variant="contained"
        disabled={title === ""}
      >
        Add
      </Button>
      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <TodoItem
            completeTodo={completeTodoHandler}
            deleteTodo={deleteTodoHandler}
            editTodo={editTodoHandler}
            key={i.id}
            todo={i}
          />
        ))}
      </Stack>
    </Container>
  );
}

export default App;
