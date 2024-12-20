// Загружаем данные из localStorage при загрузке страницы
let basketProducts = [];

function loadFromLocalStorage() {
    const jsonStringFromStorage = localStorage.getItem("products");
    if (jsonStringFromStorage) {
        try {
            basketProducts = JSON.parse(jsonStringFromStorage);
            console.log("Данные загружены из localStorage:", basketProducts);
        } catch (error) {
            console.error("Ошибка при парсинге данных из localStorage:", error);
            basketProducts = []; // Если ошибка, сбрасываем корзину
        }
    }
}

loadFromLocalStorage();

function saveToLocalStorage() {
    const jsonString = JSON.stringify(basketProducts);
    localStorage.setItem("products", jsonString);
}

function updateBasket() {
    const basketListBody = document.querySelector('.BasketListBody');
    basketListBody.innerHTML = ''; // Очищаем контейнер

    const headText = document.createElement('h1');
    headText.textContent = 'Корзина';
    basketListBody.append(headText);

    if (!basketProducts || basketProducts.length === 0) {
        const emptyText = document.createElement('p');
        emptyText.textContent = 'Корзина пуста';
         emptyText.classList.add('Empty'); // добавим класс
        basketListBody.append(emptyText);
        return;
    }

    // Вычисляем общую сумму
    let totalBasketPrice = 0;
    
    basketProducts.forEach(item => {
        totalBasketPrice += item.total;


        const container = document.createElement('div');
        container.classList.add('Block', `product-${item.name.replace(/\s/g, '-')}`);

        const img = document.createElement('img');
        img.src = 'images/products/';

        switch (item.name) {
            case 'Пшеница Тимирязевка 150':
                img.src += 'пшеница/тимирязевка.png';
                break;
            case 'Пшеница Ермак':
                img.src += 'пшеница/ермак/ermak.jpg';
                break;
            case 'Пшеница Омская Яровая':
                img.src += 'пшеница/омская яровая.png';
                break;
            case 'Рожь Прибалтийская':
                img.src += 'рожь/Прибалтийская.png';
                break;
            case 'Рожь КВС Аллокатор':
                img.src += 'рожь/аллокатор.png';
                break;
            case 'Рожь КВС Н 5009':
                img.src += 'рожь/квс_н_5009.png';
                break;
           case 'Овёс Дебютный':
                img.src+='овёс/ДЕБЮТНЫЙ.png';
                break;
            case 'Овёс АЗИЛЬ':
                img.src += 'овёс/АЗИЛЬ.png';
                break;
            case 'Овёс Борец':
                img.src += 'овёс/БОРЕЦ.png';
                break;
        }

        const p = document.createElement('p');
        p.classList.add('ProductName')
        p.textContent = item.name;

        const divAmount = document.createElement('div');
        divAmount.classList.add('AmountOfProduct');

        const buttonMinus = document.createElement('button');
        buttonMinus.textContent = '-';
        buttonMinus.addEventListener('click', () => {
            minusAmount(item);
            updateBasket();
        });

        const pCount = document.createElement('p');
        pCount.classList.add('Amount');
        pCount.textContent = item.count;

        const buttonPlus = document.createElement('button');
        buttonPlus.textContent = '+';
        buttonPlus.addEventListener('click', () => {
            plusAmount(item);
            updateBasket();
        });

        divAmount.append(buttonMinus);
        divAmount.append(pCount);
        divAmount.append(buttonPlus);

        const divTotal = document.createElement('div');
        divTotal.classList.add('TotalPrice');

        const pTotal = document.createElement('p');
        pTotal.textContent = 'Итоговая стоимость:';

        const pPrice = document.createElement('p');
        pPrice.textContent = item.total;

        divTotal.append(pTotal);
        divTotal.append(pPrice);

        container.append(img);
        container.append(p);
        container.append(divAmount);
        container.append(divTotal);

        basketListBody.append(container);
    });

    // Показываем итоговую сумму
    const totalSumElement = document.createElement('p');
    totalSumElement.classList.add('TotalSum'); // Добавляем класс
    totalSumElement.textContent = `Общая сумма: ${totalBasketPrice}`;
    basketListBody.append(totalSumElement);

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Очистить';
    clearButton.classList.add('clearBasketButton');
    clearButton.addEventListener('click', () => {
        clearBasket(); // Вызываем функцию очистки корзины
    });

    basketListBody.append(clearButton); 
}

// Очистка корзины и хранилища
function clearBasket() {
    localStorage.clear();
    basketProducts = [];
    updateBasket();
}

// Уменьшение количества товара 
function minusAmount(product) {
    if (product.count > 0) {
        product.count--;
        product.total = product.count * product.price;
        saveToLocalStorage();
        if (product.count === 0) {
            basketProducts = basketProducts.filter(item => item !== product);
             saveToLocalStorage();
        }
    }
}

// Увеличение коичества товара
function plusAmount(product) {
    product.count++;
    product.total = product.count * product.price;
    saveToLocalStorage();
}

updateBasket();