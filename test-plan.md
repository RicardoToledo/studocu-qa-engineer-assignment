
# Test plan

- [Test plan](#test-plan)
    * [Test scope](#test-scope)
        + [Objective](#objective)
        + [Approach and project development](#approach-and-project-development)
        + [Cross-Browser Testing](#cross-browser-testing)
    * [Test Suite](#test-suite)
    * [Found Defects](#found-defects)
    * [Improvements / Possible Next Steps](#improvements--possible-next-steps)
  
## Test scope

### Objective

> Your challenge is to write some kind of automated user acceptence tests for this app and share your repo with us.
> 
> For technical solution, use JS/TS and Playwright framework, given we use these internally. Take this chance to show your knowledge not only regarding coding but also regarding integrating different features to an automation project as reporting, parallel execution, retries, screenshots and logging when failing, etc.

<h4 align="center">Application Under Test: The awesome Q/A tool webpage</h4>
<p align="center">
   <img width="750" alt="Application Under Test: The awesome Q/A tool webpage" src="https://github.com/user-attachments/assets/ad5a1123-d5cb-4d08-aa59-4d669b37c369">
</p>

### Approach and project development

The initial approach involved conducting exploratory testing to familiarize with the application, its features, and its boundaries. This allowed for a deeper understanding of the app's functionalities and potential limitations. Following this, a detailed test script was developed to guide the manual functional testing phase, ensuring that all critical aspects of the app were thoroughly evaluated. Based on the insights gained from this manual testing, a draft of test cases for automation was outlined. These test cases were then implemented and iterated using the next best testing practices:

- Smoke Testing: Verified that the basics work smoothly, like pages loading correctly, buttons showing up, and essential elements such as titles and tooltips responding as expected.
- Functional Testing: Ensured that key features like creating, sorting, and deleting questions function properly, even when pushing boundaries, such as dealing with a large number of questions or edge cases.
- Negative Testing: Tested how the app handles errors by trying invalid inputs, like leaving fields empty or going over character limits, ensuring proper error handling.
- Security Testing: Checked for security weaknesses, including vulnerabilities like XSS and SQL injection, ensuring the app sanitizes inputs and remains secure.
- Usability Testing: Evaluated the user interface for ease of use, ensuring tooltips are visible and interactions with questions are smooth.
- State Management: Confirmed that the app handles page reloads and state persistence, maintaining a consistent user experience without losing progress.

### Cross-Browser Testing

The application is tested across all major desktop browsers as well as mobile browsers to ensure consistent performance, layout integrity, and functionality across different platforms and devices.

`Desktop`: Chromium, Firefox, WebKit

`Mobile`: Chrome, Safari

### Test Suite

**Note:** There are no established acceptance criteria for the application under test. As a result, some behaviors may be mistakenly identified as defects or overlooked as such. These issues should be clarified and aligned with the team and the proper requirements.

| **Test Group**                 | **Test Case**                                                                                                              | **Test Case ID** | **Priority** | **Status/Notes**                                                                                                                                                       |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------|------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UI Elements Verification        | should display correct texts for all titles                                                                                | QA-01            | High         | Passed                                                                                                                                                                |
|                                | should display correct text for all buttons                                                                                 | QA-02            | High         | Passed                                                                                                                                                                |
|                                | should display tooltips on hover over 'Created questions' and 'Create a new question' titles                                | QA-03            | Low          | Passed                                                                                                                                                                |
| List and Question Counter       | should show the default question/answer on start and update the question counter                                            | QA-04            | High         | Passed, HTML counter tag could use inner value to better handling the number instead of plain string                                                                   |
|                                | should hide 'No questions yet :-(' message and update question counter to 1 after adding a new question                     | QA-05            | High         | Passed                                                                                                                                                                |
|                                | should allow opening a question without closing others                                                                      | QA-06            | Medium        | Passed                                                                                                                                                                |
|                                | should NOT persist after reloading the page                                                                                 | QA-07            | High         | Passed, IMO this should be the opposite                                                                                                                               |
| Create a new question           | should add a new question at the bottom of the list                                                                         | QA-08            | High         | Passed                                                                                                                                                                |
|                                | should display question counter for three-digit numbers (boundary-value analysis)                                           | QA-09            | High         | Passed                                                                                                                                                                |
|                                | should enforce character limit on question input (boundary-value analysis)                                                  | QA-10            | Low          | Failed, Defect: DE-04, DE-05                                                                                                                                          |
|                                | should enforce character limit on answer input (boundary-value analysis)                                                    | QA-11            | Low          | Failed, Defect: DE-04, DE-06                                                                                                                                          |
|                                | should not create a question if both question and answer fields are empty                                                   | QA-12            | High         | Passed                                                                                                                                                                |
|                                | A question should not be created if either Question or Answer text field is empty                                           | QA-13            | High         | Passed                                                                                                                                                                |
| Sort Questions                  | should sort all questions in ascending order when clicking "Sort questions"                                                | QA-14            | High         | Passed, Defect: DE-03                                                                                                                                                 |
| Remove Questions                | should delete all questions and display "No questions yet :-(" and "Here you can find no questions" messages after clicking "Remove questions" | QA-15            | High         | Passed                                                                                                                                                                |


### Found Defects

| **Defect (Project's Jira)** | **Description**                                                                 | **Severity** |
|-----------------------------|---------------------------------------------------------------------------------|--------------|
| DE-01                       | Duplicate questions creation allowed                                            | High         |
| DE-02                       | Whitespace-only entries permitted in question and answer fields                 | High         |
| DE-03                       | Expanded answers remain expanded after sorting based on position and not in question | Low          |
| DE-04                       | Text disappears in question field after limit reached with long strings (Paste two long strings, +600k chars each) | Low          |
| DE-05                       | Missing character limit functionality on question and answer input              | Low          |
| DE-06                       | Vulnerability to SQL injection/XSS in question and answer fields                | High         |

## Improvements / Possible Next Steps

- **Enhance Mobile Testing:** Use Playwright’s mobile emulation to test responsiveness across different devices/screen sizes, viewports, and ensure mobile-specific features work properly.
- **Test Backend Integration:** Develop and execute test scenarios related to backend functionality and integration to ensure seamless interaction between frontend and backend systems.
- **Conduct Security Testing:** Integrate security testing practices to identify and address vulnerabilities in the application.
- **Expand Test Coverage:** Include more edge cases and update test data regularly to cover a broad range of scenarios and data conditions.
- **Improve Reporting and Metrics:** Use monocart reporter customisation to gain better insights and improve the testing process.
- **Integrate Slack Reporting:** Use Playwright-Slack-Report to automatically publish test results to Slack for real-time updates and detailed notifications.
- **Use Playwright Tagging:** Leverage Playwright’s tagging capabilities to organize and run specific groups of tests, facilitating targeted testing and better test management.
