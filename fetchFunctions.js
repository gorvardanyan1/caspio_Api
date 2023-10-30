const fetchCompanyDate = async () => {
  const url = "https://c8cre744.caspio.com/rest/v2/tables/company/records";

  const headers = {
    accept: "application/json",
    Authorization:
      "bearer RcyXxevxiGRAAxyWfdnBPrSJMpgza0FcfA8gnQtx4JuFXTEC_6PbzhI-C8TBVz4NQ_vIJLA1zfcSSo6jswWpciZtI7snLNlB47dWGT6avNG2dNX8lhVGFHOnKHaUSljq-XR2mhCfLBqR4vmXK1mja9kdr1MfFiNxo1_mOowjH-QnXnE39RZu5IglY3gWDhjWqV2coWr23NBLLuju14APa53nqHorHza_WBDkwKGEV34_RX5B0jMu6xsw3qw0XU26nAyKKDeUfnZWxFB5XfZ8po8wIY7ZgDx89j7pabG2D9weEZ4uitabCW4ULfnhqQ1eFPn8xUILX2c3y7gjrS7UtwqNtc1HU2yjq9Y0bEty3vu4CsFR_ZO6CWK1FKlhXJWY",
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const data = await response.json();

  // return data.Result;
  return data.Result;
};

const fetchRolDate = async () => {
  const url = "https://c8cre744.caspio.com/rest/v2/tables/rol_Table/records";

  const headers = {
    accept: "application/json",
    Authorization:
      "bearer RcyXxevxiGRAAxyWfdnBPrSJMpgza0FcfA8gnQtx4JuFXTEC_6PbzhI-C8TBVz4NQ_vIJLA1zfcSSo6jswWpciZtI7snLNlB47dWGT6avNG2dNX8lhVGFHOnKHaUSljq-XR2mhCfLBqR4vmXK1mja9kdr1MfFiNxo1_mOowjH-QnXnE39RZu5IglY3gWDhjWqV2coWr23NBLLuju14APa53nqHorHza_WBDkwKGEV34_RX5B0jMu6xsw3qw0XU26nAyKKDeUfnZWxFB5XfZ8po8wIY7ZgDx89j7pabG2D9weEZ4uitabCW4ULfnhqQ1eFPn8xUILX2c3y7gjrS7UtwqNtc1HU2yjq9Y0bEty3vu4CsFR_ZO6CWK1FKlhXJWY",
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  const data = await response.json();

  return data.Result;
};

async function getToken() {
  if (localStorage.getItem("access_Token")) {
    return `bearer ${JSON.parse(localStorage.getItem("access_Token"))}`;
  }
  const response = await fetch("https://c8cre744.caspio.com/oauth/token", {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: "grant_type=client_credentials&client_id=5e1fd178bff048d5f074d7f45ca5bc1cce83b4836bd9fc4b5d&client_secret=3d9a402840854a61ae2109741f300fd4c3f0340a3b8d56fdea",
  });
  // .then((result) => result.json())
  // .then((res) => {
  //   localStorage.setItem("access_Token", JSON.stringify(res));
  // });

  const { access_token } = await response.json();
  localStorage.setItem("access_Token", JSON.stringify(access_token));
  return `bearer ${access_token}`;
}
