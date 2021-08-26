var taskList = [];

function buildTask(task, index) {
  return `
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">${task.title}</h6>
              <p>
                ${task.desc}
              </p>
              <button data-task-index="${index}" onclick="onDelete(this)" class="btn btn-danger">Delete</button>
              <button data-task-index="${index}" onclick="onEdit(this)" class="btn btn-secondary">Edit</button>
            </div>
          </div>
        </div>
  `;
}

function buildAllTasks() {
  var taskListElem = document.getElementById("task-list");

  if (taskList.length === 0) {
    taskListElem.innerHTML = `<p class="text-center">There are no tasks</p>`;
    return;
  }

  var innerHTML = "";
  var i = 0;
  for (var task of taskList) {
    innerHTML += buildTask(task, i);
    i++;
  }

  taskListElem.innerHTML = innerHTML;
}

function onDelete(tag) {
  var index = tag.getAttribute("data-task-index");
  index = parseInt(index);

  taskList.splice(index, 1);

  buildAllTasks();
}

function onEditSave(event) {
  event.preventDefault();
  var index = event.target.getAttribute("data-task-index");
  index = parseInt(index);

  var editInputTitle = document.getElementById("edit-task-input-title");
  var editInputDesc = document.getElementById("edit-task-input-desc");

  var newTitle = editInputTitle.value;
  var newDesc = editInputDesc.value;

  taskList[index] = {
    title: newTitle,
    desc: newDesc
  };

  buildAllTasks();
  window.editModal.hide();
}

function onEdit(tag) {
  var index = tag.getAttribute("data-task-index");
  index = parseInt(index);

  var task = taskList[index];

  var editInputTitle = document.getElementById("edit-task-input-title");
  var editInputDesc = document.getElementById("edit-task-input-desc");

  var editForm = document.getElementById("edit-form");
  editForm.setAttribute("data-task-index", index.toString());

  editForm.onsubmit = onEditSave;

  editInputTitle.value = task.title;
  editInputDesc.value = task.desc;

  window.editModal.show();
}

function onSubmit(event) {
  event.preventDefault();
  var inputTitleBox = document.getElementById("add-task-input-title");
  var inputDescBox = document.getElementById("add-task-input-desc");

  var newTitle = inputTitleBox.value;
  var newDesc = inputDescBox.value;

  taskList.push({ title: newTitle, desc: newDesc });
  buildAllTasks();

  inputTitleBox.value = "";
  inputDescBox.value = "";
  inputTitleBox.focus();
}

function init() {
  window.editModal = new bootstrap.Modal(
    document.getElementById("editForm"),
    {}
  );

  var form = document.getElementById("add-task-form");

  form.addEventListener("submit", onSubmit);
}

window.onload = init;
