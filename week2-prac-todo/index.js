import { initTodos } from "./data.js";

// 요소 선택 !!!
const input = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

// 로컬스토리지에서 가져오기
const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

const todos = [
  ...storedTodos,
  ...initTodos.filter(todo =>
    !storedTodos.some(stored => stored.id === todo.id)
  )
];

localStorage.setItem('todos', JSON.stringify(todos));


// 초기화 - 화면에 표시
todos.forEach((todo) => {
    const tr = document.createElement('tr');
    const tdCheckbox = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;

    tdCheckbox.appendChild(checkbox);

    const tdPriority = document.createElement('td');
    tdPriority.textContent = todo.priority;

    const tdCompleted = document.createElement('td');
    tdCompleted.textContent = todo.completed ? '✅' : '❌';

    const tdTitle = document.createElement('td');
    tdTitle.textContent = todo.title;

    tr.appendChild(tdCheckbox);
    tr.appendChild(tdPriority);
    tr.appendChild(tdCompleted);
    tr.appendChild(tdTitle);

    todoList.appendChild(tr);
});


// 추가 버튼 클릭 이벤트
addBtn.addEventListener('click', (e) => {
  //   const value = input.value;

  //   if(!value){
  //       return;
  //   }
  // // 리스트에 추가
  //   const li = document.createElement('li');
  //   li.textContent = value;
  //   todoList.appendChild(li);

  // // 로컬스토리지에 저장
  //   todos.push(value);
  //   localStorage.setItem('todos', JSON.stringify(todos));

  //   // input 값을 초기화
  //   input.value = '';
});