## **Testing**

Tests use **Jest** with **Supertest** for API integration tests and **React Testing Library** for component and page tests.

- **API tests** (`src/__tests__/api.test.cjs`): Supertest against a minimal Express server.
- **Page tests** (`src/pages/*.test.jsx`): Home, NotFound, Spacecrafts, SpacecraftDetails, Construction, Planets.
- **Run all tests:** `npm test`
- **Run tests in watch mode:** `npm run test:watch`
- **Run tests in WSL (recommended on Windows):** `npm run test:wsl`

The `test:wsl` script runs Jest inside Windows Subsystem for Linux so the test environment matches a Linux CI. Ensure [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) is installed and the project is under a path accessible from WSL (e.g. `~/...` or `/mnt/c/...`).

---

## **Requirements**

- Design a welcoming **home page** that outlines the application's functionality.
- Develop a dedicated **spacecrafts page** (both the plural and the singular forms are "spacecraft", but the word "spacecrafts" is used intentionally to separate this page from the spacecraft page) that:
    - Displays all spacecraft and their details.
    - Provides navigation options for viewing specific spacecraft details, constructing new spacecraft, and decommissioning existing ones.
- Craft a detailed **spacecraft page** that presents comprehensive information about a particular spacecraft.
- Implement a **construction page** for spacecraft that:
    - Allows navigation back to the previous page.
    - Facilitates the creation of new spacecraft.
    - Shows errors for missing required fields (name, capacity, description).
- Create a **planets page** that:
    - Lists all planets and stationed spacecraft.
    - Enables planet selection for spacecraft dispatching, ensuring the destination differs from the current location.
- Integrate a loading component to manage API response times.
- Redirect all unmatched routes to the homepage.


- `components`: Contains components that are used as building blocks for pages.
- `context`: Contains providers that enable consuming components to subscribe to context changes.
- `pages`: Contains components that are used as a page. Pages are the components used to be rendered by a route.
- `routes`: Contains components that have route rendering logic.
- `services`: Contains services to reach external APIs.



Space Travel Project Rubrics
Completion


● A visually appealing Home Page that provides an overview of the application’s functionality
is present in the application.

● A dedicated Spacecrafts Page to display all spacecrafts with the navigation options for the
following tasks is present in the application
○ Viewing specific spacecraft details
○ Creating a new spacecraft
○ Decommissioning an existing spacecraft

● A detail-oriented page Spacecraft Page that is used to present comprehensive information
about a particular spacecraft, is present in the application

● A list-based Planets Page with visual components for displaying the following
information/features is present in the application:
○ List of all planets
○ All Spacecrafts stationed on each planet
○ Ability to dispatch a spacecraft from one planet to another in such a way that it
ensures that the destination is different from the current location

● A visual “loading” component that provides visual feedback to the users, when some
background process is happening or data is being fetched, is present in the application.

● Any undefined routes in the application are redirected to the home page ensuring a
seamless user experience


Process and Understanding

● The candidate demonstrates understanding of React Component Structure and
Organization by ensuring that all React components are appropriately structured,
reusable, and organized for readability and maintainability

● The candidate demonstrates understanding of React State Management by effectively
utilizing React state while managing component data and user interactions + lifting state
up to the next common ancestor whenever necessary

● The candidate demonstrates understanding of React Props by properly passing data
between parent and child components and implementing prop types validation to ensure
data integrity and prevention of run time errors.

● The candidate demonstrates understanding of React Hooks by using appropriate methods
during data fetching, initialization and clean up.

● The candidate demonstrates understanding of React Event Handling by appropriate
implementation during user interactions like button clicks, form submissions etc, using
event delegation and appropriate implementation of event propagation sequences.

● The candidate demonstrates understanding of React Forms by managing their states,
validating form inputs and providing feedback for errors and invalid data entry.

● The candidate demonstrates understanding of React Routing by utilizing React Routing for
client-side routing, implementing navigation between pages/views and rendering dynamic
content by appropriately handling route parameters.

● The candidate demonstrates understanding of React Testing Library by implementing unit
tests for React components

● The candidate demonstrates understanding of Error Handling by usage of try-catch blocks,
usage of error boundaries and validation during form submissions or any type of user
inputs.


Presentation

● The folder structure presented in the README file is followed (Components, Context,
Pages,Routes, Services)
● Variable names accurately represent the values they store
● Variable names follow the best practices for the programming language used (camelCase
in case of JavaScript, BEM methodology for CSS etc)
● Variable names are easy to read and understand
● Comments are present when necessary