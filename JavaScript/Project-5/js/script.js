import { Todo } from "./classes/Todo.js";

// Find the elements


const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");

// createMessage
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`li-${status}`);
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`li-${status}`);
    }, 1000);
};


// todo list generate for user
const createTodo = (newTodo) => {
    const todoElement = document.createElement("li");
    todoElement.Id = newTodo.todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
    <span> ${newTodo.todoValue} </span>
    <span> <button class="btn" id="deleteButton"> 
    <i class="fa-solid fa-trash-can"></i>
    </button> </span>
    `
    todoLists.appendChild(todoElement);

    const deleteButton = document.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo);
};


// get todos from localStorage
const getTodosFromLocalstorage = () => {
    return localStorage.getItem("mytodos")
        ? JSON.parse(localStorage.getItem("mytodos"))
        : [];
};

// deleteTodo Function

const deleteTodo = (event) => {
    const selectTodo = event.target.parentElement.parentElement.parentElement;

    todoLists.removeChild(selectTodo);
    showMessage("todo is deleted", "removed");


    const todoId = selectTodo.id;
    let todos = getTodosFromLocalstorage();
    todos = todos.filter((todo) => todo.todoId == !todoId);
    localStorage.setItem("mytodos", JSON.stringify(todos));
};

// addTodo Function

const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;

    // Unique Id Genarate
    const todoId = Date.now().toString();

    const newTodo = new Todo(todoId, todoValue);

    createTodo(newTodo);

    showMessage("todo is added", "added");


    // add todos to local Storage

    const todos = getTodosFromLocalstorage();
    todos.push({ todoId, todoValue });
    localStorage.setItem("mytodos", JSON.stringify(todos));

    todoInput.value = "";
};

// loadTodos
const loadTodos = () => {
    const todos = getTodosFromLocalstorage();
    todos.map((todo) => createTodo(todo.newTodo));
}

// add listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
