import { faker } from "@faker-js/faker";
import { SUPPORTED_CHARS } from "./constants";

/**
 * Generates a single question-answer pair object with random content.
 * @returns {{ question: string, answer: string }} - An object containing a `question` string and an `answer` string.
 */
export function generateSingleQuestionAnswerPair(): { question: string; answer: string; } {
  return {
    question: `${faker.string.uuid()}: ${faker.company.catchPhrase()} with ${faker.company.buzzPhrase()}?`,
    answer: `${faker.string.uuid()}: Yes! ${faker.hacker.phrase()}`,
  };
}

/**
 * Generates multiple question-answer pair objects with random content.
 * @param {number} [numberOfPairs=2] - The number of question-answer pairs to generate. Defaults to 2.
 * @returns {{ question: string, answer: string }[]} - An array of objects, each containing a `question` string and an `answer` string.
 */
export function generateMultipleQuestionAnswerPairs(numberOfPairs: number = 2): { question: string; answer: string; }[] {
  return faker.helpers.multiple(generateSingleQuestionAnswerPair, { count: numberOfPairs });
}

/**
 * Generates a random string of the specified length containing special and alphanumeric characters.
 * @param {number} randomStringLength - The desired length of the generated string.
 * @returns {string} - A random string of the specified length.
 */
export function generateStringWithSpecialChars(randomStringLength: number): string {
  let randomString: string = faker.string.alphanumeric({ length: randomStringLength - SUPPORTED_CHARS.SPECIAL.length });
  return SUPPORTED_CHARS.SPECIAL + randomString;
}