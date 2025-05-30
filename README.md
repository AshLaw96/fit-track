# [fit-track](https://fit-track-project-8ab24fa880fe.herokuapp.com)

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/AshLaw96/fit-track)](https://www.github.com/AshLaw96/fit-track/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/AshLaw96/fit-track)](https://www.github.com/AshLaw96/fit-track/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/AshLaw96/fit-track)](https://www.github.com/AshLaw96/fit-track)

This Fitness Tracker App is designed to help users take control of their health and wellness by providing an all-in-one platform for tracking exercise, meals, and sleep habits. Whether they're looking to improve fitness, maintain a healthy lifestyle, or simply enjoy working out, this app offers the tools and insights needed to stay on top of their health journey.

The app allows users to log workouts, track their nutrition, and monitor sleep patterns to gain a comprehensive understanding of their daily habits. By integrating these three key aspects of health, users can identify trends, set goals, and make informed decisions to optimise their well-being. The goal is to provide a seamless and intuitive experience that encourages consistency and helps users stay accountable.

This app is ideal for anyone looking to improve or maintain their health and fitness, from beginners taking their first steps toward a healthier lifestyle to experienced fitness enthusiasts wanting to fine-tune their routines. It is also valuable for individuals who enjoy exercising and want to keep track of their progress over time.

By addressing the need for a holistic approach to health tracking, this app serves as a practical and motivational tool that empowers users to build better habits, stay consistent, and achieve their fitness goals. With an easy-to-use interface and personalized tracking features, it makes health management more accessible, engaging, and effective.

**Site Mockups**
_([amiresponsive](https://ui.dev/amiresponsive?url=https://fit-track-project-8ab24fa880fe.herokuapp.com), [techsini](https://techsini.com/multi-mockup), etc.)_

![screenshot](documentation/mockup.png)

source: [fit-track amiresponsive](https://ui.dev/amiresponsive?url=https://fit-track-project-8ab24fa880fe.herokuapp.com)

## UX

### The 5 Planes of UX

#### 1. Strategy Plane

##### Purpose

- Track Fitness Progress - Log workouts, monitor performance, and stay motivated to reach fitness goals.

- Monitor Nutrition - Keep track of meals and dietary habits to ensure a balanced and healthy diet.

- Analyse Sleep Patterns - Record sleep duration and quality to promote better rest and recovery.

- Encourage Healthy Habits - Provide users with insights into their daily routines to build and maintain a healthier lifestyle.

- Set & Achieve Goals - Allow users to set personalised fitness, nutrition, and sleep goals to stay on track.

- Increase Accountability - Help users stay consistent by tracking progress and offering data-driven feedback.

- Simplify Health Tracking - Offer an easy-to-use interface for managing all aspects of health in one place.

- Target All Fitness Levels - Designed for beginners, fitness enthusiasts, and anyone looking to maintain or improve their well-being.

##### Primary User Needs

- Easy Workout Logging - Users need a simple way to track workouts, exercises, and progress over time.

- Meal Tracking & Nutritional Insights - Users want to log meals and get insights into their diet to maintain a healthy balance.

- Sleep Monitoring - Users need to track sleep patterns to improve rest and overall well-being.

- Goal Setting & Progress Tracking - Users want to set fitness, nutrition, and sleep goals and track their progress.

- User-Friendly Interface - Users need an intuitive and easy-to-navigate platform to input and review their data quickly.

- Reminders & Notifications - Users may need reminders to log workouts, meals, or sleep data to stay consistent.

- Data Insights & Reports - Users want visual progress reports and analytics to stay motivated and make informed decisions.

- Community & Motivation - Users may benefit from social features or challenges to stay engaged and motivated.

##### Business Goals

- Increase User Base - Grow the number of active users by targeting fitness enthusiasts, beginners, and health-conscious individuals.

- Improve User Retention - Encourage long-term app usage through personalized recommendations and progress tracking.

- Enhance User Experience - Continuously improve UI/UX to make the app intuitive and enjoyable to use.

- Introduce Community Features - Build a supportive community through forums, challenges, or social sharing to increase engagement.

- Strong Customer Support - Provide excellent customer support to maintain a positive reputation and high user satisfaction.

- User Privacy & Data Security - Ensure strong data protection policies to build user trust and comply with regulations.

#### 2. Scope Plane

##### Features

- A full list of [Features](#features) can be viewed in detail below.

##### Content Requirements

- User Profile Information - Name, age, weight, height, fitness goals, and preferences.

- Exercise & Activity Tracking - Logs for workouts, calories burned, steps taken, and progress over time.

- Meal & Nutrition Tracking - Food logging, meal plans, calorie intake tracking, and recipe suggestions.

- Sleep Tracking - Sleep duration, quality analysis, and improvement recommendations.

- Goal Setting & Progress Updates - Users can set and track fitness, nutrition, and sleep goals.

- Motivational Content - Daily tips, workout challenges, and reminders.

- Push Notifications & Reminders - Alerts for workouts, meals, hydration, and sleep.

- User Dashboard - A summary of daily and weekly progress.

- Community & Social Features - Group challenges, leaderboards, or friend activity tracking.

- Help & Support - FAQs, troubleshooting guides, and customer support contact.

- 400 Error Page (Bad Request/Not Found) - A user-friendly page for incorrect or broken links with navigation back to key sections.

- 500 Error Page (Server Issues) - A helpful page for internal errors, reassuring users and providing troubleshooting steps.

#### 3. Structure Plane

##### Information Architecture

- **Navigation Menu**:

  - Links to Dashboard, Log-in/Sign-up, Exercise log, Meal log, Sleep tracking, Profile, Settings, and Help.

- **Hierarchy**:

  - Dashboard - When a user first arrives on the website, they will see a simple navigation bar with links to Log In / Sign Up, the Help Page, and the Dashboard. The landing page will provide a brief overview of the app's features and a link to log in or sign up. If the user is logged in, the main section will display their dashboard content, including:

    - A summary of the current day’s activities

    - Workout and nutrition overview

    - Daily goal progress

    - Progress analytics

    - Challenge and motivation section

    The navigation bar will also update to include links to additional pages and a Sign Out option. A notification icon will alert users to any new updates.

  - Log In / Sign Up Page - Allows users to log in to their account, redirecting them to their dashboard upon success. If they do not have an account, they can create one and then proceed to log in.

  - Exercise Log Page - Displays a weekly overview of the user's exercises. Users can add, edit, or delete workout entries through an interactive table, which includes:

    - Exercise type

    - Name of the workout

    - Time, amount, or duration

    - Notes section for additional details

  - Meal Log Page - Functions similarly to the Exercise Log Page, but for daily meal tracking. It includes:

    - Meal type (e.g., breakfast, lunch, dinner, snack)

    - Meal name

    - Calorie/nutritional intake

    - Notes section for additional details

  - Sleep Tracking Page - Allows users to track their sleep habits with multiple sections:

    - Sleep log entries with progress bars for each night

    - Sleep disruption analysis, including factors affecting sleep quality

    - Sleep quality rating graph and notes section

    - Weekly/monthly comparison graph, highlighting trends and averages

    - A sleep alert icon if the user’s average sleep quality is poor

    - Alarm section where users can set sleep and wake-up alarms

    - Feedback & encouragement section, displaying motivational messages

    - Edit button for modifying all data on the page, with an option to save changes

  - Profile Page - Users can edit personal details, such as height, weight, and username. This page also includes:

    - An activity counter to track user engagement

    - A quick summary graph of progress

    - An achievement section for goal milestones

    - A delete account button for users who wish to remove their profile

  - Settings Page - Allows users to adjust app preferences, including:

    - Notification settings (on/off toggle)

    - Data sharing preferences (on/off toggle)

    - Measurement system selection (metric or imperial)

    - Profile visibility settings

  - Help Page - Accessible to both guest users and logged-in users, this page includes:

    - Frequently Asked Questions (FAQ)

    - Troubleshooting & technical support

    - Contact support options

    - Tutorials and guides for using the app

##### User Flow

1. Guest user lands on the standard dashboard → Sees an overview of the app’s features and a call to action to sign up or log in.

2. Guest user explores the help page → Reads FAQs, troubleshooting tips, or app guides.

3. Guest user signs up for an account → Enters details (name, email, password) → Redirected to log in.

4. Returning user logs in → Redirected to the dashboard.

5. User lands on their dashboard → Sees an overview of the day's progress, recent activities, and notifications.

6. User logs a workout → Navigates to the exercise log page → Adds, edits, or deletes an exercise entry.

7. User logs a meal → Navigates to the meal log page → Adds meal details, tracks calories/nutrition.

8. User tracks sleep → Enters sleep data, reviews sleep history, and sets sleep goals/alarms.

9. User checks analytics → Reviews progress charts and trends for fitness, nutrition, and sleep.

10. User adjusts settings → Updates profile details, notification preferences, or measurement units.

11. User views achievements & challenges → Engages with motivational challenges or unlocks achievements.

12. User signs out → Logs out and returns to standard dashboard.

#### 4. Skeleton Plane

##### Wireframe Suggestions

- A full list of [Wireframes](#wireframes) can be viewed in detail below.

#### 5. Surface Plane

##### Visual Design Elements

- **[Colours](#colour-scheme)**: see below.
- **[Typography](#typography)**: see below.

### Colour Scheme

I used [coolors.co](https://coolors.co/1e3a8a-2dd4bf-facc15-fafafa-2e2e2e) to generate my color palette.

- Primary Color: Navy Blue `#1E3A8A`

- Secondary Color: Teal `#2DD4BF`

- Accent Color: Muted Yellow `#FACC15`

- Background: Off-White `#FAFAFA`

- Text Color: Charcoal Gray `#2E2E2E`

![screenshot](documentation/light-colours.png)

##### DARK MODE

- Primary Color: Deep Navy `#0F172A`

- Secondary Color: Teal `#14B8A6`

- Accent Color: Muted Yellow `#EAB308`

- Background: Charcoal Black `#1E293B`

- Text Color: Light Gray `#E5E7EB`

- Card/Section Background: Dark Gray `#334155`

![screenshot](documentation/dark-colours.png)

### Typography

- [Inter](https://fonts.google.com/specimen/Inter) was used for the primary headers and titles.
- [Roboto](https://fonts.google.com/specimen/Roboto) was used for all other secondary text.
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) was used for numbers and data displays.
- [Font Awesome](https://fontawesome.com) icons were used throughout the site, such as the social media icons in the footer.

## User Stories

| Target               | Expectation                                                   | Outcome                                                                  |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| As a user            | I can set sleep goals                                         | so that I can aim for an optimal amount of sleep each night.             |
| As a user            | I can view my sleep history                                   | so that I can analyse my sleeping patterns over time.                    |
| As a user            | I can log my sleep duration                                   | so that I can keep track of how many hours I sleep each night.           |
| As a user            | I can receive personalised nutrition recommendations          | so that I can update my dietary preferences and goals.                   |
| As a user            | I can track my progress towards meeting my fitness goals      | so that I can adjust my actions accordingly.                             |
| As a user            | I can set fitness goals                                       | so that I can clear targets to aim for in my fitness journey.            |
| As a user            | I can view my meal logging history and overall calorie intake | so that I can maintain or adjust my diet as necessary.                   |
| As a user            | I can view my workout history                                 | so that I can see my activity levels over time.                          |
| As a user            | I can reset my password if I forget it                        | so that I can regain access to my account.                               |
| As a user            | I can log my workouts                                         | so that I can track the types of exercises I perform and their duration. |
| As a user            | I can log my meals                                            | so that I can monitor my nutritional information.                        |
| As a new user        | I can register an account                                     | so that I can log in to the system.                                      |
| As a registered user | I can log in to my account                                    | so that I can access my fitness data.                                    |
| As a logged-in user  | I can manage my profile                                       | so that I can update my personal information.                            |

## Wireframes

To follow best practice, wireframes were developed for mobile, tablet, and desktop sizes.
I've used [Moqups](https://app.moqups.com) to design my site wireframes.

| Page              | Mobile                                                          | Tablet                                                          | Desktop                                                           |
| ----------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| Register / Log-in | ![screenshot](documentation/wireframes/mobile/log-sign-mob.png) | ![screenshot](documentation/wireframes/tablet/log-sign-tab.png) | ![screenshot](documentation/wireframes/desktop/log-sign-desk.png) |
| Dashboard         | ![screenshot](documentation/wireframes/mobile/dash-mob.png)     | ![screenshot](documentation/wireframes/tablet/dash-tab.png)     | ![screenshot](documentation/wireframes/desktop/dash-desk.png)     |
| Profile           | ![screenshot](documentation/wireframes/mobile/profile-mob.png)  | ![screenshot](documentation/wireframes/tablet/profile-tab.png)  | ![screenshot](documentation/wireframes/desktop/profile-desk.png)  |
| Exercise logging  | ![screenshot](documentation/wireframes/mobile/exercise-mob.png) | ![screenshot](documentation/wireframes/tablet/exercise-tab.png) | ![screenshot](documentation/wireframes/desktop/exercise-desk.png) |
| Meal logging      | ![screenshot](documentation/wireframes/mobile/meal-mob.png)     | ![screenshot](documentation/wireframes/tablet/meal-tab.png)     | ![screenshot](documentation/wireframes/desktop/meal-desk.png)     |
| Sleep tracking    | ![screenshot](documentation/wireframes/mobile/sleep-mob.png)    | ![screenshot](documentation/wireframes/tablet/sleep-tab.png)    | ![screenshot](documentation/wireframes/desktop/sleep-desk.png)    |
| Settings          | ![screenshot](documentation/wireframes/mobile/setting-mob.png)  | ![screenshot](documentation/wireframes/tablet/setting-tab.png)  | ![screenshot](documentation/wireframes/desktop/setting-desk.png)  |
| Help              | ![screenshot](documentation/wireframes/mobile/help-mob.png)     | ![screenshot](documentation/wireframes/tablet/help-tab.png)     | ![screenshot](documentation/wireframes/desktop/help-desk.png)     |
| 404               | ![screenshot](documentation/wireframes/mobile/404-mob.png)      | ![screenshot](documentation/wireframes/tablet/404-tab.png)      | ![screenshot](documentation/wireframes/desktop/404-desk.png)      |
| 500               | ![screenshot](documentation/wireframes/mobile/500-mob.png)      | ![screenshot](documentation/wireframes/tablet/500-tab.png)      | ![screenshot](documentation/wireframes/desktop/500-desk.png)      |

## Features

### Existing Features

| Feature                 | Notes                                                                                                                                                                            | Screenshot                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Register                | Authentication is handled by JWT, allowing users to register accounts.                                                                                                           | ![screenshot](documentation/features/register.png) |
| Login                   | Authentication is handled by JWT, allowing users to log in to their existing accounts.                                                                                           | ![screenshot](documentation/features/login.png)    |
| Logout                  | Authentication is handled by JWT, allowing users to log out of their accounts.                                                                                                   | ![screenshot](documentation/features)              |
| Dashboard overview      | Displays a summary of the user's daily activities, including workouts, meals, sleep tracking and goal progress.                                                                  | ![screenshot](documentation/features)              |
| Exercise logging        | Allows users to log, edit and delete exercises, tracking details such as type, duration and intensity.                                                                           | ![screenshot](documentation/features)              |
| Meal tracking           | Enables users to log meals, track calorie and nutrient intake and make adjustments as needed.                                                                                    | ![screenshot](documentation/features)              |
| Sleep tracking          | Users can record sleep duration and quality, view progress graphs, and receive alerts if sleep trends indicate poor rest.                                                        | ![screenshot](documentation/features)              |
| Profile management      | Users can update personal details such as weight, height, and fitness goals, as well as view achievements.                                                                       | ![screenshot](documentation/features)              |
| Settings & preferences  | Provides customisation options like toggling notifications, changing measurement units, and adjusting profile visibility.                                                        | ![screenshot](documentation/features)              |
| Motivational challenges | Offers fitness challenges and goals to keep users engaged and motivated.                                                                                                         | ![screenshot](documentation/features)              |
| Progress analytics      | Displays detailed charts and graphs showing trends in exercise, diet, and sleep patterns over time.                                                                              | ![screenshot](documentation/features)              |
| Help & support          | Contains FAQs, troubleshooting guides, and contact support options for users needing assistance.                                                                                 | ![screenshot](documentation/features)              |
| Render Deployment       | The site is deployed to Render, making it accessible online for users.                                                                                                           | ![screenshot](documentation/features/render.png)   |
| 404                     | The 404 error page will indicate when a user has navigated to a page that doesn't exist, replacing the default Render 404 page with one that ties into the site's look and feel. | ![screenshot](documentation/features/404.png)      |
| 500                     | The 500 error page will indicate when a server error has occurred, replacing the default Render 500 page with one that ties into the site's look and feel.                       | ![screenshot](documentation/features)              |

### Future Features

- **Wishlist Functionality**: Enable users to save routines to a personal wishlist for future. Notify users if wishlist routine is trending.
- **Product Recommendations**: Implement a "Customers who bought this also bought" or "You might also like" feature to suggest related products.
- **Live Chat Support**: Provide real-time customer support through an integrated live chat or chatbot.
- **Loyalty Program**: Introduce a points-based loyalty system where customers earn points for app usage, which can be redeemed for discounts on the subscriptions.
- **Multi-Currency and Multi-Language Support**: Expand the application to support multiple currencies and languages to reach a global audience.
- **Personalized AI Coach**: Implement AI-driven suggestions for workouts, meal plans, and sleep improvements based on user data.
- **Voice Command Integration**: Allow users to log workouts, meals, or sleep data using voice commands.
- **Wearable Device Sync**: Enable integration with fitness trackers and smartwatches (e.g., Fitbit, Apple Watch, Garmin) to automatically track exercise and sleep.
- **Social Media Integration**: Enable users to share routines to social media platforms or implement a social login for quick account creation.
- **Advanced Analytics Dashboard for Admin**: Offer an in-depth dashboard that displays exercise trends, popular meals, customer behaviour, and more.
- **Subscription-Based Advanced Features**: Allow users to subscribe to certain advanced features (e.g., more in-depth meal plans or exercise routines).
- **Tutorial Video Demos**: video guides to better showcase how to use features, especially for more complex features.
- **Mobile App**: Develop a mobile app for iOS and Android, providing users with a more optimised experience on mobile devices.
- **Stress & Mindfulness Tracking**: Add guided breathing exercises, meditation, or stress level tracking features.
- **Offline Mode**: Let users log activities even when offline, syncing data when reconnected.
- **Integration with Meal Delivery Services**: Provide users with the option to order healthy meals directly through partnered meal services.

## Tools & Technologies

| Tool / Tech                                                                                                              | Use                                                                         |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| [![badge](https://img.shields.io/badge/Markdown_Builder-grey?logo=markdown&logoColor=000000)](https://markdown.2bn.dev)  | Generate README and TESTING templates.                                      |
| [![badge](https://img.shields.io/badge/Git-grey?logo=git&logoColor=F05032)](https://git-scm.com)                         | Version control. (`git add`, `git commit`, `git push`)                      |
| [![badge](https://img.shields.io/badge/GitHub-grey?logo=github&logoColor=181717)](https://github.com)                    | Secure online code storage.                                                 |
| [![badge](https://img.shields.io/badge/VSCode-grey?logo=htmx&logoColor=007ACC)](https://code.visualstudio.com)           | Local IDE for development.                                                  |
| [![badge](https://img.shields.io/badge/HTML-grey?logo=html5&logoColor=E34F26)](https://en.wikipedia.org/wiki/HTML)       | Main site content and layout.                                               |
| [![badge](https://img.shields.io/badge/CSS-grey?logo=css3&logoColor=1572B6)](https://en.wikipedia.org/wiki/CSS)          | Design and layout.                                                          |
| [![badge](https://img.shields.io/badge/JavaScript-grey?logo=javascript&logoColor=F7DF1E)](https://www.javascript.com)    | User interaction on the site.                                               |
| [![badge](https://img.shields.io/badge/Python-grey?logo=python&logoColor=3776AB)](https://www.python.org)                | Back-end programming language.                                              |
| [![badge](https://img.shields.io/badge/Bootstrap-grey?logo=bootstrap&logoColor=7952B3)](https://getbootstrap.com)        | Front-end CSS framework for modern responsiveness and pre-built components. |
| [![badge](https://img.shields.io/badge/Django-grey?logo=django&logoColor=092E20)](https://www.djangoproject.com)         | Python framework for the site.                                              |
| [![badge](https://img.shields.io/badge/PostgreSQL-grey?logo=postgresql&logoColor=4169E1)](https://www.postgresql.org)    | Relational database management.                                             |
| [![badge](https://img.shields.io/badge/Cloudinary-grey?logo=cloudinary&logoColor=3448C5)](https://cloudinary.com)        | Online static file storage.                                                 |
| [![badge](https://img.shields.io/badge/WhiteNoise-grey?logo=python&logoColor=FFFFFF)](https://whitenoise.readthedocs.io) | Serving static files with Render.                                           |
| [![badge](https://img.shields.io/badge/Gmail_API-grey?logo=gmail&logoColor=EA4335)](https://mail.google.com)             | Sending emails in my application.                                           |
| [![badge](https://img.shields.io/badge/Font_Awesome-grey?logo=fontawesome&logoColor=528DD7)](https://fontawesome.com)    | Icons.                                                                      |
| [![badge](https://img.shields.io/badge/ChatGPT-grey?logo=openai&logoColor=75A99C)](https://chat.openai.com)              | Help debug, troubleshoot, and explain things.                               |
| [![badge](https://img.shields.io/badge/Mermaid-grey?logo=mermaid&logoColor=FF3670)](https://mermaid.live)                | Generate an interactive diagram for the data/schema.                        |
| [![badge](https://img.shields.io/badge/React-grey?logo=react&logoColor=black)](https://reactjs.org/)                     | JavaScript library for building dynamic and responsive user interface       |
| [![badge](https://img.shields.io/badge/DRF-grey?logo=django&logoColor=white)](https://www.django-rest-framework.org/)    | Allowing frontend-backend communication                                     |
| [![badge](https://img.shields.io/badge/JWT-grey?logo=jsonwebtokens)](https://jwt.io/)                                    | Used for authentication and session management                              |
| [![badge](https://img.shields.io/badge/SendGrid-grey?logo=sendgrid&logoColor=white)](https://sendgrid.com/)              | Sending notifications, password resets and confirmations                    |
| [![badge](https://img.shields.io/badge/Pytest-grey?logo=pytest)](https://docs.pytest.org/)                               | Used to run unit and integration tests.                                     |

## Database Design

### Data Model

![screenshot](documentation/erd.png)

I have used `Mermaid` to generate an interactive ERD of my project.

```mermaid
erDiagram
    USER ||--|| PROFILE : has
    USER ||--|{ ACHIEVEMENTS : earns
    USER ||--|{ EXERCISE_LOG : tracks
    USER ||--|{ MEAL_LOG : records
    USER ||--|{ SLEEP_LOG : monitors
    USER ||--|| GOAL_SUMMARY : tracks
    USER ||--|| ACTIVE_COUNTER : logs

    PROFILE {
        int id PK
        int user_id FK
        string username
        string email
        string profile_image
        date dob
        float height
        float weight
        datetime created_at
    }

    ACHIEVEMENTS {
        int id PK
        int user_id FK
        string category
        int stars
        boolean completed
        datetime achieved_at
    }

    EXERCISE_LOG {
        int id PK
        int user_id FK
        string type
        string name
        float duration
        string notes
        datetime logged_at
    }

    MEAL_LOG {
        int id PK
        int user_id FK
        string meal_type
        string name
        float calories
        string nutrition_details
        string notes
        datetime logged_at
    }

    SLEEP_LOG {
        int id PK
        int user_id FK
        float hours_slept
        int sleep_quality_rating
        int sleep_disruptions
        string notes
        datetime logged_at
    }

    GOAL_SUMMARY {
        int id PK
        int user_id FK
        int progress_percentage
        string category
        datetime updated_at
    }

    ACTIVE_COUNTER {
        int id PK
        int user_id FK
        int streak_days
        datetime last_active_date
        datetime last_reset_date
    }
```

source: [Mermaid](https://mermaid.live/edit#pako:eNqlVV1v2jAU_SuWnykK7fho3hBLOzQoFbTVNiFZt_ElWCR2ZjvdKPDf5_BVAkGail8SH58bn-N7r7OgoeJIfYr6q4BIQzKWxI3nUTAky-XV1XJJHoeDu24vID6ZgjleXpB251s3eAn6wcPTyHEQtCxhBT-CYac7ClhvcO9YVkM4K6H1g3ZvS9EYKs1LOKNeEDxuSYmSwiptTlXfD9yXRs_9fnv48-yGS6f-qfsSsM7g-eHJoT6JVeRoG-LO-WIzzYeQlghOHr8XocygZg6_O8CN1UJG6yUJCZ4sYAIiPkFTrSYiRiYSiA5iOFgkXL1-IJNYgSVTFNHUHqN_jtA82ooESajRvXIG28XVzmohixf5Dd0GkdLzYoCxsMtSPl6VihEkCVWSxugUlWiFcCrwrUxsoZguEmvn6WliitnanCjPNFih5ClZWTQl6l0dRWXa9xV-ke4EIWb_LT6EWGlxKHNHztwzt8U4WleN5mJ7H835OX_bqlaZNszEmNqjMooRU_Y7g1jYOctTIqMyBhdGZ2nu7HJLhZvkc65y3DV2pNEYlqIOUdpCe5_tnb26LOXnOrdwg31eoNOAMGMc5qWnA8YyCK14Q5aD5yjOItoDhtNJKzTSglPf6gwrNEHtbj43pWutY2qn6GqW-u6Vg56N6ViuXEwK8pdSyS5MqyyaUn8CsXGzzXFs_1l7VKPkqDsqk5b69fUnqL-gf6nfbFXrjeu6V6t98W5q9UazQufUrzVvqjXvtnXttbz67W3Da64q9H29qVdtNevewait_gFmgCZA)

⚠️ RECOMMENDED ⚠️

Alternatively, or in addition to, a more comprehensive ERD can be auto-generated once you're at the end of your development stages, just before you submit. Follow the steps below to obtain a thorough ERD that you can include. Feel free to leave the steps below in the README for future use to yourself.

⚠️ --- END --- ⚠️

I have used `pygraphviz` and `django-extensions` to auto-generate an ERD.

The steps taken were as follows:

- In the terminal: `sudo apt update`
- then: `sudo apt-get install python3-dev graphviz libgraphviz-dev pkg-config`
- then type `Y` to proceed
- then: `pip3 install django-extensions pygraphviz`
- in my `settings.py` file, I added the following to my `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    ...
    'django_extensions',
    ...
]
```

- back in the terminal: `python3 manage.py graph_models -a -o erd.png`
- drag the new `erd.png` file into my `documentation/` folder
- removed `'django_extensions',` from my `INSTALLED_APPS`
- finally, in the terminal: `pip3 uninstall django-extensions pygraphviz -y`

![screenshot](documentation/advanced-erd.png)

source: [medium.com](https://medium.com/@yathomasi1/1-using-django-extensions-to-visualize-the-database-diagram-in-django-application-c5fa7e710e16)

## Agile Development Process

### GitHub Projects

[GitHub Projects](https://www.github.com/AshLaw96/fit-track/projects) served as an Agile tool for this project. Through it, EPICs, User Stories, issues/bugs, and Milestone tasks were planned, then subsequently tracked on a regular basis using the Kanban project board.

![screenshot](documentation/project-board.png)

### GitHub Issues

[GitHub Issues](https://www.github.com/AshLaw96/fit-track/issues) served as an another Agile tool. There, I managed my User Stories and Milestone tasks, and tracked any issues/bugs.

| Link                                                                                                                                                                 | Screenshot                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [![GitHub issues](https://img.shields.io/github/issues/AshLaw96/fit-track)](https://www.github.com/AshLaw96/fit-track/issues)                                        | ![screenshot](documentation/gh-issues-open.png)   |
| [![GitHub closed issues](https://img.shields.io/github/issues-closed/AshLaw96/fit-track)](https://www.github.com/AshLaw96/fit-track/issues?q=is%3Aissue+is%3Aclosed) | ![screenshot](documentation/gh-issues-closed.png) |

### MoSCoW Prioritization

I've decomposed my Epics into User Stories for prioritizing and implementing them. Using this approach, I was able to apply "MoSCow" prioritization and labels to my User Stories within the Issues tab.

- **Must Have**: guaranteed to be delivered - required to Pass the project (_max ~60% of stories_)
- **Should Have**: adds significant value, but not vital (_~20% of stories_)
- **Could Have**: has small impact if left out (_the rest ~20% of stories_)
- **Won't Have**: not a priority for this iteration - future features

## Testing

> [!NOTE]
> For all testing, please refer to the [TESTING.md](TESTING.md) file.

## Deployment

The live deployed application can be found deployed on [Render](https://fit-track-front-end.onrender.com/).

### Render Deployment

This project uses [Render](https://www.render.com), a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

Deployment steps are as follows, after account setup:

- Select **New** in the top-right corner of your Heroku Dashboard, and select **Create new app** from the dropdown menu.
- Your app name must be unique, and then choose a region closest to you (EU or USA), then finally, click **Create App**.
- From the new app **Settings**, click **Reveal Config Vars**, and set your environment variables to match your private `env.py` file.

> [!IMPORTANT]
> This is a sample only; you would replace the values with your own if cloning/forking my repository.

| Key                     | Value                                                                |
| ----------------------- | -------------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | user-inserts-own-aws-access-key-id                                   |
| `AWS_SECRET_ACCESS_KEY` | user-inserts-own-aws-secret-access-key                               |
| `DATABASE_URL`          | user-inserts-own-postgres-database-url                               |
| `DISABLE_COLLECTSTATIC` | 1 (_this is temporary, and can be removed for the final deployment_) |
| `EMAIL_HOST_PASS`       | user-inserts-own-gmail-api-key                                       |
| `EMAIL_HOST_USER`       | user-inserts-own-gmail-email-address                                 |
| `SECRET_KEY`            | any-random-secret-key                                                |
| `STRIPE_PUBLIC_KEY`     | user-inserts-own-stripe-public-key                                   |
| `STRIPE_SECRET_KEY`     | user-inserts-own-stripe-secret-key                                   |
| `STRIPE_WH_SECRET`      | user-inserts-own-stripe-webhook-secret                               |
| `USE_AWS`               | True                                                                 |

Heroku needs some additional files in order to deploy properly.

- [requirements.txt](requirements.txt)
- [Procfile](Procfile)

You can install this project's **[requirements.txt](requirements.txt)** (_where applicable_) using:

- `pip3 install -r requirements.txt`

If you have your own packages that have been installed, then the requirements file needs updated using:

- `pip3 freeze --local > requirements.txt`

The **[Procfile](Procfile)** can be created with the following command:

- `echo web: gunicorn app_name.wsgi > Procfile`
- _replace `app_name` with the name of your primary Django app name; the folder where `settings.py` is located_

For Heroku deployment, follow these steps to connect your own GitHub repository to the newly created app:

Either (_recommended_):

- Select **Automatic Deployment** from the Heroku app.

Or:

- In the Terminal/CLI, connect to Heroku using this command: `heroku login -i`
- Set the remote for Heroku: `heroku git:remote -a app_name` (_replace `app_name` with your app name_)
- After performing the standard Git `add`, `commit`, and `push` to GitHub, you can now type:
  - `git push heroku main`

The project should now be connected and deployed to Heroku!

### Cloudinary API

This project uses the [Cloudinary API](https://cloudinary.com) to store media assets online, due to the fact that Render doesn't persist this type of data.

To obtain your own Cloudinary API key, create an account and log in.

- For "Primary Interest", you can choose **Programmable Media for image and video API**.
- _Optional_: edit your assigned cloud name to something more memorable.
- On your Cloudinary Dashboard, you can copy your **API Environment Variable**.
- Be sure to remove the leading `CLOUDINARY_URL=` as part of the API **value**; this is the **key**.
  - `cloudinary://123456789012345:AbCdEfGhIjKlMnOpQrStuVwXyZa@1a2b3c4d5)`
- This will go into your own `env.py` file, and Render Config Vars, using the **key** of `CLOUDINARY_URL`.

### PostgreSQL

This project uses a [Code Institute PostgreSQL Database](https://dbs.ci-dbs.net) for the Relational Database with Django.

> [!CAUTION]
>
> - PostgreSQL databases by Code Institute are only available to CI Students.
> - You must acquire your own PostgreSQL database through some other method if you plan to clone/fork this repository.
> - Code Institute students are allowed a maximum of 8 databases.
> - Databases are subject to deletion after 18 months.

To obtain my own Postgres Database from Code Institute, I followed these steps:

- Submitted my email address to the CI PostgreSQL Database link above.
- An email was sent to me with my new Postgres Database.
- The Database connection string will resemble something like this:
  - `postgres://<db_username>:<db_password>@<db_host_url>/<db_name>`
- You can use the above URL with Django; simply paste it into your `env.py` file and Render Config Vars as `DATABASE_URL`.

### Gmail API

This project uses [Gmail](https://mail.google.com) to handle sending emails to users for confirmations.

Once you've created a Gmail (Google) account and logged-in, follow these series of steps to get your project connected.

- Click on the **Account Settings** (cog icon) in the top-right corner of Gmail.
- Click on the **Accounts and Import** tab.
- Within the section called "Change account settings", click on the link for **Other Google Account settings**.
- From this new page, select **Security** on the left.
- Select **2-Step Verification** to turn it on. (_verify your password and account_)
- Once verified, select **Turn On** for 2FA.
- Navigate back to the **Security** page, and you'll see a new option called **App passwords** (_search for it at the top, if not_).
- This might prompt you once again to confirm your password and account.
- Select **Mail** for the app type.
- Select **Other (Custom name)** for the device type.
  - Any custom name, such as "Django" or `fit-track`
- You'll be provided with a 16-character password (API key).
  - Save this somewhere locally, as you cannot access this key again later!
  - If your 16-character password contains _spaces_, make sure to remove them entirely.
  - `EMAIL_HOST_PASS` = user's 16-character API key
  - `EMAIL_HOST_USER` = user's own personal Gmail email address

### WhiteNoise

This project uses the [WhiteNoise](https://whitenoise.readthedocs.io/en/latest/) to aid with static files temporarily hosted on the live Render site.

To include WhiteNoise in your own projects:

- Install the latest WhiteNoise package:
  - `pip install whitenoise`
- Update the `requirements.txt` file with the newly installed package:
  - `pip freeze --local > requirements.txt`
- Edit your `settings.py` file and add WhiteNoise to the `MIDDLEWARE` list, above all other middleware (apart from Django’s "SecurityMiddleware"):

```python
# settings.py

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    # any additional middleware
]
```

### Local Development

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customise it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

This project can be cloned or forked in order to make a local copy on your own system.

For either method, you will need to install any applicable packages found within the [requirements.txt](requirements.txt) file.

- `pip3 install -r requirements.txt`.

You will need to create a new file called `.env` at the root-level, and include the same environment variables listed above from the Heroku deployment steps.

> [!IMPORTANT]
> This is a sample only; you would replace the values with your own if cloning/forking my repository.

Sample `.env` file:

```python
import os

AWS_ACCESS_KEY_ID=user-inserts-own-aws-secret-access-key
DATABASE_URL=user-inserts-own-postgres-database-url
EMAIL_HOST_PASS=user-inserts-own-gmail-host-api-key
EMAIL_HOST_USER=user-inserts-own-gmail-email-address
SECRET_KEY=any-random-secret-key
STRIPE_PUBLIC_KEY=user-inserts-own-stripe-public-key
STRIPE_SECRET_KEY=user-inserts-own-stripe-secret-key
STRIPE_WH_SECRET=user-inserts-own-stripe-webhook-secret  # only if using Stripe Webhooks

# local environment only (do not include these in production/deployment!)
DEBUG=True
DEVELOPMENT=True
```

Once the project is cloned or forked, in order to run it locally, you'll need to follow these steps:

- Start the Django app: `python3 manage.py runserver`
- Stop the app once it's loaded: `CTRL+C` (_Windows/Linux_) or `⌘+C` (_Mac_)
- Make any necessary migrations: `python3 manage.py makemigrations --dry-run` then `python3 manage.py makemigrations`
- Migrate the data to the database: `python3 manage.py migrate --plan` then `python3 manage.py migrate`
- Create a superuser: `python3 manage.py createsuperuser`
- Load fixtures (_if applicable_): `python3 manage.py loaddata file-name.json` (_repeat for each file_)
- Everything should be ready now, so run the Django app again: `python3 manage.py runserver`

If you'd like to backup your database models, use the following command for each model you'd like to create a fixture for:

- `python3 manage.py dumpdata your-model > your-model.json`
- _repeat this action for each model you wish to backup_
- **NOTE**: You should never make a backup of the default _admin_ or _users_ data with confidential information.

#### Cloning

You can clone the repository by following these steps:

1. Go to the [GitHub repository](https://www.github.com/AshLaw96/fit-track).
2. Locate and click on the green "Code" button at the very top, above the commits and files.
3. Select whether you prefer to clone using "HTTPS", "SSH", or "GitHub CLI", and click the "copy" button to copy the URL to your clipboard.
4. Open "Git Bash" or "Terminal".
5. Change the current working directory to the location where you want the cloned directory.
6. In your IDE Terminal, type the following command to clone the repository:
   - `git clone https://www.github.com/AshLaw96/fit-track.git`
7. Press "Enter" to create your local clone.

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://www.github.com/AshLaw96/fit-track)

**Please Note**: in order to directly open the project in Gitpod, you should have the browser extension installed. A tutorial on how to do that can be found [here](https://www.gitpod.io/docs/configure/user-settings/browser-extension).

#### Forking

By forking the GitHub Repository, you make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original owner's repository. You can fork this repository by using the following steps:

1. Log in to GitHub and locate the [GitHub Repository](https://www.github.com/AshLaw96/fit-track).
2. At the top of the Repository, just below the "Settings" button on the menu, locate and click the "Fork" Button.
3. Once clicked, you should now have a copy of the original repository in your own GitHub account!

### Local VS Deployment

There are no remaining major differences between the local version when compared to the deployed version online.

## Credits

### Content

| Source                                                      | Notes                                                    |
| ----------------------------------------------------------- | -------------------------------------------------------- | --- |
| [Markdown Builder](https://markdown.2bn.dev)                | Help generating Markdown files                           |
| [Chris Beams](https://chris.beams.io/posts/git-commit)      | "How to Write a Git Commit Message"                      |
| [Moments](https://codeinstitute.net)                        | Code Institute walkthrough project inspiration           |
| [Bootstrap](https://getbootstrap.com)                       | Various components / responsive front-end framework      |
| [Cloudinary](https://cloudinary.com/)                       | Cloud storage for static/media files                     |
| [Whitenoise](https://whitenoise.readthedocs.io)             | Static file service                                      |     |
| [Gmail API](https://developers.google.com/gmail/api/guides) | Sending payment confirmation emails                      |
| [ChatGPT](https://chatgpt.com)                              | Help with code logic and explanations and debugging help |

### Media

| Source                                                                              | Notes                          |
| ----------------------------------------------------------------------------------- | ------------------------------ |
| [favicon.io](https://favicon.io)                                                    | Generating the favicon         |
| [Font Awesome](https://fontawesome.com)                                             | Icons used throughout the site |
| [Pixabay](https://cdn.pixabay.com/photo/2017/09/04/16/58/passport-2714675_1280.jpg) | Background wallpaper           |
| [DeepAI](https://deepai.org/machine-learning-model/text2img)                        | AI generated artwork           |
| [TinyPNG](https://tinypng.com)                                                      | Compressing images < 5MB       |
| [CompressPNG](https://compresspng.com)                                              | Compressing images > 5MB       |

### Acknowledgements

- I would like to thank my Code Institute mentor, [Tim Nelson](https://www.github.com/TravelTimN) for the support throughout my course.
- I would like to thank my Code Institute Advanced Front-end mentor Mo Shami for the support throughout the development of this project.
- I would like to thank the [Code Institute Slack community](https://code-institute-room.slack.com) for the moral support; it kept me going during periods of self doubt and impostor syndrome.
- I would like to thank my partner, Megan Lawrence for believing in me, and allowing me to make this transition into software development.
