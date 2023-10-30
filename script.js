// function fetchAuth() {
//   fetch("https://c8cre744.caspio.com/oauth/token", {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//     },
//     body: "grant_type=client_credentials&client_id=5e1fd178bff048d5f074d7f45ca5bc1cce83b4836bd9fc4b5d&client_secret=3d9a402840854a61ae2109741f300fd4c3f0340a3b8d56fdea",
//   })
//     .then((result) => result.json())
//     .then((res) => {
//       localStorage.setItem("access_Token", JSON.stringify(res));

//     });
// }

// fetchAuth();
// var persons_Date = [];

const fetchPersonsDate = async () => {
  persons_Date = [];
  const url = "https://c8cre744.caspio.com/rest/v2/views/V_Users/records";
  const headers = {
    accept: "application/json",
    Authorization: await getToken(),
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  const data = await response.json();
  renderTable(data.Result);
};

async function renderTable(persons) {
  persons_Date = persons;
  report_Tbody.innerHTML = "";
  persons.forEach((person) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${person.users_firstName}</td>
    <td>${person.users_LastName}</td>
    <td>${person.users_age}</td>
    <td>${person.users_email}</td>
    <td>${person.company_company_name}</td>
    <td class=change_td>
       <a href="#">
         <img onclick=update_Person("${person.users_user_ID}") id=update_Img src=./images/update.png title=Update>
       </a>
       <img id="remove_Img" onclick=remove_person("${person.users_user_ID}") src=./images/remove.png  title=Remove>
    </td>
    `;
    report_Tbody.appendChild(tr);
  });
}

fetchPersonsDate();

async function remove_person(id) {
  fetch(
    `https://c8cre744.caspio.com/rest/v2/tables/users/records?q.where=user_ID%3D'${id}'`,
    {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: await getToken(),
      },
    }
  )
    .then((res) => res.json())
    .then((response) => {
      fetchPersonsDate();
    });
}
add_Button.addEventListener("click", async function () {
  add_Form.style.visibility = "visible";
  company_Select.innerHTML = await getCompanyOption();
  role_Select.innerHTML = await getRolOption();
});

add_Form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const { firstName, lastName, email, age, password, company, role } = e.target;

  fetch("https://c8cre744.caspio.com/rest/v2/tables/users/records", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: await getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company_ID: company.value,
      rol_ID: role.value,
      firstName: firstName.value,
      LastName: lastName.value,
      age: age.value,
      email: email.value,
      password: password.value,
    }),
  }).then((result) => {
    fetchPersonsDate();
    add_Form.style.visibility = "hidden";
  });
});

close_Img.onclick = function () {
  add_Form.style.visibility = "hidden";
};
// options Function
async function getCompanyOption() {
  var companies_Arr = await fetchCompanyDate();

  var optionGroup = "";
  companies_Arr.forEach((company) => {
    optionGroup += `<option value=${company.company_ID}>${company.company_name}</option>`;
  });
  return optionGroup;
}

async function getRolOption() {
  var role_Arr = await fetchRolDate();
  var optionGroup = "";
  role_Arr.forEach(
    (role) =>
      (optionGroup += `<option value=${role.rol_ID}>${role.rol_Name}</option>`)
  );

  return optionGroup;
}

// update Functions

close_Img_Update.onclick = function () {
  update_Form.style.visibility = "hidden";
};
let id1 = "";
function update_Person(id) {
  id1 = id;
  update_Form.style.visibility = "visible";
  const person = persons_Date.find((elem) => elem.users_user_ID === id);

  update_Form.children[1].children[0].value = person.users_firstName;
  update_Form.children[2].children[0].value = person.users_LastName;
  update_Form.children[3].children[0].value = person.users_age;
}

update_Form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const { firstName, lastName, age } = e.target;
  fetch(
    `https://c8cre744.caspio.com/rest/v2/tables/users/records?q.where=user_ID%3D'${id1}'`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: await getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName.value,
        LastName: lastName.value,
        age: age.value,
      }),
    }
  ).then((res) => {
    fetchPersonsDate();

    update_Form.style.visibility = "hidden";
  });
});
