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

if (document.body.clientWidth <= 752) {
  // пляски с бубном - надо понять какой клиент видтх соответствует медиазапросу в 768
  headerNavigation.classList.add("hidden");
}

menuBurgerButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  headerNavigation.classList.toggle("hidden");
  menuBurgerButton.classList.toggle("is-opened");
})



/* ---------- QUESTIONNAIRE SCRIPT ---------- */

const openQuestionnaireButton = document.querySelector(".main-header__open-questionnaire-button");
const questionnaireModule = document.querySelector(".main-header__questionnaire");

openQuestionnaireButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  questionnaireModule.classList.toggle("hidden");
  openQuestionnaireButton.classList.toggle("is-opened");
})

const templates = [
  `
  <div class="questionnaire__slide questionnaire__slide--1">
    <p class="questionnaire__suggestion-heading">Вам требуется..</p>
    <form class="questionnaire__suggestion-content">
      <div class="questionnaire__suggestion-form-item">
        <label>
          <input name="sales" class="questionnaire__checkbox visually-hidden" type="checkbox" checked>
          <span class="questionnaire__custom-checkbox"></span>
          <span class="questionnaire__custom-checkbox visually-hidden">Повысить продажи</span>
        </label>
        <div>
          <p class="questionnaire__suggestion-unit-heading">Повысить продажи</p>
          <p class="questionnaire__suggestion-description">Создадим убедительный сайт и рекламную компанию с конверсией в заявку до 27%, реализуем комплексные стратегии для повышения продаж.</p>
        </div>
      </div>

      <div class="questionnaire__suggestion-form-item">
        <label>
          <input name="design" class="questionnaire__checkbox visually-hidden" type="checkbox">
          <span class="questionnaire__custom-checkbox"></span>
          <span class="questionnaire__custom-checkbox visually-hidden">Обновить дизайн</span>
        </label>
        <div>
          <p class="questionnaire__suggestion-unit-heading">Обновить дизайн</p>
          <p class="questionnaire__suggestion-description">Помогаем улучшить имидж Вашего ресурса в интернете, путем создания аккуратного и стильного дизайна с упором на маркетинг и удобство использования.</p>
        </div>
      </div>

      <div class="questionnaire__suggestion-form-item">
        <label>
          <input name="functional" class="questionnaire__checkbox visually-hidden" type="checkbox">
          <span class="questionnaire__custom-checkbox"></span>
          <span class="questionnaire__custom-checkbox visually-hidden">Расширить функционал</span>
        </label>
        <div>
          <p class="questionnaire__suggestion-unit-heading">Расширить функционал</p>
          <p class="questionnaire__suggestion-description">Реализуем решения любой сложности, настраиваем интеграции с внешними сервисами, создаем модули и алгоритмы для автоматизации Вашего бизнеса онлайн.</p>
        </div>
      </div>
    </form>
  </div>
  `,
  `
  <div class="questionnaire__slide questionnaire__slide--2">
    <p class="questionnaire__suggestion-heading">У вас уже есть<br> сайт/профили в соц. сетях?</p>
    <form class="questionnaire__suggestion-content">
      <p class="questionnaire__suggestion-form-item">
        <label for="">Вставьте ссылку</label>
        <input name="link" type="text">
      </p>
    </form>
  </div>
`,
`
<div class="questionnaire__slide questionnaire__slide--3">
    <p class="questionnaire__suggestion-heading">Оставьте свои контактные данные</p>
    <form class="questionnaire__suggestion-content" id="server" onsubmit="return onSubmit();">
      <p class="questionnaire__suggestion-form-item">
        <label for="">Ваше имя</label>
        <input name="name" type="text">
      </p>
      <p class="questionnaire__suggestion-form-item">
        <label for="">Ваш номер телефона</label>
        <input type="tel" name="phone" type="text" pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$">
      </p>
      <p class="questionnaire__suggestion-form-item">
        <label for="">Email</label>
        <input type="email" name="email">
      </p>
    </form>
  </div>
`,
`
<div class="questionnaire__slide questionnaire__slide--4">
  <p class="questionnaire__suggestion-heading">Спасибо!</p>
  <p class="questionnaire__suggestion-content questionnaire__suggestion-description">В ближайшее время мы проанализируем ваш проект и перезвоним с предложением!</p>
</div>
`
];

// Вас теперь лучше в стили через класс
// Но пока не убираю, чтобы скрипт не сломать - рефакторить буду позже
const buttonIcons = {
  next: `<svg width="29" height="19" viewBox="0 0 29 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 9.5H28M28 9.5L19.5 1M28 9.5L19.5 18" stroke="white"/>
  </svg>`,
  close: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 21L11 11M21 1L11 11M11 11L21 21L1 1" stroke="white"/>
  </svg>`,
};

const $ = (selector) => document.querySelector(selector);

const htmlToElement = (html) => {
  var template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

const root = $`.questionnaire__inner`;
const question = $`.questionnaire__suggestion`;
const buttons = $`.questionnaire__buttons-block`;

const answers = [];
let currentQuestion = -1;

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

const storeAnswers = () => {
  const inputs = question.querySelectorAll("input");
  const answer = [...inputs].reduce(
    (prev, curr) => ({
      ...prev,
      [curr.name]: curr.type === "checkbox" ? curr.checked : curr.value,
    }),
    {}
  );
  console.log(answer)
  answers.push(answer);
};

const nextHandler = () => {
  storeAnswers();
  addNextQuestion();
};

const closeHandler = () => {
  questionnaireModule.classList.toggle("hidden");
  openQuestionnaireButton.classList.toggle("is-opened");
  currentQuestion = -1;
  answers.length = 0;
  buttons.innerHTML = "";
  addNextQuestion();
};

const addButton = (icon, handler, classname = "button-next", type = "button") => {
  const buttonIcon = htmlToElement(icon);
  const button = document.createElement("button");
  button.className = classname + " button";
  setAttributes(button, {"type": type, "form": "server"});
  button.addEventListener("click", handler);
  button.appendChild(buttonIcon);
  buttons.appendChild(button);
};

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
    addButton(buttonIcons.close, closeHandler, "button-close", "submit");
  } else if (currentQuestion === 0) addButton(buttonIcons.next, nextHandler, "button-next");
};

addNextQuestion();
