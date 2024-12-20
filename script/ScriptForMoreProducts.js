// Скрипт для страницы товаров
let basketProducts = [];

// Получаем массив товаров из  localStorage
function loadFromLocalStorage() {
  const jsonStringFromStorage = localStorage.getItem("products");
  if (jsonStringFromStorage) {
    try {
      basketProducts = JSON.parse(jsonStringFromStorage);
       console.log("Корзина загружена из localStorage:", basketProducts);
    } catch (error) {
      console.error("Ошибка при парсинге данных из localStorage:", error);
       basketProducts = [];
    }
  }
}
loadFromLocalStorage();

// Сохранение корзины в  localStorage
function saveToLocalStorage() {
    const jsonString = JSON.stringify(basketProducts);
    localStorage.setItem("products", jsonString);
}

// Объекты с товарами
const products = [
  { name: 'Пшеница Тимирязевка 150', price: 11000, count: 0, total: 0, idProduct: 'Product1'},
  { name: 'Пшеница Ермак', price: 11000, count: 0, total: 0, idProduct: 'Product2' },
  { name: 'Пшеница Омская Яровая', price: 11000, count: 0, total: 0, idProduct: 'Product3' },
  { name: 'Рожь Прибалтийская', price: 7000, count: 0, total: 0, idProduct: 'Product4' },
  { name: 'Рожь КВС Аллокатор', price: 7000, count: 0, total: 0, idProduct: 'Product5' },
  { name: 'Рожь КВС Н 5009', price: 7000, count: 0, total: 0, idProduct: 'Product6' },
  { name: 'Овёс Дебютный', price: 8000, count: 0, total: 0, idProduct: 'Product7' },
  { name: 'Овёс АЗИЛЬ', price: 8000, count: 0, total: 0, idProduct: 'Product8' },
  { name: 'Овёс Борец', price: 8000, count: 0, total: 0, idProduct: 'Product9' },
];

function addProductToList(productName) {
  // Находим товар по имени
  const productIndex = basketProducts.findIndex(item => item.name === productName);

  if (productIndex !== -1) {
    basketProducts[productIndex].count++;
  } else {
    // Находим товар в списке всех продуктов
    const productToAdd = products.find(item => item.name === productName);
    if (productToAdd) {
      // Создаём копию, чтобы не изменять оригинальный массив
      basketProducts.push({...productToAdd, count: 1, total: productToAdd.price}); 
    } else {
      console.error("Товар не найден в списке!");
      return;
    }
  }

  // Обновляем total
  basketProducts.forEach(item => item.total = item.count * item.price);

  saveToLocalStorage();
  console.log(basketProducts);
}

function saveToLocalStorage() {
  const jsonString = JSON.stringify(basketProducts);
  localStorage.setItem("products", jsonString);
}

function loadFromLocalStorage() {
  const jsonString = localStorage.getItem("products");
  if (jsonString) {
    basketProducts = JSON.parse(jsonString);
  }
}

loadFromLocalStorage(); // Загружаем данные при загрузке страницы

console.log(basketProducts);
console.log(localStorage.getItem('products'));