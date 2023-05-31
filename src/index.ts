import questions from './questions';

interface IQuestion {
  text: string;
  isLearned: boolean;
}

const cardsContainer = document.querySelector('#cardsContainer');
const hideLearnedCheckbox = document.querySelector(
  '#hideLearned'
) as HTMLInputElement | null;
const addQuestionBtn = document.querySelector('#addQuestionBtn');

function generateStatus(question: IQuestion) {
  if (question.isLearned) {
    return `
            <span class="icon has-text-success">
                <i class="fa-solid fa-check"></i>
            </span>
            <span>Know</span>
        `;
  }
  return `
            <span class="icon has-text-danger">
                <i class="fa-solid fa-xmark"></i>
            </span>
            <span>Don't Know</span>
        `;
}

function generateBgColor(question: IQuestion) {
  if (question.isLearned) {
    return 'has-background-success-light';
  }
  return 'has-background-danger-light';
}

function renderCards(questionsList: IQuestion[]) {
  questionsList.forEach((question: IQuestion, index: number) => {
    if (!cardsContainer) return;

    cardsContainer.insertAdjacentHTML(
      'beforeend',
      `
            <div class="column is-one-third-desktop is-flex">
                <div class="card is-flex-grow-1 is-flex is-flex-direction-column 
                    ${generateBgColor(question)}">
                    <div class="card-content is-flex-grow-1">
                        <p class="is-size-5">
                            ${question.text}
                        </p>
                    </div>
                    <footer class="card-footer">
                        <div
                            class="card-footer-item py-2 status-btn is-clickable" data-index="${index}">
                            <span class="icon-text has-text-weight-semibold">
                                ${generateStatus(question)}
                            </span>
                        </div>
                    </footer>
                </div>
            </div>
        `
    );
  });
}

function clearCardsContainer() {
  if (!cardsContainer) return;

  while (cardsContainer.childElementCount > 1) {
    if (!cardsContainer.lastChild) return;
    cardsContainer.removeChild(cardsContainer.lastChild);
  }
}

function updateCards() {
  clearCardsContainer();
  if (hideLearnedCheckbox && hideLearnedCheckbox.checked) {
    const notLearnedQuestions = questions.filter(
      (question) => !question.isLearned
    );
    renderCards(notLearnedQuestions);
  } else {
    renderCards(questions);
  }
}

function addQuestionToDataset(dataset: IQuestion[], questionText: string) {
  dataset.push({
    text: questionText,
    isLearned: false,
  });
}

function renderNewQuestion() {
  const addQuestionField = document.querySelector(
    '#addQuestionField'
  ) as HTMLInputElement | null;

  if (!addQuestionField) return;
  addQuestionToDataset(questions, addQuestionField.value);
  updateCards();
  addQuestionField.value = '';
}

function changeQuestionStatus(event: Event) {
  const target = event.target as HTMLElement | null;
  if (target && target.closest('.status-btn')) {
    const { index } = (target.closest('.status-btn') as HTMLElement).dataset;
    if (!index) return;
    questions[+index].isLearned = !questions[+index].isLearned;
    updateCards();
  }
}

renderCards(questions);
if (cardsContainer) {
  cardsContainer.addEventListener('click', changeQuestionStatus);
}
if (hideLearnedCheckbox) {
  hideLearnedCheckbox.addEventListener('change', updateCards);
}
if (addQuestionBtn) {
  addQuestionBtn.addEventListener('click', renderNewQuestion);
}
