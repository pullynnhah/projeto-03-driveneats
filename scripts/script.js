function convertToFloat(value) {
  return parseFloat(value.replace(",", "."));
}

function convertToString(value) {
  return value.toFixed(2).replace(".", ",");
}

function processFood(food) {
  const title = food.querySelector("h3").textContent;
  const price = convertToFloat(food.querySelector(".price span").textContent);

  const kind = food.classList[0];
  mealOrder[kind] = {title: title, price: price};
  addChosen(food);
}

function addChosen(food) {
  const chosen = food.parentNode.querySelector(".chosen");
  if (chosen) {
    chosen.classList.remove("chosen");
  }
  food.classList.add("chosen");

  if (isBtnDisabled) {
    checkBtn();
  }
}

function checkBtn() {
  for (const meal of ["dish", "drink", "dessert"]) {
    if (mealOrder[meal] === null) {
      return false;
    }
  }

  orderBtn.disabled = false;
  orderBtn.textContent = "Fazer pedido";
  isBtnDisabled = false;
  return true;
}

function placeOrder() {
  clientData.name = prompt("Qual seu nome?");
  clientData.address = prompt("Qual seu endereço?");
  const url = `https://wa.me/5551986543201?text=${createMessage()}`;
  window.open(url);
}

function createMessage() {
  const message = `
  Olá, gostaria de fazer o pedido:
  - Prato: ${mealOrder.dish.title}
  - Bebida: ${mealOrder.drink.title}
  - Sobremesa: ${mealOrder.dessert.title}
  Total: R$ ${mealCost().toFixed(2)}
  
  Nome: ${clientData.name}
  Endereço: ${clientData.address}
  `;
  return encodeURIComponent(message);
}

function mealCost() {
  let total = 0;
  for (const meal of ["dish", "drink", "dessert"]) {
    total += mealOrder[meal].price;
  }

  return total;
}

function toggleModal() {
  modalContainer.classList.toggle("hidden");

  if (!modalContainer.classList.contains("hidden")) {
    for (const meal of ["dish", "drink", "dessert"]) {
      modalElements[meal].title.textContent = mealOrder[meal].title;
      modalElements[meal].price.textContent = convertToString(mealOrder[meal].price);
    }

    total.textContent = convertToString(mealCost());
  }
}

const orderBtn = document.querySelector(".order-btn");
const modalContainer = document.querySelector(".modal-container");
const total = modalContainer.querySelector(".total span");
const modalElements = {
  dish: {
    title: modalContainer.querySelector(".dish .title"),
    price: modalContainer.querySelector(".dish .price"),
  },
  drink: {
    title: modalContainer.querySelector(".drink .title"),
    price: modalContainer.querySelector(".drink .price"),
  },
  dessert: {
    title: modalContainer.querySelector(".dessert .title"),
    price: modalContainer.querySelector(".dessert .price"),
  },
};

const mealOrder = {
  dish: null,
  drink: null,
  dessert: null,
};

const clientData = {
  name: "Jane Doe",
  address: "Rua dos bobos, 0",
};

let isBtnDisabled = true;
