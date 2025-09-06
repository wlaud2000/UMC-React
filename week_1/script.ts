// 1. HTML 요소 선택
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일이 어떻게 생겼는지 Type을 정의
// 배열 안에 요소들을 렌더링 함.
type Todo = {
    id: number;
    text: string;
};

let todos:Todo[] = [];
let doneTasks:Todo[] = [];

// 3. 할 일 목록 렌더링 하는 함수 정의
const renderTask = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo): void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo): void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

// 4. 할 일 텍스트 입력 처리 함수 (공백 잘라주기)
const getTodoText = (): string => {
    return todoInput.value.trim();
};


// 5. 할 일 추가 처리 함수
const addTodo = (text: string): void => {
    todos.push( { id: Date.now(), text});
    todoInput.value = '';
    renderTask();
};

// 6. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id !== todo.id); 
    doneTasks.push(todo);
    renderTask();
};

// 7. 완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo) : void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    renderTask();
};

// 8. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    const button = document.createElement('button'); 
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    } else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
    }

    button.addEventListener('click', (): void => {
        if (isDone) {
            deleteTodo(todo);
        } else {
            completeTodo(todo);
        }
    });

    li.appendChild(button);
    return li;
};

// <ul id="todo-list" class="render-container__list">
//                     <!-- 리스트 추가 될거임 -->
//                      <!-- <li class="render-container__item">
//                         <p class="render-container__item-text">test</p>
//                         <button class="render-container__item-button">확인</button>
//                      </li> -->
//                 </ul>

// 9. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTask();
