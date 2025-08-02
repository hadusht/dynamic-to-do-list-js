// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Select essential DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim input value

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('task-item'); // Add class for styling

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // Add class for styling

        // Add click event to remove the task
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        // Append the button to the task item
        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Clear the input field after adding
        taskInput.value = "";
    }

    // 👉 Add an event listener to addButton to trigger addTask
    addButton.addEventListener('click', addTask);

    // 👉 Add an event listener to allow "Enter" key to trigger addTask
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});