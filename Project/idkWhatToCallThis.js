// Select elements
console.log("Script loaded!");
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Listen for form submission
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskSubject = document.getElementById('taskSubject').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskPriority = document.getElementById('taskPriority').value;

    const task = {
        name: taskName,
        subject: taskSubject,
        dueDate: taskDueDate,
        priority: taskPriority,
        done: false,
        id: Date.now()
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskForm.reset();
});

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Sort tasks by priority and due date
function sortTasks() {
    const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };

    tasks.sort((a, b) => {
        // 1. Compare done status (incomplete first)
        if(a.done !== b.done) return a.done ? 1 : -1;

        // 2. Compare priority
        if(priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }

        // 3. Compare due dates (earliest first)
        if(a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if(a.dueDate) {
            return -1;
        } else if(b.dueDate) {
            return 1;
        }

        return 0; // If everything else is equal
    });
}

// Render tasks on the page
function renderTasks() {
    console.log("Rendering tasks:", tasks);
    sortTasks(); // Sort before displaying
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.priority.toLowerCase());
        if(task.done) li.classList.add('done');

        li.innerHTML = `
            <span>
                <strong>${task.name}</strong> 
                ${task.subject ? `(${task.subject})` : ''} 
                ${task.dueDate ? `- Due: ${task.dueDate}` : ''}
            </span>
            <div>
                <button class="done-btn">${task.done ? 'Undo' : 'Done'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Toggle done
        li.querySelector('.done-btn').addEventListener('click', () => {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        });

        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}
