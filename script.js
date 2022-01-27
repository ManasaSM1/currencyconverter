const currency1 = document.querySelector("#from");
const currency2 = document.querySelector("#to");
const amount = document.querySelector("#amount");
const result = document.querySelector(".result");

//Function to load page
function loadContent() {
  fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json`,
    {
      method: "GET",
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      for (const [key, value] of Object.entries(response)) {
        currency1.innerHTML += `<option value="${key}">${value}</option>`;
        currency2.innerHTML += `<option value="${key}">${value}</option>`;
      }
      document
        .querySelector("#btn")
        .setAttribute("onclick", "convertCurrency()");
    })
    .catch((error) => {
      console.log(error);
    });
}

loadContent();

//Function to convert currency
function convertCurrency() {
  const baseCurrency = currency1.value;
  const newCurrency = currency2.value;

  fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency}.json`,
    {
      method: "GET",
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      
      //Iterating over the json data received with the base currency as input
      for (const [key, value] of Object.entries(response)) {
        if (key == baseCurrency) {
          for (const [key1, value1] of Object.entries(value)) {
            if (key1 == newCurrency) {
              console.log(value1);
              result.innerHTML = `${
                amount.value
              } ${baseCurrency.toUpperCase()} = ${(
                amount.value * value1
              ).toFixed(2)} ${newCurrency.toUpperCase()}`;
            }
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}