import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
type PropsType = {
  todo: TodoItemType;
  deleteTodo: (id: TodoItemType["id"]) => void;
  completeTodo: (id: TodoItemType["id"]) => void;
  editTodo: (id: TodoItemType["id"], newTitle: TodoItemType["title"]) => void;
};

const TodoItem = ({ todo, deleteTodo, completeTodo, editTodo }: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);

  return (
    <Paper sx={{ padding: "1rem" }} variant="outlined">
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            sx={{ marginRight: "auto" }}
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && todoTitle !== "") {
                editTodo(todo.id, todoTitle);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography
            marginRight={"auto"}
            sx={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeTodo(todo.id)}
        />
        <Button
          onClick={() => deleteTodo(todo.id)}
          sx={{ color: "black", opacity: 0.5 }}
        >
          <Delete />
        </Button>
        <Button
          sx={{
            color: "black",
            opacity: 0.5,
            textTransform: "inherit",
            fontWeight: "600",
          }}
          onClick={() => {
            setEditActive((prev) => !prev);
            editTodo(todo.id, todoTitle);
          }}
        >
          {editActive ? "Done" : "Edit"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
