/**
 * Trims whitespace and newline characters from an array of strings.
 * @param {string[]} textArray - An array of strings to be trimmed.
 * @returns {string[]} - An array of trimmed strings.
 */
export function trimTextArray(textArray: string[]): string[] {
    return textArray.map(text => text.trim());
}

/**
 * Extracts an array of question strings from an array of { question: string, answer: string } objects.
 * @param {{ question: string, answer: string }[]} questionAnswerPairArray - An array of objects, each containing a `question` and `answer` property.
 * @returns {string[]} - An array of question strings.
 */
export function extractQuestions(questionAnswerPairArray: { question: string, answer: string }[]): string[] {
    return questionAnswerPairArray.reduce<string[]>((questionList, questionAnswerPair) => {
        questionList.push(questionAnswerPair.question);
        return questionList;
    }, []);
}
