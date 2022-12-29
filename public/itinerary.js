const form = document.querySelector("form");
const listContainer = document.querySelector("#list-container");
const day = document.querySelector("#day");
const header = document.querySelector("#header");
const content = document.querySelector("#content");

let errCallback = (err) => console.log(err);

function submitHandler(e) {
  e.preventDefault();

   if (day.value < 1) {
     alert("Do you really want to delete this?");
     return;
   }

  console.log("here");
  let body = {
    day: +day.value,
    header: header.value,
    content: content.value,
  };

  axios.post("http://localhost:4040/api/list/", body).then(() => {
    day.value = "";
    header.value = "";
    content.value = "";
    getList();
  });
}
function deleteList(id){
axios
  .delete(`http://localhost:4040/api/list/${id}`)
  .then(() => getList())
  .catch((err) => console.log(err));
}
function updateList(id){
    
let bodyObj ={
    header: header.value,
    content : content.value
}
axios
  .put(`http://localhost:4040/api/list/${id}`, bodyObj)
  .then((res) => console.log(1, res))
  .catch((err) => console.log(err));
}

function getList() {
  listContainer.innerHTML = "";
  axios
    .get("http://localhost:4040/api/list/")
    .then((res) => {
      let { data: list } = res;
      list.forEach((element) => {
        let listcard = `
 
  <div class="card border-info mb-3" style="max-width: 18rem;">
  <div class="card-header">Day ${element.day}</div>
    <h4 class="card-title">${element.header}</h4>
    <p class="card-text">${element.content}</p>
    <button onclick="deleteList(${element["list_id"]})">Delete</button>
    <button onclick="updateList(${element["list_id"]})">Update</button>
  </div>
    `;
    ;
        listContainer.innerHTML += listcard;
      });
    })
   
}
getList();
form.addEventListener("submit", submitHandler);
