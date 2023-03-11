const cardsContainer = document.querySelector('#cardsContainer');
const hideLearnedCheckbox = document.querySelector('#hideLearned');
const addQuestionBtn = document.querySelector('#addQuestionBtn');

renderCards(questions);
hideLearnedCheckbox.addEventListener('change', updateCards);
addQuestionBtn.addEventListener('click', addQuestion);

function renderCards(questions) {
    questions.forEach((question) => {
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
                            class="card-footer-item py-2">
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

function generateStatus(question) {
    if (question.isLearned) {
        return `
            <span class="icon has-text-success">
                <i class="fa-solid fa-check"></i>
            </span>
            <span>Know</span>
        `;
    } else {
        return `
            <span class="icon has-text-danger">
                <i class="fa-solid fa-xmark"></i>
            </span>
            <span>Don't Know</span>
        `;
    }
}

function generateBgColor(question) {
    if (question.isLearned) {
        return 'has-background-success-light';
    } else {
        return 'has-background-danger-light';
    }
}

function updateCards() {
    clearCardsContainer();
    if (hideLearnedCheckbox.checked) {
        const notLearnedQuestions = questions.filter(
            (question) => !question.isLearned
        );
        renderCards(notLearnedQuestions);
    } else {
        renderCards(questions);
    }
}

function clearCardsContainer() {
    while (cardsContainer.childElementCount > 1) {
        cardsContainer.removeChild(cardsContainer.lastChild);
    }
}

function addQuestion() {
    const addQuestionField = document.querySelector('#addQuestionField');
    questions.unshift({
        text: addQuestionField.value,
        isLearned: false,
    });
    updateCards();
    addQuestionField.value = '';
}
