import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";
// const form = document.querySelector('.header__search');
// const input = document.querySelector('.header__search-input');
// const button = document.querySelector('.header__search-button');
// const results = document.querySelector('.search-results');

// const data = [
//   'Apple',
//   'Banana',
//   'Orange',
//   'Grapes',
//   'Mango',
//   'Pineapple',
//   'oliczka'
// ];

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const value = input.value.trim();

//   if (value === '') {
//   alert('ERROR:EMPTY');
//   return;
// }
// const filtered = data.filter(item =>
//   item.toLowerCase().includes(value.toLowerCase())
// );

// results.innerHTML = '';

// if (filtered.length === 0) {
//   results.textContent = 'Result 0';
// }

// filtered.forEach(item => {
//     const div = document.createElement('div');
//     div.textContent = item;
//     results.appendChild(div);
//   });

// input.value = '';

// });

// ======================
// 1. DOM-элементы
// ======================
const form = document.querySelector('.header__search');
const input = document.querySelector('.header__search-input');
const results = document.querySelector('.search-results');

// ======================
// 2. Данные (пока локальные)
// ======================
const data = [
  'Apple',
  'Banana',
  'Orange',
  'Grapes',
  'Mango',
  'Pineapple',
  'oliczka'
];

// ======================
// 3. ЛОГИКА (поиск)
// ======================
// функция ничего не знает про DOM
// она только принимает значение и возвращает результат
function search(value) {
  return data.filter(item =>
    item.toLowerCase().includes(value.toLowerCase())
  );
}

// ======================
// 4. UI (рендер результатов)
// ======================
// функция отвечает только за отображение
function renderResults(items) {
  results.innerHTML = ''; // очищаем старые результаты

  // если ничего не найдено
  if (items.length === 0) {
    results.textContent = 'No results found';
    return;
  }

  // создаём элементы под каждый результат
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    results.appendChild(div);
  });
}

// ======================
// 5. ВСПОМОГАТЕЛЬНОЕ (debounce)
// ======================
// задержка выполнения функции
// чтобы не вызывать поиск на каждую букву
function debounce(fn, delay = 300) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout); // сбрасываем прошлый таймер

    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// ======================
// 6. ОСНОВНОЕ ДЕЙСТВИЕ (поиск)
// ======================
// объединяем логику + UI
function handleSearch(value) {
  const filtered = search(value); // логика
  renderResults(filtered);        // отображение
}


const debouncedSearch = debounce(handleSearch, 300);

// ======================

// ======================


input.addEventListener('input', (e) => {
  const value = e.target.value.trim();


  if (value === '') {
    results.innerHTML = '';
    return;
  }

  debouncedSearch(value);
});

function showToast(type, message) {
  iziToast[type]({
    title: type === 'error' ? 'Error' : 'Success',
    message: message,
    position: 'topRight',
    timeout: 2500
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = input.value.trim();

  if (value === '') {
    showToast('error', 'Please enter a search query');
  return;
  }

  handleSearch(value);
});