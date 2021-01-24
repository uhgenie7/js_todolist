
    const pendingList = document.getElementById("js-pending"),
    finishedList = document.getElementById("js-finished"),
    form = document.getElementById("js-form"),
    input = form.querySelector("input");
  
  const PENDING = "PENDING";
  const FINISHED = "FINISHED";
  
  let pendingTasks, finishedTasks;
  
  function getTaskObject(text) {
    return {
      id: String(Date.now()),
      text
    };
  }
  
  function savePendingTask(task) {
    pendingTasks.push(task);
  }
  
  function findInFinished(taskId) {
    return finishedTasks.find(function(task) {
      return task.id === taskId;
    });
  }
  
  function findInPending(taskId) {
    return pendingTasks.find(function(task) {
      return task.id === taskId;
    });
  }
  
  function removeFromPending(taskId) {
    pendingTasks = pendingTasks.filter(function(task) {
      return task.id !== taskId;
    });
  }
  
  function removeFromFinished(taskId) {
    finishedTasks = finishedTasks.filter(function(task) {
      return task.id !== taskId;
    });
  }
  
  function addToFinished(task) {
    finishedTasks.push(task);
  }
  
  function addToPending(task) {
    pendingTasks.push(task);
  }
  
  function deleteTask(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromFinished(li.id);
    removeFromPending(li.id);
    saveState();
  }
  
  function handleFinishClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInPending(li.id);
    removeFromPending(li.id);
    addToFinished(task);
    paintFinishedTask(task);
    saveState();
  }
  
  function handleBackClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInFinished(li.id);
    removeFromFinished(li.id);
    addToPending(task);
    paintPendingTask(task);
    saveState();
  }
  
  function buildGenericLi(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    span.innerText = task.text;
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", deleteTask);
    li.append(span, deleteBtn);
    li.id = task.id;
    return li;
  }
  
  function paintPendingTask(task) {
    const genericLi = buildGenericLi(task);
    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✅";
    completeBtn.addEventListener("click", handleFinishClick);
    genericLi.append(completeBtn);
    pendingList.append(genericLi);
  }
  
  function paintFinishedTask(task) {
    const genericLi = buildGenericLi(task);
    const backBtn = document.createElement("button");
    backBtn.innerText = "⏪";
    backBtn.addEventListener("click", handleBackClick);
    genericLi.append(backBtn);
    finishedList.append(genericLi);
  }
  
  function saveState() {
    localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
    localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
  }
  
  function loadState() {
    pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
    finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
  }
  
  function restoreState() {
    pendingTasks.forEach(function(task) {
      paintPendingTask(task);
    });
    finishedTasks.forEach(function(task) {
      paintFinishedTask(task);
    });
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    const taskObj = getTaskObject(input.value);
    input.value = "";
    paintPendingTask(taskObj);
    savePendingTask(taskObj);
    saveState();
  }
  
  function init() {
    form.addEventListener("submit", handleFormSubmit);
    loadState();
    restoreState();
  }
  init();

// let toDos = [];

// function saveToDos() {
//     localStorage.setItem(PENDING, JSON.stringify(toDos));
// }

// function deleteToDo(event) {
//     const btn = event.target;
//     const li = btn.parentNode;
//     pendingList.removeChild(li);
    
//     const cleanToDos = toDos.filter(function (toDo) {
//         return toDo.id !== parseInt(li.id);
//     });
//     toDos = cleanToDos;
//     saveToDos();
// }

// function paintToDo(text) {
//     const li = document.createElement("li");
//     const delBtn = document.createElement("button");
//     delBtn.innerText = "✖";
//     delBtn.addEventListener("click", deleteToDo);
//     const span = document.createElement("span");
//     const newId = toDos.length + 1
//     span.innerText = text
//     li.appendChild(span);
//     li.appendChild(delBtn);
//     li.id = newId;
//     pendingList.appendChild(li);
//     const toDoObj = {
//         text: text,
//         id: newId
//     };
//     toDos.push(toDoObj);
//     saveToDos();
// }

// function handleSubmit(event) {
//     event.preventDefault();
//     const currentValue = toDoInput.value;
//     paintToDo(currentValue);
//     toDoInput.value = "";
// }

// function loadToDos() {
//     const loadedTodos = localStorage.getItem(PENDING);
//     if (loadedTodos !== null) {
//         const parsedToDos = JSON.parse(loadedTodos);
//         parsedToDos.forEach(function (toDo) {
//             paintToDo(toDo.text);
//         })
//     }
// }

// function restoreState() {
//     pendingTasks.forEach(function (task) {
//         paintPendingTask(task);
//     });
//     finishedTasks.forEach(function (task) {
//         paintFinishedTask(task);
//     });
// }


// function init() {
//     loadToDos();
//     // restoreState();
//     toDoForm.addEventListener("submit", handleSubmit);
// }   

// init();



