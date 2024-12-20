// Анимация покупок
function smoothMoveInterval(element, targetX, targetY, duration) {   
  let i = 0;
  let intervalId = setInterval(() => {
    let startX = element.offsetLeft;
    let startY = element.offsetTop;
    let diffX = targetX - startX;
    let diffY = targetY - startY;  
    let steps = duration / 10; // Количество шагов
    let stepX = diffX / steps;
    let stepY = diffY / steps;
  
    targetX = document.querySelector('.Basket').getBoundingClientRect().left + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft + 60;
    targetY = document.querySelector('.Basket').getBoundingClientRect().top + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop + 60;
  
    element.style.left = startX + stepX * i + 'px';
    element.style.top = startY + stepY * i + 'px';
  
    i++;
    if (i > steps || i > 40) {
      clearInterval(intervalId);
      element.style.width = '0px';
      element.style.height = '0px';
    }
   
  }, 10);
}
  
let buttonsList = document.querySelectorAll('.BuyButton')
for (const but of buttonsList){
    but.addEventListener('click', event =>{
    let buyPoint = document.querySelector('.BuyPoint') 
    let basketX = document.querySelector('.Basket').getBoundingClientRect().left + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft + 90;
    let basketY = document.querySelector('.Basket').getBoundingClientRect().top + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop + 90;
    
    buyPointX = event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft - 10;
    buyPointY = event.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop - 10;
    
    buyPoint.style.left = buyPointX + 'px';
    buyPoint.style.top = buyPointY + 'px';
  
    buyPoint.style.width = '40px';
    buyPoint.style.height = '40px';
  
    smoothMoveInterval(buyPoint, basketX, basketY, 2000); // Перемещаем на (x, y) за 2 секунды
  });
}