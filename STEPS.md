- make a project directory
  - `mkdir project`
- Create a packages.json file using npm
  - `npm init`
- Install express
  - `npm install express`
- Make it version controlled
  - `git init`
- Write a README.md (just very basic for now)
  - `vim README.md`
- Write a STEPS.md file to document how this site is created, step by step.
  - `vim STEPS.md`
- Create a .gitignore file to ignore some files.
  - `vim .gitignore`
  - Files/folders to ignore so far
    - node_modules
- Add the files to the git repository and commit them.
  - `git add .`
  - `git commit -m "Initial commit"`
- Run the express generator
  - `express --view=pug .`
- And install all of the dependencies
  - `npm install`
- Find outdated packages and upgrade them.
  - `npm outdated`
  - Edit the 'packages.json' file by changing the version for the outdated packages to the latest version shown from the 'npm outdated' command.
  - Run npm update again
  - `npm update`
- Install the MaterializeCSS framework
  - `npm install materialize-css`
- Get rid of the 'users' page
  - Delete the 'routes/users.js' file and remove two lines from 'app.js'
- Install 'nodemon' so that the npm server restarts on any file change
  - `npm install nodemon`
  - Change the 'package.json' file to use nodemon instead of npm to start
    ```
    "scripts": {                                                                 
     "start": "nodemon ./bin/www",
    ```