import { initTodos } from "./data.js";

// 요소 선택 !!!
const input = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
const dropdown = document.querySelector('.dropdown');
const toggle = document.querySelector('.dropdown-toggle');
const filterEntire = document.querySelector('#filter-button-entire');
const filterCompleted = document.querySelector('#filter-button-completed');
const filterUncompleted = document.querySelector('#filter-button-uncompleted');
const filterPriority1 = document.querySelector('#filter-button-priority-1');
const filterPriority2 = document.querySelector('#filter-button-priority-2');
const filterPriority3 = document.querySelector('#filter-button-priority-3');

toggle.addEventListener('click', (e) => {
  e.stopPropagation(); // 상위 이벤트 전파 방지
  dropdown.classList.toggle('active');
});

document.addEventListener('click', () => {
  dropdown.classList.remove('active');
});


// 로컬스토리지에서 가져오기
const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

const todos = [
  ...storedTodos,
  ...initTodos.filter(todo =>
    !storedTodos.some(stored => stored.id === todo.id)
  )
];

localStorage.setItem('todos', JSON.stringify(todos));

// todos를 그리는 함수
const renderTodoList = (todos) => {
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
}


// 초기화 - 화면에 표시
renderTodoList(todos);

// 필터링 
const clearTodoList = () => {
  todoList.innerHTML = '';
}

filterEntire.addEventListener('click', ()=>{
  clearTodoList();
  renderTodoList(todos);
})

filterCompleted.addEventListener('click', ()=>{
  clearTodoList();
  let completedTodos = todos.filter(todo=>
    todo.completed == true
  )
  renderTodoList(completedTodos);
})

filterUncompleted.addEventListener('click', ()=>{
  clearTodoList();
  let uncompletedTodos = todos.filter(todo=>
    todo.completed == false
  )
  renderTodoList(uncompletedTodos);
})

filterPriority1.addEventListener('click', ()=>{
  clearTodoList();
  let priority1Todos = todos.filter(todo=>
    todo.priority == 1
  )
  renderTodoList(priority1Todos);
})

filterPriority2.addEventListener('click', ()=>{
  clearTodoList();
  let priority2Todos = todos.filter(todo=>
    todo.priority == 2
  )
  renderTodoList(priority2Todos);
})

filterPriority3.addEventListener('click', ()=>{
  clearTodoList();
  let priority3Todos = todos.filter(todo=>
    todo.priority == 3
  )
  renderTodoList(priority3Todos);
})

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