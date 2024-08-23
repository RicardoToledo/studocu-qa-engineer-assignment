import { expect, type Locator, type Page } from "@playwright/test";
import { TOOLTIP } from "../utils/constants";
import { QuestionAnswerPair } from "../interfaces/QuestionAnswerPair.interface";

export class QuestionsPage {
    readonly page: Page;
    // Header title
    readonly headerTitle: Locator;
    // Created questions
    readonly createdQuestionsTitle: Locator;
    readonly createdQuestionsTooltip: Locator;
    readonly questionsListItems: Locator;
    readonly questionTexts: Locator;
    readonly answerTexts: Locator;
    readonly sortQuestionsButton: Locator;
    readonly removeQuestionsButton: Locator;
    // Create a new question
    readonly createNewQuestionTitle: Locator;
    readonly createNewQuestionTooltip: Locator;
    readonly questionInput: Locator;
    readonly answerInput: Locator;
    readonly createQuestionButton: Locator;
    // Sidebar question counter
    readonly sidebarQuestionCounterText: Locator;
    // No questions alert message
    readonly noQuestionsMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // Header title
        this.headerTitle = page.getByRole("heading", { level: 1, name: "The awesome Q/A tool" });
        // Created questions
        this.createdQuestionsTitle = page.getByRole("heading", { level: 2, name: "Created questions" });
        this.createdQuestionsTooltip = page.getByText(TOOLTIP.CREATED_QUESTIONS_TITLE);
        this.questionsListItems = page.getByRole("listitem");
        this.questionTexts = page.locator("li div.question__question");
        this.answerTexts = page.locator("li p.question__answer");
        this.sortQuestionsButton = page.getByRole("button", { name: "Sort questions" });
        this.removeQuestionsButton = page.getByRole("button", { name: "Remove questions" });
        // Create a new question
        this.createNewQuestionTitle = page.getByRole("heading", { level: 2, name: "Create a new question" });
        this.createNewQuestionTooltip = page.getByText(TOOLTIP.CREATE_NEW_QUESTION_TITLE);
        this.questionInput = page.getByRole("textbox", { name: "question" });
        this.answerInput = page.getByRole("textbox", { name: "answer" });
        this.createQuestionButton = page.getByRole("button", { name: "Create question" });
        // Sidebar question counter
        this.sidebarQuestionCounterText = page.locator('[class = "sidebar"]');
        // No questions alert message
        this.noQuestionsMessage = page.getByText("No questions yet :-(");
    }

    /**
     * Asserts the sidebar question counter text based on the expected number of questions.
     * @param {number} expectedQuestions - The expected number of questions.
     * @returns {Promise<void>} - A promise that resolves when the assertion is complete.
     * @throws {Error} - If the expected number of questions is negative.
     */
    async assertSidebarQuestionCounter(expectedQuestions: number): Promise<void> {
        if (expectedQuestions < 0) {
            throw new Error("Expected number of questions cannot be negative");
        }
        const counterText = (() => {
            switch (expectedQuestions) {
                case 0: return "Here you can find no questions. Feel free to create your own questions!";
                case 1: return "Here you can find 1 question. Feel free to create your own questions!";
                default: return `Here you can find ${expectedQuestions} questions. Feel free to create your own questions!`;
            }
        })();
        await expect.soft(this.sidebarQuestionCounterText).toHaveText(counterText);
    }

    /**
     * Gets the current number of questions from the sidebar text.
     * @returns {Promise<number>} - The number of current questions, or 0 if "no questions" is found.
     * @throws {Error} - If the text doesn't contain a number or "no questions".
     */
    async getCurrentNumberOfQuestions(): Promise<number> {
        const counterText: string = await this.sidebarQuestionCounterText.innerText();
        const match = counterText.match(/\d+/);
        if (match) {
            return parseInt(match[0], 10);
        } else if (counterText.includes("no questions")) {
            return 0;
        } else {
            throw new Error("Text doesn't contain any reference to number of questions");
        }
    }

    /**
     * Creates a question on the page with the given question and answer.
     * @param {string} question - The question to be created.
     * @param {string} answer - The answer to the question.
     * @returns {Promise<void>} - A promise that resolves when the question is created.
     */
    async createQuestion(question: string, answer: string): Promise<void> {
        await this.questionInput.fill(question);
        await this.answerInput.fill(answer);
        await this.createQuestionButton.click();
    }

    /**
     * Creates multiple questions on the page with their corresponding answers.
     * @param questionAnswerArray - An array of objects containing the question and answer pairs.
     * @returns A Promise that resolves when all the questions are created.
     */
    async createMultipleQuestions(questionAnswerArray: QuestionAnswerPair[]): Promise<void> {
        for (let questionAnswerPair of questionAnswerArray) {
            await this.createQuestion(questionAnswerPair.question, questionAnswerPair.answer);
        }
    }
}

export default QuestionsPage;
