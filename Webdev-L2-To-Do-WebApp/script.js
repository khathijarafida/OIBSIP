const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function showTasks() {
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    pendingCount.textContent = `${pendingTasks.length} pending`;
    completedCount.textContent = `${completedTasks.length} completed`;

    if (pendingTasks.length === 0) {
        pendingList.innerHTML = '<p class="empty">🎉 No pending tasks!</p>';
    }

    if (completedTasks.length === 0) {
        completedList.innerHTML = '<p class="empty">📖 No completed tasks yet.</p>';
    }

    pendingTasks.forEach(task => displayTask(task, pendingList));
    completedTasks.forEach(task => displayTask(task, completedList));
}

function displayTask(task, list) {
    const taskDiv = document.createElement("div");
    taskDiv.className = task.completed ? "task completed" : "task";

    const text = document.createElement("p");
    text.className = "task-text";
    text.textContent = task.text;

    const time = document.createElement("p");
    time.className = "time";
    time.textContent = task.completed
        ? `Completed: ${task.completedAt}`
        : `Added: ${task.createdAt}`;

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    if (!task.completed) {
        const editButton = document.createElement("button");
        editButton.className = "edit";
        editButton.textContent = "Edit";

        editButton.onclick = function () {
            editTask(task.id, taskDiv);
        };

        const completeButton = document.createElement("button");
        completeButton.className = "complete";
        completeButton.textContent = "Complete";

        completeButton.onclick = function () {
            completeTask(task.id);
        };

        buttons.appendChild(editButton);
        buttons.appendChild(completeButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function () {
        deleteTask(task.id);
    };

    buttons.appendChild(deleteButton);

    taskDiv.appendChild(text);
    taskDiv.appendChild(time);
    taskDiv.appendChild(buttons);

    list.appendChild(taskDiv);
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a study task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    tasks.push(task);

    saveTasks();
    showTasks();

    taskInput.value = "";
}

function completeTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = true;
            task.completedAt = new Date().toLocaleString();
        }

        return task;
    });

    saveTasks();
    showTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    showTasks();
}

function editTask(id, taskDiv) {
    const task = tasks.find(task => task.id === id);

    const input = document.createElement("input");
    input.className = "edit-input";
    input.value = task.text;

    const saveButton = document.createElement("button");
    saveButton.className = "save";
    saveButton.textContent = "Save";

    saveButton.onclick = function () {
        const newText = input.value.trim();

        if (newText !== "") {
            task.text = newText;
            saveTasks();
            showTasks();
        }
    };

    taskDiv.innerHTML = "";
    taskDiv.appendChild(input);
    taskDiv.appendChild(saveButton);

    input.focus();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

showTasks();