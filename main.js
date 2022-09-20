var btn = document.getElementById("btn");
var task = document.getElementById("task");
var arrTask;
var clearList = document.getElementById("clearList");
if(localStorage.getItem("tasks") == null){
    arrTask = [];
    clearList.classList.add("d-none");
}
else{
arrTask = JSON.parse(localStorage.getItem("tasks"));
clearList.classList.remove("d-none");

}
display();
btn.onclick = function(){
    addTask();
    display();
    clearInput();
    clearList.classList.remove("d-none");
}
function addTask(){
    taskVal = task.value;
    arrTask.push(taskVal);
    localStorage.setItem("tasks",JSON.stringify(arrTask));
    btn.setAttribute("disabled","disabled");
}
function display(){
    var display =  document.getElementById("displayTasks");
    var data = "";
    for(var i = 0;i < arrTask.length; i++){
    data+= `  <div id="" class="mb-2">
   <input type="checkbox" class="form-check-input me-1" name="" id="${i}" onclick="lineTask(${i})">
   <label for="" class="" id="taskDesc${i}">${arrTask[i]}</label>
   <button href="" class="text-decoration-none text-danger border-0 position-absolute del" onclick="delByid(${i})">Delete</button>
   
   </div>`;
    }
    display.innerHTML = data;
}
function clearInput(){
    task.value = "";
}
function lineTask(id){
    document.getElementById(`taskDesc${id}`).classList.add("text-decoration-line-through");
}
clearList.onclick = function() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("tasks");
          arrTask = [];
          display.innerHTML = '';
          display();
          clearList.classList.add("d-none");
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
}
btn.setAttribute("disabled","disabled");
task.onkeydown = function(){
  var reg = /[\S\s]+[\S]+/;
  if(reg.test(task.value)){
    btn.removeAttribute("disabled");
    document.getElementById("alert").classList.replace("d-block","d-none");
  }
  else{
    btn.setAttribute("disabled","disabled");
    document.getElementById("alert").classList.replace("d-none","d-block");
    document.getElementById("alert").innerHTML = "You Should Type Anything";
  }

}
function delByid(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      arrTask.splice(id,1);
     localStorage.setItem("tasks",JSON.stringify(arrTask));
     display();
     if(arrTask.length == 0){
      clearList.classList.add("d-none");
    }
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  
}
