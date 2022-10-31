# jumble - A Task Tracking Application

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li>
      <a href="#features-&-info">Features & Info</a>
    </li>
    <li>
      <a href="#design-decisions">Design Decisions</a>
    </li>
    <li>
      <a href="#to-do">To-do</a>
    </li>
    <li>
      <a href="#challenges">Challenges</a>
    </li>
    <li>
      <a href="#what-i-would-do-if-i-had-more-time">What I would do if I had more time</a>
    </li>
    <li>
      <a href="#bugs">Bugs</a>
    </li>
  </ol>
</details>

## Getting Started

This project was built with React to build the UI, Typescript for type-checking, Zustand for global state management, Styled-Components for styling, React-Beautiful-Dnd to handle the drag and drop functionality, and more. To see the site live, see [this link](https://jumbleapp.netlify.app/).

To install locally, you'd need to have Node installed.

You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the dependencies by running

```
> npm install
```

To start up the app on your localhost server, run

```
> npm start
```

## Features & Info

* The key to problem solving is breaking down the issue into smaller and smaller tasks until you're equipped to deal with the subtasks with the resources at your disposal.
* Jumble is a task tracking app, similar to a kanban board, that helps you in doing exactly that.
* Starting off the app, you're greeted with an already existing board. Three, in fact. They're there to help you get an idea of how you should go about destructuring your problems into tasks.
* Your state is stored directly in your browser's local storage, so there's no need to log in or sign up. You just need to click the link.

## Design Decisions

* I used Zustand for managing the global state. It's lightweight but powerful, easy to set up, and works great for projects that do not require something as large as redux. Since this app does not make any API calls and saves the state to the local storage, I also found no use for something like react-query for this app. This could definitely change in the future as I continue to iterate and add more features.
* Formik and Yup have sort of become my go-to for creating forms and validating them. They work well together, and Formik exports a useField hook that allows me to create custom components that work seamlessly with the rest of the functionality.
* For the styling, I stuck to Styled-Components over SCSS or CSS Modules. I am aware of the peformance tradeoffs that come with using a CSS-in-JS library, but I don't believe that, for a project of this scope, the slight hit to performance should impact the user experience in any way whatsoever.
* For the animation, Framer was an obvious choice. It's already pretty much an industry standard, and it ships with professional looking animation out of the box.
* I used immer to help in mutating the zustand state, because I felt it would help make the code a bit more readable.
* Nanoid was used to generate unique ids for the generated tasks and columns.
* React-Icons helped in getting quick, good-looking icons to use at various points through out the app.

## To-do

* Refactor the Zustand stores.
* Clean up the components logic.
* Add end-to-end tests with Cypress.
* Implement functionality to allow the user backup their boards to the cloud, so they can access it from an device.
* Add the option to share boards with other users, to allow for collaboration.

## Challenges

* Figuring out how to design the state architecure was the toughest part. Deciding what should go into the general store, what should be derived instead of stored, what was important enough to warrant getting its own store, how many stores were even going to exist, etc. Even now, I'm sure there's a lot that can be benefited from another look through and refactor.

## What I would do if I had more time

* Set up a commit hook to run prettier on every git commit.
* Add end-to-end tests with Cypress.

## Bugs

If you discover any bug, feel free to open an issue.
