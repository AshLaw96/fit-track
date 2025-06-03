# Testing

> [!NOTE]
> Return back to the [README.md](README.md) file.

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Directory | File                                                                                             | URL                  | Screenshot                                       | Notes                                     |
| --------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------ | ----------------------------------------- |
| frontend  | [index.html](https://validator.w3.org/nu/?doc=https%3A%2F%2Ffit-track-front-end.onrender.com%2F) | Link in file section | ![screenshot](documentation/validation/html.png) | Showed an error but the script was sorted |

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.

| Directory      | File                                                                                                                                                                           | URL                  | Screenshot                                               | Notes                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| main live site | [index.css](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Ffit-track-front-end.onrender.com%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en) | Link in file section | ![screenshot](documentation/validation/index-css.png)    | This showed a lot of warnings and some errors but majority was because of third-party usage |
| Achieve stars  | [AchievementStars.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                          | Link in file section | ![screenshot](documentation/validation/achieve.css.png)  | No warnings                                                                                 |
| Auth           | [auth.css](https://jigsaw.w3.org/css-validator/validator#warnings)                                                                                                             | Link in file section | ![screenshot](documentation/validation/auth.css.png)     | showed warnings but expected                                                                |
| Auto scroll up | [autoScrollUp.css](https://jigsaw.w3.org/css-validator/validator#css)                                                                                                          | Link in file section | ![screenshot](documentation/validation/scroll.png)       | showed warnings but expected                                                                |
| Chat           | [Chat.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                                      | Link in file section | ![screenshot](documentation/validation/chat.png)         | showed no warnings                                                                          |
| Dark theme     | [dark-theme.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                                | Link in file section | ![screenshot](documentation/validation/dark-theme.png)   | showed warnings but expected                                                                |
| Dash           | [dash.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                                      | Link in file section | ![screenshot](documentation/validation/dash.png)         | showed no warnings                                                                          |
| Delete account | [DeleteAccount.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                             | Link in file section | ![screenshot](documentation/validation/delete.png)       | showed no warnings                                                                          |
| Logout         | [logoutModal.css](https://jigsaw.w3.org/css-validator/validator#warnings)                                                                                                      | Link in file section | ![screenshot](documentation/validation/logout.png)       | showed warnings but expected                                                                |
| Notification   | [NotificationModal.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                         | Link in file section | ![screenshot](documentation/validation/notification.png) | showed warnings but expected                                                                |
| Profile image  | [ProfileImage.css](https://jigsaw.w3.org/css-validator/validator#warnings)                                                                                                     | Link in file section | ![screenshot](documentation/validation/profile.png)      | showed warnings but expected                                                                |
| Setting item   | [SettingItem.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                               | Link in file section | ![screenshot](documentation/validation/setting-item.png) | showed warnings but expected                                                                |
| Settings page  | [SettingsPage.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                              | Link in file section | ![screenshot](documentation/validation/setting-page.png) | showed warnings but expected                                                                |
| Workout        | [Workout.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                                   | Link in file section | ![screenshot](documentation/validation/workout.png)      | showed warnings but expected                                                                |
| Error          | [ErrorPages.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                                | Link in file section | ![screenshot](documentation/validation/error.png)        | showed warnings but expected                                                                |
| Footer         | [footer.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                                    | Link in file section | ![screenshot](documentation/validation/footer.png)       | showed warnings but expected                                                                |
| Header         | [header.css](https://jigsaw.w3.org/css-validator/validator)                                                                                                                    | Link in file section | ![screenshot](documentation/validation/header.png)       | showed warnings but expected                                                                |

### JavaScript

I have used the [ESLint Validator](https://eslint.org/) to validate all of my JS/JSX files.

| Directory                                             | File                                                                                                                                   | URL                      | Screenshot                                                     | Notes                                        |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------- | -------------------------------------------- |
| frontend/src/app                                      | [App.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/App.jsx)                                                        | https://eslint.org/play/ | ![screenshot](documentation/validation/app.png)                | Expected warning as expects standard JS code |
| frontend/src/index                                    | [index.js](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/App.test.js)                                                   | https://eslint.org/play/ | ![screenshot](documentation/validation/index.png)              | Expected warning as expects standard JS code |
| frontend/src/components/autoscrollup                  | [AutoScrollUp.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/AutoScrollUp.jsx)                           | https://eslint.org/play/ | ![screenshot](documentation/validation/scroll-jsx.png)         | Expected warning as expects standard JS code |
| frontend/src/components/errorboundary                 | [ErrorBoundary.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/ErrorBoundary.jsx)                         | https://eslint.org/play/ | ![screenshot](documentation/validation/error-jsx.png)          | Expected warning as expects standard JS code |
| frontend/src/components/footer                        | [Footer.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Footer.jsx)                                       | https://eslint.org/play/ | ![screenshot](documentation/validation/foot.png)               | Expected warning as expects standard JS code |
| frontend/src/components/header                        | [Header.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Header.jsx)                                       | https://eslint.org/play  | ![screenshot](documentation/validation/head-jsx.png)           | Expected warning as expects standard JS code |
| frontend/src/components/navbar                        | [NavBar.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Navbar.jsx)                                       | https://eslint.org/play  | ![screenshot](documentation/validation/nav-jsx.png)            | Expected warning as expects standard JS code |
| frontend/src/components/notfound                      | [NotFound.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/NotFound.jsx)                                   | https://eslint.org/play  | ![screenshot](documentation/validation/not-found.png)          | Expected warning as expects standard JS code |
| frontend/src/components/notificationbell              | [NotificationBell.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/NotificationBell.jsx)                   | https://eslint.org/play  | ![screenshot](documentation/validation/note-bell.png)          | Expected warning as expects standard JS code |
| frontend/src/components/notificationmodal             | [NotificationModal.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/NotificationModal.jsx)                 | https://eslint.org/play  | ![screenshot](documentation/validation/note-modal.png)         | Expected warning as expects standard JS code |
| frontend/src/components/Auth/authpage                 | [AuthPage.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Auth/AuthPage.jsx)                              | https://eslint.org/play  | ![screenshot](documentation/validation/auth-jsx.png)           | Expected warning as expects standard JS code |
| frontend/src/components/Auth/loginform                | [LoginForm.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Auth/LoginForm.jsx)                            | https://eslint.org/play  | ![screenshot](documentation/validation/log-form.png)           | Expected warning as expects standard JS code |
| frontend/src/components/Auth/passwordresetconfirmform | [PasswordRestConfimForm.js](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Auth/PasswordResetConfirmForm.jsx) | https://eslint.org/play  | ![screenshot](documentation/validation/reset-confirm-form.png) | Expected warning as expects standard JS code |
| frontend/src/components/Auth/passwordresetform        | [PasswordResetForm.js](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Auth/PasswordResetForm.jsx)             | https://eslint.org/play  | ![screenshot](documentation/validation/reset-form.png)         | Expected warning as expects standard JS code |
| frontend/src/components/Auth/registerform             | [RegisterForm.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Auth/RegisterForm.jsx)                      | https://eslint.org/play  | ![screenshot](documentation/validation/register.png)           | Expected warning as expects standard JS code |
| frontend/src/components/Dash/activitysummary          | [ActivitySummary.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Dash/ActivitySummary.jsx)                | https://eslint.org/play  | ![screenshot](documentation/validation/active-sum.png)         | Expected warning as expects standard JS code |
| frontend/src/components/Dash/challengesmotivation     | [ChallengesMotivation.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Dash/ChallengesMotivation.jsx)      | https://eslint.org/play  | ![screenshot](documentation/validation/challenge-motivate.png) | Expected warning as expects standard JS code |
| frontend/src/components/Dash/dailygoals               | [DailyGoals.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Dash/DailyGoals.jsx)                          | https://eslint.org/play  | ![screenshot](documentation/validation/goals.png)              | Expected warning as expects standard JS code |
| frontend/src/components/Dash/dashboard                | [Dashboard.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Dash/Dashboard.jsx)                            | https://eslint.org/play  | ![screenshot](documentation/validation/dash-validate.png)      | Expected warning as expects standard JS code |
| frontend/src/components/Dash/guestdash                | [GuestDash.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Dash/GuestDash.jsx)                            | https://eslint.org/play  | ![screenshot](documentation/validation/guest.png)              | Expected warning as expects standard JS code |
| frontend/src/components/Dash/progressanalytics        | [ProgressAnalytics.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Dash/ProgressAnalytics.jsx)            | https://eslint.org/play  | ![screenshot](documentation/validation/progress-analytic.png)  | Expected warning as expects standard JS code |
| frontend/src/components/Dash/userdash                 | [UserDash.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Dash/UserDash.jsx)                              | https://eslint.org/play  | ![screenshot](documentation/validation/user.png)               | Expected warning as expects standard JS code |
| frontend/src/components/Dash/workoutmodalplanner      | [WorkoutModalPlanner.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Dash/WorkoutModalPlanner.jsx)        | https://eslint.org/play  | ![screenshot](documentation/validation/work-modal.png)         | Expected warning as expects standard JS code |
| frontend/src/components/Dash/workoutnutrition         | [WorkoutNutrition.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Dash/WorkoutNutrition.jsx)              | https://eslint.org/play  | ![screenshot](documentation/validation/work-nutrition.png)     | Expected warning as expects standard JS code |
| frontend/src/components/Exercises/exerciseformmodal   | [ExerciseFormModal.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Exercises/ExerciseFormModal.jsx)       | https://eslint.org/play  | ![screenshot](documentation/validation/exercise-modal.png)     | Expected warning as expects standard JS code |
| frontend/src/components/Exercises/exerciselogpage     | [ExerciseLogPage.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Exercises/ExerciseLogPage.jsx)           | https://eslint.org/play  | ![screenshot](documentation/validation/exercise-pg.png)        | Expected warning as expects standard JS code |
| frontend/src/components/Help/chatwidget               | [ChatWidget.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/ChatWidget.jsx)                          | https://eslint.org/play  | ![screenshot](documentation/validation/chat-widget.png)        | No warnings                                  |
| frontend/src/components/Help/contactsupport           | [ContactSupport.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/ContactSupport.jsx)                  | https://eslint.org/play  | ![screenshot](documentation/validation/contact.png)            | Expected warning as expects standard JS code |
| frontend/src/components/Help/faq                      | [FAQ.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/FAQ.jsx)                                        | https://eslint.org/play  | ![screenshot](documentation/validation/faq.png)                | Expected warning as expects standard JS code |
| frontend/src/components/Help/faqitem                  | [FAQItem.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/FAQItem.jsx)                                | https://eslint.org/play  | ![screenshot](documentation/validation/faq-item.png)           | Expected warning as expects standard JS code |
| frontend/src/components/Help/helppage                 | [HelpPage.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/HelpPage.jsx)                              | https://eslint.org/play  | ![screenshot](documentation/validation/help-page.png)          | Expected warning as expects standard JS code |
| frontend/src/components/Help/troubleshooting          | [Troubleshooting.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/Troubleshooting.jsx)                | https://eslint.org/play  | ![screenshot](documentation/validation/troubleshoot.png)       | Expected warning as expects standard JS code |
| frontend/src/components/Help/troubleshootingitem      | [TroubleshootingItem.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/TroubleshootingItem.jsx)        | https://eslint.org/play  | ![screenshot](documentation/validation/troubleshoot-item.png)  | Expected warning as expects standard JS code |
| frontend/src/components/Help/tutorialitem             | [TutorialItem.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/TutorialItem.jsx)                      | https://eslint.org/play  | ![screenshot](documentation/validation/tutorial-item.png)      | Expected warning as expects standard JS code |
| frontend/src/components/Help/tutorials                | [Tutorials.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/Tutorials.jsx#L16)                        | https://eslint.org/play  | ![screenshot](documentation/validation/tutorials.png)          | Expected warning as expects standard JS code |
| frontend/src/components/Help/tutorialsdata            | [TutorialsData.js](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Help/TutorialsData.js)                      | https://eslint.org/play  | ![screenshot](documentation/validation/tutorial-data.png)      | No warnings                                  |
| frontend/src/components/Meals/mealformmodal           | [MealFormModal.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Meals/MealFormModal.jsx)                   | Nhttps://eslint.org/play | ![screenshot](documentation/validation/meal-modal.png)         | Expected warning as expects standard JS code |
| frontend/src/components/Meals/meallogpage             | [MealLogPage.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Meals/MealLogPage.jsx)                       | https://eslint.org/play  | ![screenshot](documentation/validation/meal-page.png)          | Expected warning as expects standard JS code |
| frontend/src/components/Profile/achievementstars      | [AchievementStars.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Profile/AchievementStars.jsx)           | https://eslint.org/play  | ![screenshot](documentation/validation/achieve-star.png)       | Expected warning as expects standard JS code |
| frontend/src/components/Profile/deleteaccount         | [DeleteAccount.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Profile/DeleteAccount.jsx)                 | https://eslint.org/play  | ![screenshot](documentation/validation/delete-account.png)     | Expected warning as expects standard JS code |
| frontend/src/components/Profile/goodbye               | [Goodbye.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Profile/Goodbye.jsx)                             | https://eslint.org/play  | ![screenshot](documentation/validation/bye.png)                | Expected warning as expects standard JS code |
| frontend/src/components/Profile/profileform           | [ProfileForm.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Profile/ProfileForm.jsx)                     | https://eslint.org/play  | ![screenshot](documentation/validation/profile-form.png)       | Expected warning as expects standard JS code |
| frontend/src/components/Profile/profileimage          | [ProfileImage.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Profile/ProfileImage.jsx)                   | https://eslint.org/play  | ![screenshot](documentation/validation/profile-img.png)        | Expected warning as expects standard JS code |
| frontend/src/components/Profile/quickstats            | [QuickStats.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Profile/QuickStats.jsx)                       | https://eslint.org/play  | ![screenshot](documentation/validation/stats.png)              | Expected warning as expects standard JS code |
| frontend/src/components/Profile/userprofile           | [UserProfile.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Profile/UserProfile.jsx)                     | https://eslint.org/play  | ![screenshot](documentation/validation/user-profile.png)       | Expected warning as expects standard JS code |
| frontend/src/components/Settings/changepassword       | [ChangePassword.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Settings/ChangePassword.jsx)              | https://eslint.org/play  | ![screenshot](documentation/validation/change-pass.png)        | Expected warning as expects standard JS code |
| frontend/src/components/Settings/settingdropdown      | [SettingDropdown.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Settings/SettingDropdown.jsx)            | https://eslint.org/play  | ![screenshot](documentation/validation/dropdown.png)           | Expected warning as expects standard JS code |
| frontend/src/components/Settings/settingspage         | [SettingsPage.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Settings/SettingsPage.jsx)                  | https://eslint.org/play  | ![screenshot](documentation/validation/setting-pg.png)         | Expected warning as expects standard JS code |
| frontend/src/components/Settings/settingtoggle        | [SettingToggle.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Settings/SettingToggle.jsx)                | https://eslint.org/play  | ![screenshot](documentation/validation/toggle.png)             | Expected warning as expects standard JS code |
| frontend/src/components/Sleep/alarmsetting            | [AlarmSetting.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Sleep/AlarmSetting.jsx)                     | https://eslint.org/play  | ![screenshot](documentation/validation/alarm.png)              | Expected warning as expects standard JS code |
| frontend/src/components/Sleep/sleepencouragement      | [SleepEncouragement.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Sleep/SleepEncouragement.jsx)         | https://eslint.org/play  | ![screenshot](documentation/validation/sleep-encourage.png)    | Expected warning as expects standard JS code |
| frontend/src/components/Sleep/sleepformmodal          | [SleepFormModal.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Sleep/SleepFormModal.jsx)                 | https://eslint.org/play  | ![screenshot](documentation/validation/sleep-modal.png)        | Expected warning as expects standard JS code |
| frontend/src/components/Sleep/sleeplogchart           | [SleepLogChart.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Sleep/SleepLogChart.jsx)                   | https://eslint.org/play  | ![screenshot](documentation/validation/sleep-chart.png)        | Expected warning as expects standard JS code |
| frontend/src/components/Sleep/sleeploglist            | [SleepLogList.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Sleep/SleepLogList.jsx)                     | https://eslint.org/play  | ![screenshot](documentation/validation/sleep-list.png)         | Expected warning as expects standard JS code |
| frontend/src/components/Sleep/sleeplogpage            | [SleepLogPage.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/components/Sleep/SleepLogPage.jsx)                     | https://eslint.org/play  | ![screenshot](documentation/validation/sleep-pg.png)           | Expected warning as expects standard JS code |
| frontend/src/contexts/authcontext                     | [AuthContext.js](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/contexts/AuthContext.js)                                 | https://eslint.org/play  | ![screenshot](documentation/validation/auth-context.png)       | Expected warning as expects standard JS code |
| frontend/src/contexts/notificationcontext             | [NotificationContext.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/contexts/NotificationContext.jsx)               | https://eslint.org/play  | ![screenshot](documentation/validation/notif-context.png)      | Expected warning as expects standard JS code |
| frontend/src/contexts/themecontext                    | [ThemeContext.jsx](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/contexts/ThemeContext.jsx)                             | https://eslint.org/play  | ![screenshot](documentation/validation/theme.png)              | Expected warning as expects standard JS code |
| frontend/src/contexts/unitscontext                    | [UnitsContext.js](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/contexts/UnitsContext.js)                               | https://eslint.org/play  | ![screenshot](documentation/validation/units.png)              | Expected warning as expects standard JS code |
| frontend/src/utils/notificationtriggers               | [NotificationTriggers.js](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/utils/NotificationTriggers.js)                  | https://eslint.org/play  | ![screenshot](documentation/validation/trigger-notifs.png)     | No warnings                                  |
| frontend/src/utils/api                                | [api.js](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/utils/api.js)                                                    | https://eslint.org/play  | ![screenshot](documentation/validation/api.png)                | No warnings                                  |
| frontend/src/utils/iconhelper                         | [iconHelper.js](https://github.com/AshLaw96/fit-track/blob/main/frontend/src/utils/iconHelper.js)                                      | https://eslint.org/play  | ![screenshot](documentation/validation/icon-help.png)          | Expected warning as expects standard JS code |

### Python

I have used the recommended [PEP8 CI Python Linter](https://pep8ci.herokuapp.com) to validate all of my Python files.

| Directory                   | File                                                                                                   | URL                                                                                                                                              | Screenshot                                                   | Notes     |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | --------- |
| api/tests/model-tests       | [models-tests.py](https://github.com/AshLaw96/fit-track/blob/main/api/tests/model-tests.py)            | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/tests/model-tests.py)       | ![screenshot](documentation/validation/model-tests.png)      | No errors |
| api/tests/serializers-tests | [serializers-tests.py](https://github.com/AshLaw96/fit-track/blob/main/api/tests/serializers-tests.py) | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/tests/serializers-tests.py) | ![screenshot](documentation/validation/serializer-tests.png) | No errors |
| api/tests/view-tests        | [view-tests.py](https://github.com/AshLaw96/fit-track/blob/main/api/tests/view-tests.py)               | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/tests/view-tests.py)        | ![screenshot](documentation/validation/view-test.png)        | No errors |
| api/utils/activity          | [activity.py](https://github.com/AshLaw96/fit-track/blob/main/api/utils/activity.py)                   | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/utils/activity.py)          | ![screenshot](documentation/validation/activity.png)         | No errors |
| api/utils/fitness           | [fitness.py](https://github.com/AshLaw96/fit-track/blob/main/api/utils/fitness.py)                     | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/utils/fitness.py)           | ![screenshot](documentation/validation/fitness.png)          | No errors |
| api/utils/leaderboard       | [leaderboard.py](https://github.com/AshLaw96/fit-track/blob/main/api/utils/leaderboard.py)             | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/utils/leaderboard.py)       | ![screenshot](documentation/validation/leader.png)           | No errors |
| api/utils/notifications     | [notifications.py](https://github.com/AshLaw96/fit-track/blob/main/api/utils/notifications.py)         | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/utils/notifications.py)     | ![screenshot](documentation/validation/notifs.png)           | No errors |
| api/utils/sleep             | [sleep.py](https://github.com/AshLaw96/fit-track/blob/main/api/utils/sleep.py)                         | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/utils/sleep.py)             | ![screenshot](documentation/validation/sleep.png)            | No errors |
| api/admin                   | [admin.py](https://github.com/AshLaw96/fit-track/blob/main/api/admin.py)                               | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/admin.py)                   | ![screenshot](documentation/validation/admin.png)            | No errors |
| api/apps                    | [apps.py](https://github.com/AshLaw96/fit-track/blob/main/api/apps.py)                                 | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/apps.py)                    | ![screenshot](documentation/validation/apps.png)             | No errors |
| api/models                  | [models.py](https://github.com/AshLaw96/fit-track/blob/main/api/models.py)                             | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/models.py)                  | ![screenshot](documentation/validation/model.png)            | No errors |
| api/serializers             | [serializers.py](https://github.com/AshLaw96/fit-track/blob/main/api/serializers.py)                   | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/serializers.py)             | ![screenshot](documentation/validation/serializer.png)       | No errors |
| api/utils/signals           | [signals.py](https://github.com/AshLaw96/fit-track/blob/main/api/signals.py)                           | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/signals.py)                 | ![screenshot](documentation/validation/signal.png)           | No errors |
| api/tasks                   | [tasks.py](https://github.com/AshLaw96/fit-track/blob/main/api/tasks.py)                               | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/tasks.py)                   | ![screenshot](documentation/validation/task.png)             | No errors |
| api/urls                    | [urls.py](https://github.com/AshLaw96/fit-track/blob/main/api/urls.py)                                 | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/urls.py)                    | ![screenshot](documentation/validation/urls.png)             | No errors |
| api/views                   | [views.py](https://github.com/AshLaw96/fit-track/blob/main/api/views.py)                               | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/api/views.py)                   | ![screenshot](documentation/validation/view.png)             | No errors |
| backend/celery              | [celery.py](https://github.com/AshLaw96/fit-track/blob/main/backend/celery.py)                         | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/backend/celery.py)              | ![screenshot](documentation/validation/celery.png)           | No errors |
| backend/urls                | [urls.py](https://github.com/AshLaw96/fit-track/blob/main/backend/urls.py)                             | [PEP8 CI Link](https://pep8ci.herokuapp.com/https://raw.githubusercontent.com/AshLaw96/fit-track/refs/heads/main/backend/urls.py)                | ![screenshot](documentation/validation/back-urls.png)        | No errors |

## Responsiveness

| Page                   | Mobile                                                            | Tablet                                                            | Desktop                                                              | Notes             |
| ---------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------- |
| Register               | ![screenshot](documentation/responsiveness/register-mob.jpg)      | ![screenshot](documentation/responsiveness/register-tab.jpg)      | ![screenshot](documentation/responsiveness/register-pg.png)          | Works as expected |
| Login                  | ![screenshot](documentation/responsiveness/log-mob.jpg)           | ![screenshot](documentation/responsiveness/log-tab.jpg)           | ![screenshot](documentation/responsiveness/login-pg.png)             | Works as expected |
| Profile                | ![screenshot](documentation/responsiveness/profile-mob.jpg)       | ![screenshot](documentation/responsiveness/profile-tab.jpg)       | ![screenshot](documentation/responsiveness/profile-pg.png)           | Works as expected |
| Landing/GuestDash      | ![screenshot](documentation/responsiveness/guest-mob.jpg)         | ![screenshot](documentation/responsiveness/guest-tab.jpg)         | ![screenshot](documentation/responsiveness/guest-landing.png)        | Works as expected |
| Exercise               | ![screenshot](documentation/responsiveness/exercise-mob.jpg)      | ![screenshot](documentation/responsiveness/exercise-tab.jpg)      | ![screenshot](documentation/responsiveness/exercise-pg.png)          | Works as expected |
| Meal                   | ![screenshot](documentation/responsiveness/meal-mob.jpg)          | ![screenshot](documentation/responsiveness/meal-tab.jpg)          | ![screenshot](documentation/responsiveness/meal-pg.png)              | Works as expected |
| Sleep                  | ![screenshot](documentation/responsiveness/sleep-mob.jpg)         | ![screenshot](documentation/responsiveness/sleep-tab.jpg)         | ![screenshot](documentation/responsiveness/sleep-pg.png)             | Works as expected |
| Dashboard              | ![screenshot](documentation/responsiveness/user-dash-mob.jpg)     | ![screenshot](documentation/responsiveness/user-dash-tab.jpg)     | ![screenshot](documentation/responsiveness/user-dash-pg.png)         | Works as expected |
| Settings               | ![screenshot](documentation/responsiveness/setting-mob.jpg)       | ![screenshot](documentation/responsiveness/setting-tab.jpg)       | ![screenshot](documentation/responsiveness/settings-pg.png)          | Works as expected |
| Help                   | ![screenshot](documentation/responsiveness/help-mob.jpg)          | ![screenshot](documentation/responsiveness/help-tab.jpg)          | ![screenshot](documentation/responsiveness/help-support-pg.png)      | Works as expected |
| FAQ                    | ![screenshot](documentation/responsiveness/faq-mob.jpg)           | ![screenshot](documentation/responsiveness/faq-tab.jpg)           | ![screenshot](documentation/responsiveness/faq-pg.png)               | Works as expected |
| Contact Support        | ![screenshot](documentation/responsiveness/contact-mob.jpg)       | ![screenshot](documentation/responsiveness/contact-tab.jpg)       | ![screenshot](documentation/responsiveness/contact-support-pg.png)   | Works as expected |
| Tech Support           | ![screenshot](documentation/responsiveness/tech-support-mob.jpg)  | ![screenshot](documentation/responsiveness/tech-tab.jpg)          | ![screenshot](documentation/responsiveness/troubleshoot-tech-pg.png) | Works as expected |
| Tutorials              | ![screenshot](documentation/responsiveness/guide-mob.jpg)         | ![screenshot](documentation/responsiveness/guide-tab.jpg)         | ![screenshot](documentation/responsiveness/tutorial-guide-pg.png)    | Works as expected |
| Password reset         | ![screenshot](documentation/responsiveness/reset-mob.jpg)         | ![screenshot](documentation/responsiveness/reset-tab.jpg)         | ![screenshot](documentation/responsiveness/reset-pg.png)             | Works as expected |
| Password reset confirm | ![screenshot](documentation/responsiveness/reset-confirm-mob.jpg) | ![screenshot](documentation/responsiveness/reset-confirm-tab.jpg) | ![screenshot](documentation/responsiveness/reset-confirm-pg.png)     | Works as expected |
| 404                    | ![screenshot](documentation/responsiveness/404-mob.jpg)           | ![screenshot](documentation/responsiveness/404-tab.jpg)           | ![screenshot](documentation/responsiveness/404-pg.png)               | Works as expected |
| 500                    | ![screenshot](documentation/responsiveness/500-mob.jpg)           | ![screenshot](documentation/responsiveness/500-tab.jpg)           | ![screenshot](documentation/responsiveness/500-pg.png)               | Works as expected |

## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Page                   | Chrome                                                               | Firefox                                                         | Silk                                                              | Notes             |
| ---------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------- |
| Register               | ![screenshot](documentation/responsiveness/register-pg.png)          | ![screenshot](documentation/browsers/register-firefox.png)      | ![screenshot](documentation/responsiveness/register-tab.jpg)      | Works as expected |
| Login                  | ![screenshot](documentation/responsiveness/login-pg.png)             | ![screenshot](documentation/browsers/log-firefox.png)           | ![screenshot](documentation/responsiveness/log-tab.jpg)           | Works as expected |
| Profile                | ![screenshot](documentation/responsiveness/profile-pg.png)           | ![screenshot](documentation/browsers/profile-firefox.png)       | ![screenshot](documentation/responsiveness/profile-tab.jpg)       | Works as expected |
| Landing/GuestDash      | ![screenshot](documentation/responsiveness/guest-landing.png)        | ![screenshot](documentation/browsers/guest-firefox.png)         | ![screenshot](documentation/responsiveness/guest-tab.jpg)         | Works as expected |
| Exercise               | ![screenshot](documentation/responsiveness/exercise-pg.png)          | ![screenshot](documentation/browsers/exercise-firefox.png)      | ![screenshot](documentation/responsiveness/exercise-tab.jpg)      | Works as expected |
| Meal                   | ![screenshot](documentation/responsiveness/meal-pg.png)              | ![screenshot](documentation/browsers/meal-firefox.png)          | ![screenshot](documentation/responsiveness/meal-tab.jpg)          | Works as expected |
| Sleep                  | ![screenshot](documentation/responsiveness/sleep-pg.png)             | ![screenshot](documentation/browsers/sleep-firefox.png)         | ![screenshot](documentation/responsiveness/sleep-tab.jpg)         | Works as expected |
| Dashboard              | ![screenshot](documentation/responsiveness/user-dash-pg.png)         | ![screenshot](documentation/browsers/user-dash-firefox.png)     | ![screenshot](documentation/responsiveness/user-dash-tab.jpg)     | Works as expected |
| Settings               | ![screenshot](documentation/responsiveness/settings-pg.png)          | ![screenshot](documentation/browsers/setting-firefox.png)       | ![screenshot](documentation/responsiveness/setting-tab.jpg)       | Works as expected |
| Help                   | ![screenshot](documentation/responsiveness/help-support-pg.png)      | ![screenshot](documentation/browsers/help-firefox.png)          | ![screenshot](documentation/responsiveness/help-tab.jpg)          | Works as expected |
| FAQ                    | ![screenshot](documentation/responsiveness/faq-pg.png)               | ![screenshot](documentation/browsers/faq-firefox.png)           | ![screenshot](documentation/responsiveness/faq-tab.jpg)           | Works as expected |
| Contact support        | ![screenshot](documentation/responsiveness/contact-support-pg.png)   | ![screenshot](documentation/browsers/contact-firefox.png)       | ![screenshot](documentation/responsiveness/contact-tab.jpg)       | Works as expected |
| Tech support           | ![screenshot](documentation/responsiveness/troubleshoot-tech-pg.png) | ![screenshot](documentation/browsers/tech-firefox.png)          | ![screenshot](documentation/responsiveness/tech-tab.jpg)          | Works as expected |
| Tutorials              | ![screenshot](documentation/responsiveness/tutorial-guide-pg.png)    | ![screenshot](documentation/browsers/guide-firefox.png)         | ![screenshot](documentation/responsiveness/guide-tab.jpg)         | Works as expected |
| Password reset         | ![screenshot](documentation/responsiveness/reset-pg.png)             | ![screenshot](documentation/browsers/reset-firefox.png)         | ![screenshot](documentation/responsiveness/reset-tab.jpg)         | Works as expected |
| Password reset confirm | ![screenshot](documentation/responsiveness/reset-confirm-pg.png)     | ![screenshot](documentation/browsers/reset-confirm-firefox.png) | ![screenshot](documentation/responsiveness/reset-confirm-tab.jpg) | Works as expected |
| 404                    | ![screenshot](documentation/responsiveness/404-pg.png)               | ![screenshot](documentation/browsers/404-firefox.png)           | ![screenshot](documentation/responsiveness/404-tab.jpg)           | Works as expected |
| 500                    | ![screenshot](documentation/responsiveness/500-pg.png)               | ![screenshot](documentation/browsers/500-firefox.png)           | ![screenshot](documentation/responsiveness/500-tab.jpg)           | Works as expected |

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues. Some warnings are outside of my control, and mobile results tend to be lower than desktop.

| Page             | Mobile                                                              | Desktop                                                              |
| ---------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Register         | ![screenshot](documentation/lighthouse/mobile-register.png)         | ![screenshot](documentation/lighthouse/desktop-register.png)         |
| Login            | ![screenshot](documentation/lighthouse/mobile-login.png)            | ![screenshot](documentation/lighthouse/desktop-login.png)            |
| Profile          | ![screenshot](documentation/lighthouse/mobile-profile.png)          | ![screenshot](documentation/lighthouse/desktop-profile.png)          |
| Home             | ![screenshot](documentation/lighthouse/mobile-home.png)             | ![screenshot](documentation/lighthouse/desktop-home.png)             |
| Products         | ![screenshot](documentation/lighthouse/mobile-products.png)         | ![screenshot](documentation/lighthouse/desktop-products.png)         |
| Product Details  | ![screenshot](documentation/lighthouse/mobile-product-details.png)  | ![screenshot](documentation/lighthouse/desktop-product-details.png)  |
| Bag              | ![screenshot](documentation/lighthouse/mobile-bag.png)              | ![screenshot](documentation/lighthouse/desktop-bag.png)              |
| Checkout         | ![screenshot](documentation/lighthouse/mobile-checkout.png)         | ![screenshot](documentation/lighthouse/desktop-checkout.png)         |
| Checkout Success | ![screenshot](documentation/lighthouse/mobile-checkout-success.png) | ![screenshot](documentation/lighthouse/desktop-checkout-success.png) |
| Add Product      | ![screenshot](documentation/lighthouse/mobile-add-product.png)      | ![screenshot](documentation/lighthouse/desktop-add-product.png)      |
| Edit Product     | ![screenshot](documentation/lighthouse/mobile-edit-product.png)     | ![screenshot](documentation/lighthouse/desktop-edit-product.png)     |
| Newsletter       | ![screenshot](documentation/lighthouse/mobile-newsletter.png)       | ![screenshot](documentation/lighthouse/desktop-newsletter.png)       |
| Contact          | ![screenshot](documentation/lighthouse/mobile-contact.png)          | ![screenshot](documentation/lighthouse/desktop-contact.png)          |
| 404              | ![screenshot](documentation/lighthouse/mobile-404.png)              | ![screenshot](documentation/lighthouse/desktop-404.png)              |

## Defensive Programming

⚠️ INSTRUCTIONS ⚠️

Defensive programming (defensive design) is extremely important! When building projects that accept user inputs or forms, you should always test the level of security for each form field. Examples of this could include (but not limited to):

All Projects:

- Users cannot submit an empty form (add the `required` attribute)
- Users must enter valid field types (ensure the correct input `type=""` is used)
- Users cannot brute-force a URL to navigate to a restricted pages

Python Projects:

- Users cannot perform CRUD functionality if not authenticated (if login functionality exists)
- User-A should not be able to manipulate data belonging to User-B, or vice versa
- Non-Authenticated users should not be able to access pages that require authentication
- Standard users should not be able to access pages intended for superusers/admins

You'll want to test all functionality on your application, whether it's a standard form, or CRUD functionality, for data manipulation on a database. Try to access various pages on your site as different user types (User-A, User-B, guest user, admin, superuser). You should include any manual tests performed, and the expected results/outcome.

Testing should be replicable (can someone else replicate the same outcome?). Ideally, tests cases should focus on each individual section of every page on the website. Each test case should be specific, objective, and step-wise replicable.

Instead of adding a general overview saying that everything works fine, consider documenting tests on each element of the page (eg. button clicks, input box validation, navigation links, etc.) by testing them in their "happy flow", their "bad/exception flow", mentioning the expected and observed results, and drawing a parallel between them where applicable.

Consider using the following format for manual test cases:

- Expected Outcome / Test Performed / Result Received / Fixes Implemented

- **Expected**: "Feature is expected to do X when the user does Y."
- **Testing**: "Tested the feature by doing Y."
- (either) **Result**: "The feature behaved as expected, and it did Y."
- (or) **Result**: "The feature did not respond to A, B, or C."
- **Fix**: "I did Z to the code because something was missing."

Use the table below as a basic start, and expand on it using the logic above.

⚠️ --- END --- ⚠️

Defensive programming was manually tested with the below user acceptance testing:

| Page               | Expectation                                                                             | Test                                                                                | Result                                                                                 | Screenshot                                                    |
| ------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Products           | Feature is expected to allow users to browse products without registration.             | Opened product pages as a guest user.                                               | Products were fully accessible without requiring registration.                         | ![screenshot](documentation/defensive/products.png)           |
|                    | Feature is expected to sort products by price and name.                                 | Tested sorting options for price (low-to-high/high-to-low) and name (alphabetical). | Sorting worked correctly for all options.                                              | ![screenshot](documentation/defensive/sorting.png)            |
|                    | Feature is expected to filter products by category.                                     | Applied category filters while browsing products.                                   | Filters worked as expected, displaying only relevant products.                         | ![screenshot](documentation/defensive/filtering.png)          |
|                    | Feature is expected to show detailed product information.                               | Clicked on individual products to view details.                                     | Product details (description, price, image) were displayed correctly.                  | ![screenshot](documentation/defensive/product-details.png)    |
| Shopping Cart      | Feature is expected to allow customers to add items to the cart with quantity controls. | Added products to the cart and adjusted quantities.                                 | Items were added successfully, and quantities updated as expected.                     | ![screenshot](documentation/defensive/add-to-cart.png)        |
|                    | Feature is expected to allow customers to view and manage their cart.                   | Opened the cart page and edited cart contents.                                      | Cart contents were displayed, updated, and removed correctly.                          | ![screenshot](documentation/defensive/manage-cart.png)        |
| Checkout           | Feature is expected to display cart items, grand total, and input fields for checkout.  | Proceeded to checkout with items in the cart.                                       | Checkout page displayed cart items, total, and input fields as expected.               | ![screenshot](documentation/defensive/checkout.png)           |
|                    | Feature is expected to allow secure payment via Stripe.                                 | Entered valid card details using Stripe at checkout.                                | Payment was processed securely, and an order confirmation page was displayed.          | ![screenshot](documentation/defensive/stripe-payment.png)     |
|                    | Feature is expected to send a confirmation email after purchase.                        | Completed a purchase and checked email inbox.                                       | Confirmation email was received with order details.                                    | ![screenshot](documentation/defensive/confirmation-email.png) |
|                    | Feature is expected to display an order confirmation page with an order number.         | Completed a purchase.                                                               | Order confirmation page displayed successfully with an order number.                   | ![screenshot](documentation/defensive/order-confirmation.png) |
| Account Management | Feature is expected to allow returning customers to log in and view past orders.        | Logged in as a returning customer and accessed order history.                       | Past orders were displayed correctly in the account section.                           | ![screenshot](documentation/defensive/order-history.png)      |
|                    | Feature is expected to remember the shipping address for returning customers.           | Completed multiple checkouts as a returning customer.                               | Shipping address was pre-filled on subsequent purchases.                               | ![screenshot](documentation/defensive/saved-address.png)      |
| Admin Features     | Feature is expected to allow the site owner to create new products.                     | Created new products with valid data (name, price, description, image, category).   | Products were added successfully and displayed on the site.                            | ![screenshot](documentation/defensive/create-product.png)     |
|                    | Feature is expected to allow the site owner to update product details.                  | Edited product details as an admin user.                                            | Product updates were saved and displayed correctly.                                    | ![screenshot](documentation/defensive/update-product.png)     |
|                    | Feature is expected to allow the site owner to delete products.                         | Deleted a product from the inventory.                                               | Product was removed successfully from the site, after being prompted to confirm first. | ![screenshot](documentation/defensive/delete-product.png)     |
| Orders             | Feature is expected to allow the site owner to view all orders placed.                  | Accessed the orders dashboard as an admin user.                                     | All orders were displayed correctly.                                                   | ![screenshot](documentation/defensive/view-orders.png)        |
| Newsletter         | Feature is expected to allow users to sign up for the newsletter.                       | Submitted valid email addresses for newsletter registration.                        | Email addresses were successfully added to the newsletter list.                        | ![screenshot](documentation/defensive/newsletter.png)         |
| 404 Error Page     | Feature is expected to display a 404 error page for non-existent pages.                 | Navigated to an invalid URL (e.g., `/test`).                                        | A custom 404 error page was displayed as expected.                                     | ![screenshot](documentation/defensive/404.png)                |

#### Back-End Testing

| Step | What testing                              | URL                                               | HTTP Method | Headers                            | Body    | Outcome                                                     | Screenshot                                                                        |
| ---- | ----------------------------------------- | ------------------------------------------------- | ----------- | ---------------------------------- | ------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------- | --- |
| 1    | Register new user                         | `http://127.0.0.1:8000/api/register/`             | POST        | Content-Type: application/json     | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-register.png)              |
| 2    | Login (token)                             | `http://127.0.0.1:8000/api/token/`                | POST        | Content-Type: application/json     | JSON    | Worked correctly and returned the refresh and access tokens | ![screenshot](documentation/defensive/back-end/postman-login.png)                 |
| 3    | Refresh token                             | `http://127.0.0.1:8000/api/token/refresh/`        | POST        | Content-Type: application/json     | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-refresh.png)               |
| 4    | View profile (authenticated)              | `http://127.0.0.1:8000/api/profile/`              | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-profile.png)               |
| 5    | View goals (authenticated)                | `http://127.0.0.1:8000/api/goals/`                | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-goal-get.png)              |
| 6    | View meals (authenticated)                | `http://127.0.0.1:8000/api/meals/`                | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-meals-get.png)             |
| 7    | View sleep_logs (authenticated)           | `http://127.0.0.1:8000/api/sleep_logs/`           | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-sleep-logs-get.png)        |
| 8    | View nutrition_logs (authenticated)       | `http://127.0.0.1:8000/api/nutrition_logs/`       | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-nutrition-get.png)         |
| 9    | View achievements (authenticated)         | `http://127.0.0.1:8000/api/achievements/`         | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-achieve-get.png)           |
| 10   | View activity (authenticated)             | `http://127.0.0.1:8000/api/activity/`             | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-activity-get.png)          |
| 11   | View progress (authenticated)             | `http://127.0.0.1:8000/api/progress/`             | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-progress-get.png)          |
| 12   | View streak (authenticated)               | `http://127.0.0.1:8000/api/streak/`               | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-streak.png)                |
| 13   | View daily_logs (authenticated)           | `http://127.0.0.1:8000/api/daily_logs/`           | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-day-logs-get.png)          |
| 14   | View challenges (authenticated)           | `http://127.0.0.1:8000/api/challenges/`           | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-challenges-get.png)        |
| 15   | View user_challenges (authenticated)      | `http://127.0.0.1:8000/api/user_challenges/`      | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-user-challenges-get.png)   |
| 16   | View user_reports (authenticated)         | `http://127.0.0.1:8000/api/user_reports/`         | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-reports-get.png)           |
| 17   | View friends (authenticated)              | `http://127.0.0.1:8000/api/friends/`              | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-friends-get.png)           |
| 17   | View workout_plans (authenticated)        | `http://127.0.0.1:8000/api/workout_plans/`        | GET         | Authorization: Bearer ACCESS_TOKEN | No body | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-workout-get.png)           |
| 18   | Add goals (authenticated)                 | `http://127.0.0.1:8000/api/goals/`                | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-goals-post.png)            |
| 19   | Add meals (authenticated)                 | `http://127.0.0.1:8000/api/meals/`                | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-meal-post.png)             |
| 20   | Add sleep_logs (authenticated)            | `http://127.0.0.1:8000/api/sleep_logs/`           | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-sleep-post.png)            |
| 21   | Add nutrition_logs (authenticated)        | `http://127.0.0.1:8000/api/nutrition_logs/`       | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-nutrition-post.png)        |
| 22   | Add achievements (authenticated)          | `http://127.0.0.1:8000/api/achievements/`         | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-achieve-post.png)          |
| 23   | Add activity (authenticated)              | `http://127.0.0.1:8000/api/activity/`             | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-activity-post.png)         |
| 24   | Add progress (authenticated)              | `http://127.0.0.1:8000/api/progress/`             | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-progress-post.png)         |
| 25   | Add streak (authenticated)                | `http://127.0.0.1:8000/api/streak/`               | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-streak-post.png)           |
| 26   | Add daily_logs (authenticated)            | `http://127.0.0.1:8000/api/daily_logs/`           | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-daily-post.png)            |
| 27   | Add challenges (authenticated)            | `http://127.0.0.1:8000/api/challenges/`           | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-challenge-post.png)        |
| 28   | Add user_challenges (authenticated)       | `http://127.0.0.1:8000/api/user_challenges/`      | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-user-challenge-post.png)   |
| 29   | Add user_reports (authenticated)          | `http://127.0.0.1:8000/api/user_reports/`         | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-report-post.png)           |
| 30   | Add friends (authenticated)               | `http://127.0.0.1:8000/api/friends/`              | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-friend-post.png)           |
| 31   | Add workout_plans (authenticated)         | `http://127.0.0.1:8000/api/workout_plans/`        | POST        | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-workout-post.png)          |
| 32   | Update all goal (authenticated)           | `http://127.0.0.1:8000/api/goals/<ID>/`           | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-goals-put.png)             |
| 33   | Update all meal (authenticated)           | `http://127.0.0.1:8000/api/meals/<ID>/`           | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-meal-put.png)              |
| 34   | Update all sleep_log (authenticated)      | `http://127.0.0.1:8000/api/sleep_logs/<ID>/`      | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-sleep-put.png)             |
| 35   | Update all nutrition_log (authenticated)  | `http://127.0.0.1:8000/api/nutrition_logs/<ID>/`  | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-nutrition-put.png)         |
| 36   | Update all achievement (authenticated)    | `http://127.0.0.1:8000/api/achievements/<ID>/`    | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-achieve-put.png)           |
| 37   | Update all activity (authenticated)       | `http://127.0.0.1:8000/api/activity/<ID>/`        | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-active-put.png)            |
| 38   | Update all progress (authenticated)       | `http://127.0.0.1:8000/api/progress/<ID>/`        | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-progress-put.png)          |     |
| 39   | Update all daily_log (authenticated)      | `http://127.0.0.1:8000/api/daily_logs/<ID>/`      | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-daily-put.png)             |
| 40   | Update all challenge (authenticated)      | `http://127.0.0.1:8000/api/challenges/<ID>/`      | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-challenge-put.png)         |
| 41   | Update all user_challenge (authenticated) | `http://127.0.0.1:8000/api/user_challenges/<ID>/` | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-user-challnge-put.png)     |
| 42   | Update all user_report (authenticated)    | `http://127.0.0.1:8000/api/user_reports/<ID>/`    | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-report-put.png)            |
| 43   | Update all workout_plan (authenticated)   | `http://127.0.0.1:8000/api/workout_plans/<ID>/`   | PUT         | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-workout-put.png)           |
| 44   | Update goal (authenticated)               | `http://127.0.0.1:8000/api/goals/<ID>/`           | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-goals-patch.png)           |
| 45   | Update meal (authenticated)               | `http://127.0.0.1:8000/api/meals/<ID>/`           | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-meal-patch.png)            |
| 46   | Update sleep_log (authenticated)          | `http://127.0.0.1:8000/api/sleep_logs/<ID>/`      | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-sleep-patch.png)           |
| 47   | Update nutrition_log (authenticated)      | `http://127.0.0.1:8000/api/nutrition_logs/<ID>/`  | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-nutrition-patch.png)       |
| 48   | Update achievements (authenticated)       | `http://127.0.0.1:8000/api/achievements/<ID>/`    | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-achieve-patch.png)         |
| 49   | Update activity (authenticated)           | `http://127.0.0.1:8000/api/activity/<ID>/`        | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-active-patch.png)          |
| 50   | Update progress (authenticated)           | `http://127.0.0.1:8000/api/progress/<ID>/`        | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-progress-patch.png)        |     |
| 51   | Update daily_log (authenticated)          | `http://127.0.0.1:8000/api/daily_logs/<ID>/`      | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-daily-patch.png)           |
| 52   | Update challenge (authenticated)          | `http://127.0.0.1:8000/api/challenges/<ID>/`      | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-challenge-patch.png)       |
| 53   | Update user_challenge (authenticated)     | `http://127.0.0.1:8000/api/user_challenges/<ID>/` | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-user-challenge-patch.png)  |
| 54   | Update user_report (authenticated)        | `http://127.0.0.1:8000/api/user_reports/<ID>/`    | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-report-patch.png)          |
| 55   | Update workout_plans (authenticated)      | `http://127.0.0.1:8000/api/workout_plans/<ID>/`   | PATCH       | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-workout-patch.png)         |
| 56   | Remove goals (authenticated)              | `http://127.0.0.1:8000/api/goals/<ID>/`           | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-goals-delete.png)          |
| 57   | Remove meals (authenticated)              | `http://127.0.0.1:8000/api/meals/<ID>/`           | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-meal-delete.png)           |
| 58   | Remove sleep_logs (authenticated)         | `http://127.0.0.1:8000/api/sleep_logs/<ID>/`      | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-sleep-delete.png)          |
| 59   | Remove nutrition_logs (authenticated)     | `http://127.0.0.1:8000/api/nutrition_logs/<ID>/`  | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-nutrition-delete.png)      |
| 60   | Remove achievements (authenticated)       | `http://127.0.0.1:8000/api/achievements/<ID>/`    | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-achieve-delete.png)        |
| 61   | Remove progress (authenticated)           | `http://127.0.0.1:8000/api/progress/<ID>/`        | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-progress-delete.png)       |     |
| 62   | Remove daily_logs (authenticated)         | `http://127.0.0.1:8000/api/daily_logs/<ID>/`      | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-daily-delete.png)          |
| 63   | Remove challenges (authenticated)         | `http://127.0.0.1:8000/api/challenges/<ID>/`      | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-challenge-delete.png)      |
| 64   | Remove user_challenges (authenticated)    | `http://127.0.0.1:8000/api/user_challenges/<ID>/` | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-user-challenge-delete.png) |
| 65   | Remove user_reports (authenticated)       | `http://127.0.0.1:8000/api/user_reports/<ID>/`    | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-report-delete.png)         |
| 66   | Remove friends (authenticated)            | `http://127.0.0.1:8000/api/friends/<ID>/`         | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-friend-delete.png)         |
| 77   | Remove workout_plans (authenticated)      | `http://127.0.0.1:8000/api/workout_plans/<ID>/`   | DELETE      | Authorization: Bearer ACCESS_TOKEN | JSON    | Worked correctly                                            | ![screenshot](documentation/defensive/back-end/postman-workout-delete.png)        |

