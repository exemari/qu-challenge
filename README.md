# QU Challenge

Project created by Exequiel Mari to accomplish with https://www.qubeyond.com/ Challenge

The look and feel and functionality, can be tested in https://codesandbox.io/p/devbox/k9wjkc

The repository can be downloaded in [Git](https://github.com/exemari/qu-challenge)

![Preview](https://github.com/exemari/qu-challenge/blob/main/src/images/image1.png?raw=true)

## What did I add in this app?

1- I added the logic to call the api, get 10 random jokes and display them in a table

2- You can sort the columns

3- You can refresh the table and get new results

4- You can delete a row (this is not really deleted because there's not an Api to do it)

5- You can add a joke (this is not really added because there's not an Api to do it). We validate that the fields are not empty and we generate a random id.

6- I added some styles and icons

7- I'm saving the state that needs to be shared in the components using React Context.

8- I added some tests to be sure that the app is working as expected

9- I'm handling some errors using try and catch and throwing some errors

10- I divided the logic into different files like components, utils, api, constants and types. This is to make it much easier to read.

11- Added skeleton to display a kind of "loading" while we wait for the API result.

## Stack and libraries

In this library, I'm using:

- React
- Typescript
- Javascript
- Html
- CSS
- API Rest
- Hooks (and Custom Hooks)
- React context (to save the state)
- Styled Components (To add some inline styles)
- React-icons
- Jest and React testing library
- Skeleton from material ui

## How to test it?

### Locally

1- Download the repo https://github.com/exemari/qu-challenge

2- Open the folder in your code editor and execute `yarn i`

3- Execute `npm start`

4- Open your localhost in specified port (e.g. http://localhost:3000/)

- To execute the tests, run `yarn test`

### In Code Sandbox

You can visualize the code and functionality in https://codesandbox.io/p/devbox/k9wjkc

Here, in the terminal, you can execute it locally running `npm start`or you can execute the tests running `yarn test`

![CodeSandbox](https://github.com/exemari/qu-challenge/blob/main/src/images/image2.png?raw=true)

## Authors

- [@emari](https://www.github.com/exemari)
