export const DEFAULT = {
    /**
    * The question text on the default question.
    * @constant
    */
    QUESTION: 'How to add a question?',
    /**
     * The answer text on the default question.
     * @constant
     */
    ANSWER: 'Just use the form below!'
} as const;

export const TOOLTIP = {
    /**
    * Tooltip text shown on "Created questions" title.
    * @constant
    */
    CREATED_QUESTIONS_TITLE: "Here you can find the created questions and their answers.",
    /**
     * Tooltip text shown on "Create a new question" title.
     * @constant
     */
    CREATE_NEW_QUESTION_TITLE: "Here you can create new questions and their answers."
} as const;

export const SUPPORTED_CHARS = {
    /**
     * String containing all the 32 supported special characters (based on faker).
     * @constant
     */
    SPECIAL: "\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
} as const;
