const cardsContainer = document.querySelector('#cards-container');

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
                            class="card-footer-item">
                            <span class="icon-text">
                                ${generateStatus(question)}
                            </span>
                        </div>
                    </footer>
                </div>
            </div>
        `
    );
});

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
