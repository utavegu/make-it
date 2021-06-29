'use strict';

/* ---------- ANCHOR SCRIPT ---------- */

const anchor = document.querySelector('.main-footer__anchor');

const go = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

anchor.addEventListener('click', go);



/* ---------- BURGER-MENU OPEN-CLOSE SCRIPT ---------- */

const menuBurgerButton = document.querySelector(".main-header__open-menu-button");
const headerNavigation = document.querySelector(".main-header__navigation-list");

if (document.body.clientWidth <= 768) {
  headerNavigation.classList.add("hidden");
}

menuBurgerButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  headerNavigation.classList.toggle("hidden");
  menuBurgerButton.classList.toggle("is-opened");
})



/* ---------- QUESTIONNAIRE SCRIPT ---------- */

/* Открывание-закрывание */
const openQuestionnaireButton = document.querySelector(".main-header__open-questionnaire-button");
const questionnaireModule = document.querySelector(".main-header__questionnaire");

questionnaireModule.classList.remove("hidden"); // ВРЕМЕННО

openQuestionnaireButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  questionnaireModule.classList.toggle("hidden");
  openQuestionnaireButton.classList.toggle("is-opened");
})

/* Реализация внутренника */

const templates = [
  `
  <div class="questionnaire__inner">
    <div class="questionnaire__suggestion">
      <p class="questionnaire__suggestion-heading">Вам требуется..</p>
      <p class="questionnaire__suggestion-content">
        <input type="checkbox"></input>
        <label for="">
          <p>Заголовок пункта</p>
          <p>Описание пункта</p>
        </label>
      </p>
    </div>
    <div class="questionnaire__button-block">
      <button class="button-next">КНОПКА</button>
    </div>
  </div>
  `,
  `
  <div>
  <p class="heading">Первый шаблон</p>
  <form>
    <input name="q1i1" type="checkbox">
    <label>
      <p>Вариант 1</p>
      <p>Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</p>
    </label>
    <input name="q1i2" type="checkbox">
    <label>
      <p>Вариант 1</p>
      <p>Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</p>
    </label>
  </form>
</div>
`,
`
<div>
  <p class="heading">Второй шаблон</p>
  <form>
    <input name="q2i1" type="text">
    <input name="q2i2" type="text">
    <input name="q2i3" type="text">
  </form>
</div>
`,
`
<div>
  <p class="heading">Третий шаблон</p>
  <form onsubmit="return onSubmit();">
    <input name="q3i1" type="text">
    <input name="q3i2" type="password">
    <button type="submit">Отправить</button>
  </form>
</div>
`,
`
<div>
  <h3>Спасибо!</h3>
  <p>Мы вам перезвоним</p>
</div>
`
];

const buttonIcons = {
  next: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>`,
};

const $ = (selector) => document.querySelector(selector);

const htmlToElement = (html) => {
  var template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

const root = $`.questionTree`; // Старший элемент
// const root = $`.questionnaire__inner`;
const question = $`.question`; // Модуль отрисовки вопроса
// const question = $`.questionnaire__suggestion`;
const buttons = $`.buttons`; // Модуль отрисовки кнопок
// const buttons = $`.questionnaire__button-block`;

/* БЛИЖАЙШАЯ ЗАДАЧА, ЧТОБЫ КНОПКА СО СТРЕЛОЧКОЙ ПОЗЕЛЕНЕЛА - ОСТАЛЬНОЕ ПОТОМ */
/* А потом - это найти правильные элементы под этими же именами */

const answers = [];
let currentQuestion = -1;

const storeAnswers = () => {
  const inputs = question.querySelectorAll("input");
  const answer = [...inputs].reduce(
    (prev, curr) => ({
      ...prev,
      [curr.name]: curr.type === "checkbox" ? curr.checked : curr.value,
    }),
    {}
  );
  console.log(answer);
  answers.push(answer);
};

const nextHandler = () => {
  storeAnswers();
  addNextQuestion();
};

const closeHandler = () => {
  // тут сделаешь, что угодно (возвращение на начальный экран, очистка или переадресацию)
  currentQuestion = -1;
  answers.length = 0;
  buttons.innerHTML = "";
  addNextQuestion();
};

const addButton = (icon, handler, classname="button-next") => {
  const buttonIcon = htmlToElement(icon);
  const button = document.createElement("button");
  // добавляем ей класс button-next
  button.className = classname;
  // button.className = "button-next";
  button.addEventListener("click", handler);
  button.appendChild(buttonIcon);
  buttons.appendChild(button);
};

// вызывается при нажатии на submit в 3 форме.
// Вернем отсюда false, чтобы форма сама не отправляла ничего
const onSubmit = () => {
  storeAnswers();
  console.log("Для отправки на сервер: ", answers);
  addNextQuestion();
  return false;
};

const addNextQuestion = () => {
  question.innerHTML = "";
  currentQuestion++;
  question.appendChild(htmlToElement(templates[currentQuestion]));
  if (currentQuestion === templates.length - 1) {
    buttons.innerHTML = "";
    addButton(buttonIcons.close, closeHandler, "button-close");
  } else if (currentQuestion === 0) addButton(buttonIcons.next, nextHandler, "button-next");
  else if (currentQuestion === templates.length - 2) buttons.innerHTML = "";
};

addNextQuestion();
