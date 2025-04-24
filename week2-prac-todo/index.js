import { initTodos } from "./data.js";

// 요소 선택 !!!
const input = document.querySelector('.todo-input');
const prioritySelect = document.querySelector('.priority-input');
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
const deleteBtn = document.querySelector('.delete-todo-button');
const completeBtn = document.querySelector('.complete-todo-button');

toggle.addEventListener('click', (e) => {
  e.stopPropagation(); // 상위 이벤트 전파 방지
  dropdown.classList.toggle('active');
});

document.addEventListener('click', () => {
  dropdown.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
  const checkAll = document.querySelector('#check-all');

  checkAll.addEventListener('change', (e) => {
    const isChecked = e.target.checked;

    const rowCheckboxes = document.querySelectorAll('.todo-list input[type="checkbox"]');

    rowCheckboxes.forEach(checkbox => {
      checkbox.checked = isChecked;
    });
  });
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
const clearTodoList = () => {
  todoList.innerHTML = '';
}

const createTodoTr = (todo) => {
  const tr = document.createElement('tr');
  tr.dataset.id = todo.id;
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

  return tr;
}

const renderTodoList = (todos) => {
    clearTodoList();
    todos.forEach((todo) => {
      const newTodoTr = createTodoTr(todo);

      todoList.appendChild(newTodoTr);
  });
}

const addTodo = (todo) => {
  const newTodoTr = createTodoTr(todo);

  todoList.appendChild(newTodoTr);
}

const getCheckedTodoIds = () => {
  const checkedIds = Array.from(
    document.querySelectorAll('.todo-list tr input[type="checkbox"]:checked')
  ).map(checkbox =>
    Number(checkbox.closest('tr').dataset.id)
  );

  return checkedIds;
} 

// 초기화 - 화면에 표시
renderTodoList(todos);

// 필터링 
filterEntire.addEventListener('click', ()=>{
  renderTodoList(todos);
})

filterCompleted.addEventListener('click', ()=>{
  let completedTodos = todos.filter(todo=>
    todo.completed == true
  )
  renderTodoList(completedTodos);
})

filterUncompleted.addEventListener('click', ()=>{
  let uncompletedTodos = todos.filter(todo=>
    todo.completed == false
  )
  renderTodoList(uncompletedTodos);
})

filterPriority1.addEventListener('click', ()=>{
  let priority1Todos = todos.filter(todo=>
    todo.priority == 1
  )
  renderTodoList(priority1Todos);
})

filterPriority2.addEventListener('click', ()=>{
  let priority2Todos = todos.filter(todo=>
    todo.priority == 2
  )
  renderTodoList(priority2Todos);
})

filterPriority3.addEventListener('click', ()=>{
  let priority3Todos = todos.filter(todo=>
    todo.priority == 3
  )
  renderTodoList(priority3Todos);
})

// 추가 버튼 클릭 이벤트
addBtn.addEventListener('click', (e) => {
    const value = input.value;
    const priorityValue = prioritySelect.value;

    if(!value){
        alert('할 일을 입력하세요');
        return;
    }

    if(isNaN(priorityValue)){
      alert('중요도를 선택하세요');
      return;
    }

    let newTodo = {
      id: todos[todos.length - 1].id + 1,
      title: value,
      completed: false,
      priority: Number(priorityValue)
    }
    // 로컬스토리지에 저장
    todos.push(newTodo);
    addTodo(newTodo);

    localStorage.setItem('todos', JSON.stringify(todos));

    // input 값을 초기화
    input.value = '';
});

deleteBtn.addEventListener('click', () => {
  const checkedIds = getCheckedTodoIds();
  const filteredTodos = todos.filter(todo => !checkedIds.includes(todo.id));

  todos.length = 0;
  todos.push(...filteredTodos);
  localStorage.setItem('todos', JSON.stringify(todos));

  renderTodoList(todos);
})

completeBtn.addEventListener('click', () => {
  const checkedIds = getCheckedTodoIds();
  let includeAlreadyCompleted = false;
  
  todos.forEach(todo =>{
    if(checkedIds.includes(todo.id) && todo.completed == true){
      includeAlreadyCompleted = true;
   }})

   if(includeAlreadyCompleted){
    alert('이미 완료된 투두가 포함되어 있습니다');
    window.location.reload();
    return;
   }

   todos.forEach(todo => {
    if (checkedIds.includes(todo.id)) {
      todo.completed = true;
    }
  })

  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodoList(todos);
})