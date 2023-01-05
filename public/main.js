console.log("connected");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const displaySection = document.querySelector("#display-section");
const baseURL = `http://localhost:4040`;

const login = (body) =>
  axios
    .post(`${baseURL}/api/login`, body)
    .then((res) => {
      console.log(res.data);
      let token = res.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", res.data.watch_user_id);
      window.location.href = `/public/planner.html`;
    })
    .catch((err) => console.log(err));

const signUp = (body) =>
  axios
    .post(`${baseURL}/api/signUp`, body)
    .then(async (res) => {
      // console.log("hit signup");
      let token = await res.data.token;
      console.log(res.data);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", res.data.watch_user_id);
      window.location.href = `/public/planner.html`;
    })
    .catch((err) => console.log(err));

const handleAuth = (authType, body) => {
  authType === "SignUp" ? signUp(body) : login(body);
};

//searchForm.addEventListener("submit", handleSearch);

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
  });
});
//end modal code for login/register

//weatherAPI
const API_KEY = ``;
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
function submithandler(e) {
  const search = document.querySelector("#search");
  e.preventDefault();
  console.log(search.value);
  getWeather(search.value);
}

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
  axios.get(url).then((data) => {
    return showWeather(data.data);
  });
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
            <h2>${data.main.temp} &#8457</h2>
            <h4 id="weather"> ${data.weather[0].main} </h4>
        </div>
    `;
  let weatherType = document.getElementById("weather");
  let main = document.querySelector("main");
  console.log(weatherType.textContent);
  if (weatherType.textContent.match("Clear")) {
    main.style.backgroundImage = "url('images/clear.jpg')";
  } else if (weatherType.textContent.match("Drizzle")) {
    main.style.backgroundImage = "url('images/drizzle.jpg')";
  } else if (weatherType.textContent.match("Clouds")) {
    main.style.backgroundImage = "url('images/cloud.jpg')";
  } else if (weatherType.textContent.match("Rain")) {
    main.style.backgroundImage = "url('images/rain.jpg')";
  } else if (weatherType.textContent.match("Snow")) {
    main.style.backgroundImage = "url('images/snow.jpg')";
  } else if (weatherType.textContent.match("Mist")) {
    main.style.backgroundImage = "url('images/haze.jpg')";
  } else if (weatherType.textContent.match("Thunderstorm")) {
    main.style.backgroundImage = "url('images/thunderstorm1.jpg')";
  }
};

submit.addEventListener("click", submithandler);
