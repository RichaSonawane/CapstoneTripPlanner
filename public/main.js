console.log("connected");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const displaySection = document.querySelector("#display-section");
const baseURL = `http://localhost:4040`;

// const addToList = (movieObj) => {
//   console.log(movieObj);
//   axios
//     .post(`${baseURL}/api/list`, { movieObj })
//     .then((res) => alert(res.data))
//     .catch((err) => console.log(err));
// };

const handleSearch = (e) => {
  e.preventDefault();
  const userInput = searchInput.value;
  displaySection.innerHTML = "";
  searchInput.value = ``;
  axios
    .get(`${baseURL}/api/query/?search=${userInput}`)
    .then((res) => {
      // console.log(res.data);
      res.data.results.map((result) => {
        let displayDiv = document.createElement("div");
        displayDiv.classList.add("card");
        displayDiv.style.width = "18rem";
        let resultObj = JSON.stringify({ ...result }).replace(
          /[\/\(\)\']/g,
          "&apos;"
        );
        // console.log(resultObj);
        displayDiv.innerHTML = `
          <img src='https://image.tmdb.org/t/p/w500/${result.poster_path}'/>
          <div class="card-body bg-light">
          <h5 class="card-title">${result.title}</h5>
          <p class="card-text overflow-hidden">${result.overview}</p>
          <a href="#" onclick='addToList(${resultObj})' class="btn btn-primary">Add to list</a>
          </div>
          `;
        displaySection.appendChild(displayDiv);
      });
    })
    .catch((err) => console.log(err));
};

const getTrending = () => {
  axios.get(`${baseURL}/api/trending`).then().catch();
};
const getPopular = () => {
  axios.get(`${baseURL}/api/popular`).then().catch();
};

const login = (body) =>
  axios
    .post(`${baseURL}/api/login`, body)
    .then((res) => {
      console.log("hit login");
      sessionStorage.setItem("user", JSON.stringify(res.data));
      window.location.href;
    })
    .catch((err) => console.log(err));

const signUp = (body) =>
  axios
    .post(`${baseURL}/api/signUp`, body)
    .then((res) => {
      sessionStorage.setItem("user", JSON.stringify(res.data));
      window.location.reload();
    })
    .catch((err) => console.log(err));

const handleAuth = (authType, body) => {
  authType === "SignUp" ? signUp(body) : login(body);
};

searchForm.addEventListener("submit", handleSearch);

//bootstrap modal for login/register starts
var authModal = document.getElementById("signin");
authModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  var recipient = button.getAttribute("data-bs-whatever");
  var modalTitle = authModal.querySelector(".modal-title");
  // var submitBtn = authModal.querySelector("#formSubmit");
  var optionalMsg = document.querySelector("#optionalMsg");
  var authSubmit = document.querySelector("#authSubmit");
  const email = document.querySelector("#floatingInput");
  const password = document.querySelector("#floatingPassword");
  // var modalBodyInput = exampleModal.querySelector('.modal-body input')

  modalTitle.textContent = button.textContent;
  // submitBtn.textContent = button.textContent;
  // console.log(modalTitle.textContent.trim());
  modalTitle.textContent.trim() === "Login"
    ? (optionalMsg.style.display = "none")
    : (optionalMsg.style.display = "block");
  authSubmit.textContent = button.textContent;
  authSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const body = { email: email.value, password: password.value };
    console.log(authSubmit.textContent);
    authSubmit.textContent.trim() === "Login"
      ? handleAuth("Login", body)
      : handleAuth("SignUp", body);
      window.location.reload();
  });
});
//end modal code for login/register

//weatherAPI
const API_KEY = '';
const form = document.querySelector("searchWeather");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const submit = document.querySelector("#submitbtn");
// const API = `https://api.openweathermap.org/data/2.5/weather?
// q=${city}&appid=${API_KEY}&units=metric`
// const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
// const getWeather1 = async (city) => {
//   weather.innerHTML = `<h2> Loading... <h2>`;
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return showWeather(data);
// };
function submithandler(e){
const search = document.querySelector("#search");
e.preventDefault();
console.log(search.value);
getWeather(search.value)
}

function getWeather(city){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  axios.get(url).then((data)=>{
    return showWeather(data.data)})
}

const showWeather = (data) => {
  if (data.cod == "404") {
    weather.innerHTML = `<h2> City Not Found <h2>`;
    return;
  }
  weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4> ${data.weather[0].main} </h4>
        </div>
    `;
};
submit.addEventListener("click", submithandler);

// form.addEventListener("submit", function (event) {
//   getWeather(search.value);
//   event.preventDefault();
// });