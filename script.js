// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when page loads
    loadTasks();

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim(); // Use input if not passed
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
        }

        // Create a new <li> element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('task-item');

        // Create a "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Add click event to remove task from DOM and localStorage
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
            removeFromLocalStorage(taskText);
        });

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Clear input field after adding
        taskInput.value = "";

        // Save to localStorage if not loading from it
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to remove a task from localStorage
    function removeFromLocalStorage(taskToRemove) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskToRemove);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Event listener to allow Enter key to add task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});