- As expected when no token was added e.g. an unauthorised user, each endpoint which required authorisation showed a 401 error code.

## User Story Testing

⚠️ INSTRUCTIONS ⚠️

Testing User Stories is actually quite simple, once you've already got the stories defined on your README.

Most of your project's **Features** should already align with the **User Stories**, so this should be as simple as creating a table with the User Story, matching with the re-used screenshot from the respective Feature.

⚠️ --- END --- ⚠️

| Target                  | Expectation                                                                                                                              | Outcome                                                                            | Screenshot                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------- |
| As a guest user         | I would like to browse products without needing to register                                                                              | so that I can shop freely before deciding to create an account.                    | ![screenshot](documentation/features/feature01.png) |
| As a guest user         | I would like to be prompted to create an account or log in at checkout                                                                   | so that I can complete my purchase and track my order history.                     | ![screenshot](documentation/features/feature02.png) |
| As a user               | I would like to sign up to the site's newsletter                                                                                         | so that I can stay up to date with any upcoming sales or promotions.               | ![screenshot](documentation/features/feature03.png) |
| As a customer           | I would like to browse various product categories (clothing, toys, jewelry, kitchen gadgets, etc.)                                       | so that I can easily find what I'm looking for.                                    | ![screenshot](documentation/features/feature04.png) |
| As a customer           | I would like to sort products by price (low-to-high/high-to-low) and name (alphabetical)                                                 | so that I can quickly organize items in a way that suits my shopping style.        | ![screenshot](documentation/features/feature05.png) |
| As a customer           | I would like to filter products by category                                                                                              | so that I can narrow down the products to the types I am most interested in.       | ![screenshot](documentation/features/feature06.png) |
| As a customer           | I would like to click on individual products to view more details (description, price, image, etc.)                                      | so that I can make an informed decision about my purchase.                         | ![screenshot](documentation/features/feature07.png) |
| As a customer           | I would like to add items to my shopping cart using quantity increment/decrement buttons                                                 | so that I can adjust how many units of a product I want before checkout.           | ![screenshot](documentation/features/feature08.png) |
| As a customer           | I would like to view and manage my shopping cart                                                                                         | so that I can review, add, or remove items before proceeding to checkout.          | ![screenshot](documentation/features/feature09.png) |
| As a customer           | I would like to adjust the quantity of items in my cart                                                                                  | so that I can modify my purchase preferences without leaving the cart.             | ![screenshot](documentation/features/feature10.png) |
| As a customer           | I would like to remove items from my cart                                                                                                | so that I can remove products I no longer wish to buy.                             | ![screenshot](documentation/features/feature11.png) |
| As a customer           | I would like to proceed to checkout where I see my cart items, grand total, and input my name, email, shipping address, and card details | so that I can complete my purchase.                                                | ![screenshot](documentation/features/feature12.png) |
| As a customer           | I would like to receive a confirmation email after my purchase                                                                           | so that I can have a record of my transaction and order details.                   | ![screenshot](documentation/features/feature13.png) |
| As a customer           | I would like to see an order confirmation page with a checkout order number after completing my purchase                                 | so that I know my order has been successfully placed.                              | ![screenshot](documentation/features/feature14.png) |
| As a customer           | I would like to securely enter my card details using Stripe at checkout                                                                  | so that I can feel confident my payment information is protected.                  | ![screenshot](documentation/features/feature15.png) |
| As a returning customer | I would like to be able to log in and view my past orders                                                                                | so that I can track my previous purchases and order history.                       | ![screenshot](documentation/features/feature16.png) |
| As a returning customer | I would like the checkout process to remember my shipping address                                                                        | so that future purchases are quicker and easier.                                   | ![screenshot](documentation/features/feature17.png) |
| As a site owner         | I would like to create new products with a name, description, price, images, and category                                                | so that I can add additional items to the store inventory.                         | ![screenshot](documentation/features/feature18.png) |
| As a site owner         | I would like to update product details (name, price, description, image, category) at any time                                           | so that I can keep my product listings accurate and up to date.                    | ![screenshot](documentation/features/feature19.png) |
| As a site owner         | I would like to delete products that are no longer available or relevant                                                                 | so that I can maintain a clean and accurate inventory.                             | ![screenshot](documentation/features/feature20.png) |
| As a site owner         | I would like to view all orders placed on the website                                                                                    | so that I can track and manage customer purchases.                                 | ![screenshot](documentation/features/feature21.png) |
| As a site owner         | I would like to manage product categories                                                                                                | so that I can ensure items are correctly organized and easy for customers to find. | ![screenshot](documentation/features/feature22.png) |
| As a user               | I would like to see a 404 error page if I get lost                                                                                       | so that it's obvious that I've stumbled upon a page that doesn't exist.            | ![screenshot](documentation/features/feature23.png) |

