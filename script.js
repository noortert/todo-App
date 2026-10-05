let tasks = [

];


const taskList = document.querySelector("#task-list");
const addForm = document.querySelector("#add-form");
const newTaskInput = document.querySelector("#new-task");
const statusEl = document.querySelector("#status");

function renderList() {
  taskList.innerHTML = "";

  const remainingTasks = tasks.filter(task => !task.done).length;
  //console.log("tasks array:", tasks, "remaining tasks:", remainingTasks);//
  statusEl.textContent = remainingTasks === 0
    ? "All done"
    : `${remainingTasks} to do`;

  statusEl.style.color = (remainingTasks === 0 && tasks.length > 0)
    ? "#5a7a4f"
    : "";

  
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove"; 


    li.classList.add("task");
    input.type = "checkbox";
    span.classList.add("task-text");
    span.textContent = task.text;


    input.checked = task.done;
    if (task.done) {
      input.checked = true;
      li.classList.add("done");
    }

    input.addEventListener("change", function(){
      task.done= input.checked;

      if (task.done) {
        li.classList.add("done");
      } else {
        li.classList.remove("done");
      }
      renderList();
    });

    label.appendChild(input);
    label.appendChild(span);
    li.appendChild(label);
    taskList.appendChild(li);
    li.appendChild(removeButton);
    
    removeButton.addEventListener("click", function() {
      tasks = tasks.filter(function (t) {
        return t !== task;
      });
      renderList();

   });
 });
}

   
    addForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const userText = newTaskInput.value.trim();

      if (userText !== "") {
        const newTask = {
         text: userText,
         done: false
    };


    tasks.push(newTask);

    renderList();
    newTaskInput.value = "";
   } 
  });


    renderList();
