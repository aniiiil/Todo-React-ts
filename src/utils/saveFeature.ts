export const saveTodo=(todos:TodoItemType[]):void => {
localStorage.setItem('myTodos', JSON.stringify(todos));
}

export const getTodo=():TodoItemType[] => {
   const todos= localStorage.getItem('myTodos');
  return todos?JSON.parse(todos):[]
    }