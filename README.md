# ATM HW

## Getting Started
Make sure node is installed

1. Download or clone the repo.
2. Open a terminal and cd to the repo directory.
3. ```npm install``` to install node modules.
4. Run the program ```node app.js```
5. Use the following users provided or create your own.
    - User: 'alex' PIN: '1234'
    - User: 'conor' PIN: '0000'
6. Follow the commandline instructions.

### Tests
 - ```npm run test```
 
## TODOs/Enhancements
- Break up the data so it stores ids instead of whole objects, e.g., Account in Transaction. Persist data into a database. Possibly MySQL or Postgres or even SQLite.

- Make a better GUI, possibly a web interface.

- PIN hashing could be better. Maybe add salt and pepper to the hash. A quick google says the 'crypto' module with PBKDF2 seems to be better.

- Possible issues with date and timezones

- Refactor app to make it more testable. Hard to test currently as some logic are entangled between classes.

- Error handling and input checking