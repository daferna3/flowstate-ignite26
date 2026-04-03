let time = 1500; // 25 minutes
let interval = null;

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  document.getElementById("time").textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;

      if (document.getElementById("soundToggle").checked) {
        let sound = new Audio("audio/bell.mp3");
        sound.volume = 0.5;
        sound.play();
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  time = 1500;
  updateDisplay();
}

updateDisplay();

let tasks = [];

function addTask() {
  let taskText = document.getElementById("taskInput").value;
  let dueDate = document.getElementById("dueDate").value;

  if (!taskText || !dueDate) {
    alert("Please fill out both fields");
    return;
  }

  tasks.push({
    text: taskText,
    due: new Date(dueDate)
  });

  // SORT BY DUE DATE (priority!)
  tasks.sort((a, b) => a.due - b.due);

  saveTasks(); // ADD THIS

  renderTasks();

  document.getElementById("taskInput").value = "";
  document.getElementById("dueDate").value = "";
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    // Checkbox (complete task)
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.onchange = () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    };

    // Task text
    let span = document.createElement("span");
    span.textContent =
      `${task.text} (Due: ${task.due.toLocaleString()})`;

    // Strike-through if completed
    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    // ❌ Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    // 🌈 Urgency colors
    let now = new Date();
    let diff = (task.due - now) / (1000 * 60);

    if (!task.completed) {
      if (diff < 60) span.style.color = "red";
      else if (diff < 180) span.style.color = "orange";
      else span.style.color = "green";
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function toggleFocus() {
  document.body.style.backgroundColor = "#e6f2f1";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved).map(t => ({
      ...t,
      due: new Date(t.due)
    }));
    renderTasks();
  }
}

tasks.push({
  text: taskText,
  due: new Date(dueDate),
  completed: false
});

let soundPlaying = false;

function toggleSound() {
  let audio = document.getElementById("bgSound");

  if (soundPlaying) {
    audio.pause();
  } else {
    audio.play();
  }

  soundPlaying = !soundPlaying;
}

let breathing = false;
let breathInterval;

function startBreathing() {
  let circle = document.getElementById("breathingCircle");

  if (breathing) {
    clearInterval(breathInterval);
    breathing = false;
    return;
  }

  breathing = true;

  breathInterval = setInterval(() => {
    circle.style.transform = "scale(1.5)"; // inhale

    setTimeout(() => {
      circle.style.transform = "scale(1)"; // exhale
    }, 4000);

  }, 8000);
}

function startCalmMode() {
  const colors = ["#dcefe9", "#e6f2f1", "#f0f7f6"];
  let i = 0;

  setInterval(() => {
    document.body.style.backgroundColor = colors[i];
    i = (i + 1) % colors.length;
  }, 5000);
}

loadTasks();