import { test, expect } from "@playwright/test";
import QuestionsPage from "../pages/questions-page";
import * as dataGenerator from "../utils/data-generator";
import { DEFAULT } from "../utils/constants";
import { trimTextArray, extractQuestions } from "../utils/utils";
import { QuestionAnswerPair } from "../interfaces/question-answer-pair";

let questionsPage: QuestionsPage;

// Could be substituded with a fixture in a larger project
test.beforeEach(async ({ page }) => {
    await page.goto("./");
    questionsPage = new QuestionsPage(page);
});

test.describe("UI Elements Verification", () => {
    test("should display correct texts for all titles", async () => {
        await expect.soft(questionsPage.headerTitle).toBeVisible();
        await expect.soft(questionsPage.createdQuestionsTitle).toBeVisible();
        await expect.soft(questionsPage.createNewQuestionTitle).toBeVisible();
    });

    test("should display correct text for all buttons", async () => {
        await expect.soft(questionsPage.sortQuestionsButton).toBeVisible();
        await expect.soft(questionsPage.removeQuestionsButton).toBeVisible();
        await expect.soft(questionsPage.createQuestionButton).toBeVisible();
    });

    test("should display tooltips on hover over 'Created questions' and 'Create a new question' titles", async () => {
        await expect.soft(questionsPage.createdQuestionsTooltip).toBeHidden();
        await questionsPage.createdQuestionsTitle.hover();
        await expect.soft(questionsPage.createdQuestionsTooltip).toBeVisible();
        await expect.soft(questionsPage.createNewQuestionTooltip).toBeHidden();
        await questionsPage.createNewQuestionTitle.hover();
        await expect.soft(questionsPage.createNewQuestionTooltip).toBeVisible();
    });
});

test.describe("List and Question Counter", () => {
    test("should show the default question/answer on start and update the question counter", async () => {
        await expect.soft(questionsPage.noQuestionsMessage).toBeHidden();
        await questionsPage.assertSidebarQuestionCounter(1);
        await expect.soft(questionsPage.questionTexts).toHaveText(DEFAULT.QUESTION);
        await questionsPage.questionTexts.click();
        await expect.soft(questionsPage.answerTexts).toHaveText(DEFAULT.ANSWER);
    });

    test("should hide 'No questions yet :-(' message and update question counter to 1 after adding a new question", async () => {
        await questionsPage.removeQuestionsButton.click();

        const questionAnswerPair: QuestionAnswerPair = dataGenerator.generateSingleQuestionAnswerPair();
        await questionsPage.createQuestion(questionAnswerPair.question, questionAnswerPair.answer);
        await expect.soft(questionsPage.noQuestionsMessage).toBeHidden();
        await questionsPage.assertSidebarQuestionCounter(1);
    });

    test("should allow opening a question without closing others", async () => {
        const questionAnswerPair: QuestionAnswerPair = dataGenerator.generateSingleQuestionAnswerPair();
        await questionsPage.createQuestion(questionAnswerPair.question, questionAnswerPair.answer);

        await questionsPage.questionTexts.first().click();
        await expect.soft(questionsPage.answerTexts.first()).toBeVisible();
        await expect.soft(questionsPage.answerTexts.last()).toBeHidden();
        await questionsPage.questionTexts.last().click();
        await expect.soft(questionsPage.answerTexts.first()).toBeVisible();
        await expect.soft(questionsPage.answerTexts.last()).toBeVisible();
    });

    test("should not persist after reloading the page", async ({ page }) => {
        const questionAnswerPair = dataGenerator.generateSingleQuestionAnswerPair();
        await questionsPage.createQuestion(questionAnswerPair.question, questionAnswerPair.answer);
        await expect(questionsPage.questionTexts.last()).toHaveText(questionAnswerPair.question);
        await page.reload();
        await expect(questionsPage.questionTexts.last()).not.toHaveText(questionAnswerPair.question);
        await questionsPage.questionTexts.last().click();
        await expect(questionsPage.answerTexts.last()).not.toHaveText(questionAnswerPair.answer);
    });
});

