# Welcome to our Under the Sea game!

## dev - delete me 
got to https://www.codeandweb.com/physicseditor, get physics editor 
open it, load in an image file (not svg)
try the magic wand tool, the shape should have a red outline
to do manually, right click on the object where you want a vertex to add one
Publish 
this give you a json file with the fixtures of the object for collision physics  



## Dependencies

### Update npm and install dependencies

```bash
npm update
npm install
```

### Installing serve

```bash
npm i serve -g
npm add serve
```

### Installing cypress

```bash
npm install cypress --save-dev
npm install -g @cypress/chrome-recorder
```

### Start

1. Start the server
   ```bash
   serve
   ```
2. Browse to [http://localhost:3000](http://localhost:3000)

#### Start test server

The server must be running locally with test configuration for the
integration tests to pass.

```bash
npm run 3030
```

<!-- npm install cypress --save-dev
npx cypress open -->

### Test

- Run all cypress tests
  ```bash
  npm run test
  ```
- Run a check
  ```bash
  npx cypress run --spec <FILE PATH>
  ```
