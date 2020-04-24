# Node.Js

### 1) Summary :

  > Realization of a backend that calls and transforms an rss flow in JSON and displays it via an interface in angular 9. Use of Cloud function from Firebase.

### 2) Installation :

   -  Part 1  the Backend :
   
   First install the dependencies and compile with `compile` and run the server with `start:server`.
   

   - Part 2 : the Frontend
   
   Go in the frontend directory and install the dependencies also and run the command `start:front`.


### 3) Shema global :


```
├── LICENSE
├── README.md
├── dist
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
frontend
│   ├── README.md
│   ├── angular.json
│   ├── browserslist
│   ├── e2e
│   ├── karma.conf.js
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.spec.json
│   ├── tslint.json
│   └── node_modules
src
├── env
│   ├── database.ts
│   └── key.json
├── server.ts
└── interfaces
    └── rssModel.ts
├── node_modules
├── package-lock.json
├── package.json
└── tsconfig.json
```
