'use strict';
const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

// checks local storage
const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', e => {
  e.preventDefault();

  addTodo(); // function call
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text; // sets the content of todo
  }

  if (todoText) {
    const todoEl = document.createElement('li');

    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.innerText = todoText;

    // adds or removes the completed class
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    // removes the element from the page
    todoEl.addEventListener('contextmenu', e => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosUL.prepend(todoEl);

    input.value = '';

    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('li');

  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });

    localStorage.setItem('todos', JSON.stringify(todos));
  });
}

// localStorage.setIntem("name", JSON.stringify(obj));

// JSON.parse(localStorage.getItem(obj))