test.describe("Create a new question", () => {
    test("should add a new question at the bottom of the list", async () => {
        let currentNumberOfQuestions: number = await questionsPage.getCurrentNumberOfQuestions();
        const questionAnswerPair: QuestionAnswerPair = dataGenerator.generateSingleQuestionAnswerPair();
        await questionsPage.createQuestion(questionAnswerPair.question, questionAnswerPair.answer);

        await expect.soft(questionsPage.questionTexts.last()).toHaveText(questionAnswerPair.question);
        await expect.soft(questionsPage.answerTexts.last()).toBeHidden();
        await questionsPage.questionTexts.last().click();
        await expect.soft(questionsPage.answerTexts.last()).toHaveText(questionAnswerPair.answer);
        await questionsPage.assertSidebarQuestionCounter(currentNumberOfQuestions + 1);
    });

    test("should display question counter for three-digit numbers (boundary-value analysis)", async () => {
        const numberOfQuestions = 101;
        const generatedQuestions: QuestionAnswerPair[] = dataGenerator.generateMultipleQuestionAnswerPairs(numberOfQuestions);
        await questionsPage.removeQuestionsButton.click();
        await questionsPage.createMultipleQuestions(generatedQuestions);
        await questionsPage.assertSidebarQuestionCounter(numberOfQuestions);
        // Verify the last created question is the last one in the generated list
        await expect.soft(questionsPage.questionTexts.last()).toHaveText(generatedQuestions[numberOfQuestions - 1].question);
    });

    // Test expected to fail due to missing maxlength attribute or character limit functionality on question input
    test.fail("should enforce character limit on question input (boundary-value analysis)", async () => {
        const maxLengthAttribute = await questionsPage.questionInput.getAttribute('maxlength');
        // Convert the maxLength to a number or set a fallback of 255 if no maxlength is defined
        // eslint-disable-next-line playwright/no-conditional-in-test
        const maxLengthValue = maxLengthAttribute ? parseInt(maxLengthAttribute, 10) : 255;
        const longText = dataGenerator.generateStringWithSpecialChars(maxLengthValue + 10);
        await questionsPage.questionInput.fill(longText);
        expect.soft((await questionsPage.questionInput.inputValue()).length).toBe(maxLengthValue);
        // Verify that the text matches the first characters up to the limit
        expect.soft(questionsPage.questionInput).toBe(longText.slice(0, maxLengthValue));
    });

    // Test expected to fail due to missing maxlength attribute or character limit functionality on answer input
    test.fail("should enforce character limit on answer input (boundary-value analysis)", async () => {
        const maxLengthAttribute = await questionsPage.answerInput.getAttribute('maxlength');
        // eslint-disable-next-line playwright/no-conditional-in-test
        const maxLengthValue = maxLengthAttribute ? parseInt(maxLengthAttribute, 10) : 500;
        const longText = dataGenerator.generateStringWithSpecialChars(maxLengthValue + 10);
        await questionsPage.answerInput.fill(longText);
        expect.soft((await questionsPage.answerInput.inputValue()).length).toBe(maxLengthValue);
        await expect.soft(questionsPage.answerInput).toHaveValue(longText.slice(0, maxLengthValue));
    });

    test("should not create a question if both question and answer fields are empty", async () => {
        await questionsPage.removeQuestionsButton.click();
        await questionsPage.createQuestionButton.click();
        await expect.soft(questionsPage.questionInput).toBeFocused();
        await expect.soft(questionsPage.noQuestionsMessage).toBeVisible();
        await questionsPage.assertSidebarQuestionCounter(0);
    });

    test('A question should not be created if either Question or Answer text field is empty', async () => {
        const questionAnswerPair: QuestionAnswerPair = dataGenerator.generateSingleQuestionAnswerPair();
        await questionsPage.removeQuestionsButton.click();
        // Answer text field is focused since it's empty
        await questionsPage.questionInput.fill(questionAnswerPair.question);
        await questionsPage.createQuestionButton.click();
        await expect.soft(questionsPage.answerInput).toBeFocused();
        await questionsPage.questionInput.fill("");
        // Question text field is focused since it's empty
        await questionsPage.answerInput.fill(questionAnswerPair.answer);
        await questionsPage.createQuestionButton.click();
        await expect.soft(questionsPage.questionInput).toBeFocused();
        await expect.soft(questionsPage.noQuestionsMessage).toBeVisible();
        await questionsPage.assertSidebarQuestionCounter(0);
    });
});

test.describe("Sort Questions", () => {
    test('should sort all questions in ascending order when clicking "Sort questions"', async () => {
        const numberOfQuestions: number = 10;
        const generatedQuestions: QuestionAnswerPair[] = dataGenerator.generateMultipleQuestionAnswerPairs(numberOfQuestions);
        await questionsPage.removeQuestionsButton.click();
        await questionsPage.createMultipleQuestions(generatedQuestions);
        await questionsPage.sortQuestionsButton.click();
        const listedQuestions: string[] = trimTextArray(await questionsPage.questionsListItems.allInnerTexts());
        const expectedSortedQuestions: string[] = extractQuestions(generatedQuestions).sort();
        expect(listedQuestions).toEqual(expectedSortedQuestions);
    });
});

test.describe("Remove Questions", () => {
    test('should delete all questions and display "No questions yet :-(" and "Here you can find no questions" messages after clicking "Remove questions"', async () => {
        await expect.soft(questionsPage.noQuestionsMessage).toBeHidden();
        await questionsPage.removeQuestionsButton.click();
        await expect.soft(questionsPage.noQuestionsMessage).toBeVisible();
        await questionsPage.assertSidebarQuestionCounter(0);
    });
});
