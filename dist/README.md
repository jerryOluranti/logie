# logie
## A nodejs library for catching, logging and querying runtime errors.

### Replace your `console.log()` with `log()` from logie 🚀🚀🚀

-------------

🧪 This library is in **Beta Stage** and it is **not production ready**

🪲 Report bugs and issues on the [git repo](https://github.com/jerryOluranti/logie/issues)

⭐ Remember to leave a star on the repository

💞 Follow me on [twitter](https://twitter.com/_oluranti)

_PS: You can make request for contribution!_

----------------
- Overview
  - [Installation](#installation)
  - [Initialization](#initialization)
  - [Usage](#usage)
    - [Logging](#logging)
      - [Log message to console](#log-message-to-console)
      - [Log message with custom level](#log-message-with-custom-level)
      - [Log messages to file](#log-messages-to-file)
      - [Configurations](#configurations)
    - [Catching](#catching)
    - [Querying](#querying)
  - [CLI (coming soon 🚧)](#cli)
----------------

## Installation
(Typescript supported by default 😊)
### NPM: 
`npm i logie`
### Yarn: 
`yarn add logie`

## Initialization
### require
`const {log} = require('logie');`
### import
`import {log} from 'logie';`

## Usage

### Logging
---------
#### Log message to console
```
  import {log} from 'logie';
  // or const {log} = require('logie');
  
  log("coffee ☕");
  
  // This will write the above message to the console with the default log level (INFO) and its equivalent color (cyan).
  // Output => INFO: coffee ☕
```
Learn more about configurations [below](#other-configurations).

-------------
 #### Log message with custom level
 ```
  import {log} from 'logie';
  // or const {log} = require('logie');
  
  log("Bad coffee ♨️", "ERROR");
  
  // This will write the above message to the console with the specified log level (ERROR) and its equivalent color (bright red).
  // Output => ERROR: coffee ♨️
  // Other log levels are: "DEBUG", "INFO", "LOG", "WARN", "ERROR", "CRITICAL", "FATAL".
```

-----------
#### Log messages to file
File logging is disabled by default. To enable this, specify that in the `package.json` config as it is done below:
```
  // package.json
  ...
    "logie": {
      "logToFile": true
    }
  ...
```
Now, all messages will be written to a file in the default location `{project_root}/logs/test.log`. To change the location and the log file name, add the following to the config:
```
  // package.json
  ...
    "logie": {
      "logToFile": true,
      "logName": "dev", 
      "logPath": "/v1/"
    }
  ...
```
`"logName": "dev"` - The log file name. This will automatically resolve to `dev.log`

`"logPath": "/v1/"` - A path relative to the project root directory. eg: `{project_root}/v1/`

Now, the new output path of the log file will be `{project_root}/v1/logs/dev.log` 😊

----------
#### Configurations
```
 // package.json
  ...
    "logie": {
      "logToFile": true,
      "logName": "dev", 
      "logPath": "/v1/",
      "defaultLevel: "DEBUG",
      "maxFileSize": 2000
    }
  ...

`logName` - A custom file name (defaults to `test.log`). Will be suffixed with `.log`

`logPath` - A path relative to the project root directory. eg: `{project_root}/v1/`

`logToFile` - `boolean` Specifies if log messages should be written to the log file

`defaultLevel` - Specifies the default log level. Valid values are:  "DEBUG", "INFO", "LOG", "WARN", "ERROR", "CRITICAL", "FATAL"

`maxFileSize` - Specifies the file size limit of a log file in **KB**. Upon reaching this limit, a new log file will be created with a number suffix of the count eg: `test_1.log`. Log messages will then be written to this new file. ⚠️ **This feature is being developed currently and it is not available**


### Catching
Docs loading 🔄
### Querying
Docs loading 🔄
## CLI
Coming soon 🚧

