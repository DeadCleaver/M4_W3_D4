const tabBody = document.getElementById("tab-body");
const spinner = document.querySelector(".spinner-border");
const usersEndpoint = "https://jsonplaceholder.typicode.com/users";
let userRecords = [];
const searchField = document.getElementById("search-field");
const selectType = document.getElementById("select-type");
const searchButton = document.getElementById("search-button");

getData();

async function getData(){
    try {
        const res = await fetch(usersEndpoint);
        const json = await res.json();
        console.log(json);
        userRecords.push(...json);
        loadUsers(userRecords);
    } catch(err) {
        console.log(err);
    };
};

function createTabRow({id, name, username, email}) {

    let tabRow = document.createElement("tr");

    let tabNum = document.createElement("th");
    tabNum.classList.add("user-id");
    tabNum.setAttribute("scope", "row");
    tabNum.innerText = id;
    let tabName = document.createElement("td");
    tabName.classList.add("user-name");
    tabName.innerText = name;
    let tabUser = document.createElement("td");
    tabUser.classList.add("user-username");
    tabUser.innerText = username;
    let tabMail = document.createElement("td");
    tabMail.classList.add("user-email");
    tabMail.innerText = email;

    tabRow.appendChild(tabNum);
    tabRow.appendChild(tabName);
    tabRow.appendChild(tabUser);
    tabRow.appendChild(tabMail);
    
    return tabRow;
};

function loadUsers(users) {
    tabBody.innerHTML = "";

    users.forEach(user => {
        tabBody.appendChild(createTabRow(user));
    });
};

searchButton.addEventListener("click", searchUser);

function searchUser() {
    type = selectType.value;
    searchInput = searchField.value.toLowerCase().trim();

    let filteredUsers = userRecords.filter(user => {
        return user[type].toLowerCase().includes(searchInput);
    })
    
    loadUsers(filteredUsers);
};
