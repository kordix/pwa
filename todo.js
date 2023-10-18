const todoItemInput = document.getElementById('todoItem');
const todoList = document.getElementById('todoList');

let todosmysql = [];

let db;

const openDB = () => {
    const dbName = 'todoDB';
    const request = window.indexedDB.open(dbName, 1);

    request.onerror = (event) => {
        
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        displayTodos();
    };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('task', 'task', { unique: false });
    };
};

const addTodo = () => {
    const todoText = todoItemInput.value;
    if (todoText === '') return;

    const transaction = db.transaction(['todos'], 'readwrite');
    const objectStore = transaction.objectStore('todos');
    const newTodo = { task: todoText };

    const request = objectStore.add(newTodo);
    request.onsuccess = () => {
        todoItemInput.value = '';
        displayTodos();
    };
};

const displayTodos = () => {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    const objectStore = db.transaction('todos').objectStore('todos');
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const listItem = document.createElement('li');
            listItem.textContent = cursor.value.task;
            todoList.appendChild(listItem);

            cursor.continue();
        }
    };
};


function load(){
    fetch('api/read.php').then((res) => res.json()).then((res) => todosmysql = res)
}

openDB();