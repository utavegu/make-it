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

const openQuestionnaireButton = document.querySelector(".main-header__open-questionnaire-button");
const questionnaireModule = document.querySelector(".main-header__questionnaire");

openQuestionnaireButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  questionnaireModule.classList.toggle("hidden");
  openQuestionnaireButton.classList.toggle("is-opened");
})

const templates = [
  `
  <div>
    <p class="questionnaire__suggestion-heading">Вам требуется..</p>
    <div class="questionnaire__suggestion-content">
      <form>
        <p>
          <input name="sales" type="checkbox" checked></input>
          <label for="">
            <p>Повысить продажи</p>
            <p>Создадим убедительный сайт и рекламную компанию с конверсией в заявку до 27%, реализуем комплексные стратегии для повышения продаж.</p>
          </label>
        </p>
        <p>
          <input name="design" type="checkbox"></input>
          <label for="">
            <p>Обновить дизайн</p>
            <p>Помогаем улучшить имидж Вашего ресурса в интернете, путем создания аккуратного и стильного дизайна с упором на маркетинг и удобство использования.</p>
          </label>
        </p>
        <p>
          <input name="functional" type="checkbox"></input>
          <label for="">
            <p>Расширить функционал</p>
            <p>Реализуем решения любой сложности, настраиваем интеграции с внешними сервисами, создаем модули и алгоритмы для автоматизации Вашего бизнеса онлайн.</p>
          </label>
        </p>
      </form>
    </div>
  </div>
  `,
  `
  <div>
    <p class="questionnaire__suggestion-heading">У вас уже есть сайт/профили в соц. сетях?</p>
    <div class="questionnaire__suggestion-content">
      <form>
        <p>
          <label for="">
            Вставьте ссылку
            <input name="link" type="text"></input>
          </label>
        </p>
      </form>
    </div>
  </div>
`,
`
<div>
    <p class="questionnaire__suggestion-heading">Оставьте свои контактные данные</p>
    <div class="questionnaire__suggestion-content">
      <form id="server" onsubmit="return onSubmit();">
        <p>
          <label for="">
            Ваше имя
            <input name="name" type="text"></input>
          </label>
        </p>
        <p>
          <label for="">
            Ваш номер телефона
            <input name="phone" type="text"></input>
          </label>
        </p>
        <p>
          <label for="">
            Email
            <input name="email" type="text"></input>
          </label>
        </p>
      </form>
    </div>
  </div>
`,
`
<div>
  <p class="questionnaire__suggestion-heading">Спасибо!</p>
  <div class="questionnaire__suggestion-content">
    <p>В ближайшее время мы проанализируем ваш проект и перезвоним с предложением!</p>
  </div>
</div>
`
];

// Вас теперь лучше в стили через класс
// Но пока не убираю, чтобы скрипт не сломать - рефакторить буду позже
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