## Automated Testing

I have conducted a series of automated tests on my application.

> [!NOTE]
> I fully acknowledge and understand that, in a real-world scenario, an extensive set of additional tests would be more comprehensive.

### JavaScript (Jest Testing)

⚠️ INSTRUCTIONS ⚠️

Adjust the code below (file names, function names, etc.) to match your own project files/folders. Use these notes loosely when documenting your own Jest procedures, and remove/adjust where applicable.

⚠️ SAMPLE ⚠️

I have used the [Jest](https://jestjs.io) JavaScript testing framework to test the application functionality. In order to work with Jest, I first had to initialize NPM.

- `npm init`
- Hit `<enter>` for all options, except for **test command:**, just type `jest`.

Add Jest to a list called **Dev Dependencies** in a dev environment:

- `npm install --save-dev jest`

**IMPORTANT**: Initial configurations

When creating test files, the name of the file needs to be `file-name.test.js` in order for Jest to properly work. Without the following, Jest won't properly run the tests:

- `npm install -D jest-environment-jsdom`

Due to a change in Jest's default configuration, you'll need to add the following code to the top of the `.test.js` file:

```js
/**
 * @jest-environment jsdom
 */

const { test, expect } = require("@jest/globals");
const { function1, function2, function3, etc. } = require("../script-name");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});
```

Remember to adjust the `fs.readFileSync()` to the specific file you'd like you test. The example above is testing the `index.html` file.

Finally, at the bottom of the script file where your primary scripts are written, include the following at the very bottom of the file. Make sure to include the name of all of your functions that are being tested in the `.test.js` file.

```js
if (typeof module !== "undefined") module.exports = {
    function1, function2, function3, etc.
};
```

Now that these steps have been undertaken, further tests can be written, and be expected to fail initially. Write JS code that can get the tests to pass as part of the Red-Green refactor process. Once ready, to run the tests, use this command:

- `npm test`

**NOTE**: To obtain a coverage report, use the following command:

- `npm test --coverage`

Below are the results from the tests that I've written for this application:

| Test Suites | Tests     | Screenshot                                                |
| ----------- | --------- | --------------------------------------------------------- |
| 1 passed    | 16 passed | ![screenshot](documentation/automation/jest-coverage.png) |

#### Jest Test Issues

⚠️ INSTRUCTIONS ⚠️

Use this section to list any known issues you ran into while writing your Jest tests. Remember to include screenshots (where possible), and a solution to the issue (if known). This can be used for both "fixed" and "unresolved" issues. Remove this sub-section entirely if you somehow didn't run into any issues while working with Jest.

⚠️ --- END --- ⚠️

## Bugs

⚠️ INSTRUCTIONS ⚠️

Nobody likes bugs,... except the assessors! Projects seem more suspicious if a student doesn't properly track their bugs. If you're about to submit your project without any bugs listed below, you should ask yourself why you're doing this course in the first place, if you're able to build this entire application without running into any bugs. The best thing you can do for any project is to document your bugs! Not only does it show the true stages of development, but think of it as breadcrumbs for yourself in the future, should you encounter the same/similar bug again, it acts as a gentle reminder on what you did to fix the bug.

If/when you encounter bugs during the development stages of your project, you should document them here, ideally with a screenshot explaining what the issue was, and what you did to fix the bug.

Alternatively, an improved way to manage bugs is to use the built-in **[Issues](https://www.github.com/AshLaw96/fit-track/issues)** tracker on your GitHub repository. This can be found at the top of your repository, the tab called "Issues".

If using the Issues tracker for bug management, you can simplify the documentation process for testing. Issues allow you to directly paste screenshots into the issue page without having to first save the screenshot locally. You can add labels to your issues (e.g. `bug`), assign yourself as the owner, and add comments/updates as you progress with fixing the issue(s). Once you've solved the issue/bug, you should then "Close" it.

When showcasing your bug tracking for assessment, you can use the following examples below.

⚠️ --- END --- ⚠️

### Fixed Bugs

[![GitHub issue custom search](https://img.shields.io/github/issues-search?query=repo%3AAshLaw96%2Ffit-track%20label%3Abug&label=bugs)](https://www.github.com/AshLaw96/fit-track/issues?q=is%3Aissue+is%3Aclosed+label%3Abug)

I've used [GitHub Issues](https://www.github.com/AshLaw96/fit-track/issues) to track and manage bugs and issues during the development stages of my project.

All previously closed/fixed bugs can be tracked [here](https://www.github.com/AshLaw96/fit-track/issues?q=is%3Aissue+is%3Aclosed+label%3Abug).

![screenshot](documentation/bugs/gh-issues-closed.png)

### Unfixed Bugs

⚠️ INSTRUCTIONS ⚠️

You will need to mention any unfixed bugs and why they are not fixed upon submission of your project. This section should include shortcomings of the frameworks or technologies used. Although time can be a big variable to consider, paucity of time and difficulty understanding implementation is not a valid reason to leave bugs unfixed. Where possible, you must fix all outstanding bugs, unless outside of your control.

If you've identified any unfixed bugs, no matter how small, be sure to list them here! It's better to be honest and list them, because if it's not documented and an assessor finds the issue, they need to know whether or not you're aware of them as well, and why you've not corrected/fixed them.

⚠️ --- END --- ⚠️

[![GitHub issues](https://img.shields.io/github/issues/AshLaw96/fit-track)](https://www.github.com/AshLaw96/fit-track/issues)

Any remaining open issues can be tracked [here](https://www.github.com/AshLaw96/fit-track/issues).

![screenshot](documentation/bugs/gh-issues-open.png)

### Known Issues

| Issue                                                                                                                             | Screenshot                                               |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| On devices smaller than 375px, the page starts to have horizontal `overflow-x` scrolling.                                         | ![screenshot](documentation/issues/overflow.png)         |
| When validating HTML with a semantic `<section>` element, the validator warns about lacking a header `h2-h6`. This is acceptable. | ![screenshot](documentation/issues/section-header.png)   |
| Validation errors on "signup.html" coming from the Django Allauth package.                                                        | ![screenshot](documentation/issues/allauth.png)          |
| With a known order-number, users can brute-force "checkout_success.html" and see potentially sensitive information.               | ![screenshot](documentation/issues/checkout-success.png) |
| If a product is in your bag/cart, but then gets deleted from the database, it throws errors from the session storage memory.      | ![screenshot](documentation/issues/session-storage.png)  |
| The `-`/`+` quantity buttons work well on "product_details.html", but not on "bag.html".                                          | ![screenshot](documentation/issues/quantity-buttons.png) |

> [!IMPORTANT]
> There are no remaining bugs that I am aware of, though, even after thorough testing, I cannot rule out the possibility.
