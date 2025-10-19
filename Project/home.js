// Load tasks from localStorage
const homeTaskList = document.getElementById('homeTaskList');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display tasks
function displayHomeTasks() {
    homeTaskList.innerHTML = '';

    if (tasks.length === 0) {
        homeTaskList.innerHTML = '<li>No tasks yet. Go add some in the Task page!</li>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.priority.toLowerCase());
        if (task.done) li.classList.add('done');

        li.innerHTML = `
            <span>
                <strong>${task.name}</strong> 
                ${task.subject ? `(${task.subject})` : ''} 
                ${task.dueDate ? `- Due: ${task.dueDate}` : ''}
            </span>
            <span style="font-size:14px; opacity:0.8;">
                ${task.done ? '✅ Done' : '⏳ In Progress'}
            </span>
        `;

        homeTaskList.appendChild(li);
    });
}

displayHomeTasks();
