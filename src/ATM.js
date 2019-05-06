const readline = require('readline-sync');
const User = require('./User');
const Account = require('./Account');
const Transaction = require('./Transaction');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

const DAILY_LIMIT = 2000;

/**
 * Our ATM CLI
 */
class ATM {

    constructor() {
        this.user;
        this.logInPrompt();
    }

    /**
     * login screen
     */
    logInPrompt() {
        console.clear();
        console.log('Welcome!')
        
        let username = readline.question('Please enter your username (enter 0 to exit): ');
        if (username === '0') {
            process.exit(0);
        }
        let user = User.getUser(username);
        if (!user) {
            let answer = readline.question('User does not exist, create a new one? y/n ');
            if (answer == 'y') {
                user = this.createNewUser(username);
                this.user = user;
                this.loggedInMenu();
            } else {
                this.logInPrompt();
            }
        } else {
            let tries = 3
            while (tries > 0) {
                let pin = readline.question('Please enter your pin: ', {
                    hideEchoBack: true
                });
                if (user.checkPin(pin)) {
                    console.log('Success!');
                    this.user = user;
                    this.loggedInMenu();
                    break;
                } else {
                    console.log(`Invalid PIN, please try again (${tries}).`)
                    tries--;
                }
            } 
            readline.keyInPause('\nReturning to login..');
            this.logInPrompt();
        }
    }

    /**
     * options menu
     */
    loggedInMenu() {
        console.clear();
        console.log('################################');
        console.log('1. Check your balance');
        console.log('2. Withdrawal');
        console.log('3. Deposit');
        console.log('4. Display all transactions')
        console.log('5. Return to login');
        console.log('6. Exit')
        console.log('################################');
        let option = readline.question('What would you like to do? ') 
        while (!['1','2','3','4','5','6','gettrx'].includes(option)) {
            option = readline.question('What would you like to do? ') 
        }
        switch (option) {
            case '1':
                this.checkBalance();
                break;
            case '2':
                this.withdrawal();
                break;
            case '3':
                this.deposit();
                break;
            case '4':
                this.displayTransactions();
            case '5':
                this.logInPrompt();
                break;
            case '6':
                console.log('Exiting...');
                console.log('Goodbye.');
                process.exit(0);
            case 'gettrx': // for debugging
                Transaction.getEveryTransaction();
                readline.keyInPause();
                this.loggedInMenu();
                break;
        }
        
    }

    /**
     * Creates a new user from the given username
     * 
     * @param String userName 
     * @returns User newUser
     */
    createNewUser(userName) {
        let pin = readline.question('Please enter a PIN: ', {
            hideEchoBack: true
        });
        const newUser = new User(userName, pin);
        return newUser;
    }

    /**
     * Prints out the current user's account balance
     */
    checkBalance() {
        console.log(`\nBalance: $${this.user.account.balance}`);
        readline.keyInPause('\n\nContinue...');
        this.loggedInMenu();
    }
    
    /**
     * prompts user for a withdrawal amount and withdraws from the user's account
     */
    withdrawal() {
        let amt = Number.parseFloat(readline.question('How much would you like to withdraw? '));
        if (isNaN(amt)) {
            console.error('\nInvalid input.');
            this.withdrawal();
        } else if (amt < 0) {
            console.error('\nCannot withdraw a negative amount.');
            this.withdrawal();
        }
        let balance = this.user.account.balance;
        let withdrawnTotal = this.user.account.getDailyTotalWithdrawal(new Date());

        if ((balance <= 0) || (balance - amt < 0)) {
            console.log('\nInsufficient funds.')
            readline.keyInPause('\n\nContinue...');
            this.loggedInMenu();
        } else if (withdrawnTotal+amt > DAILY_LIMIT) {
            console.log(`\nAmount exceeds withdrawal daily limit of $${DAILY_LIMIT}`);
            readline.keyInPause('\n\nContinue...');
            this.loggedInMenu();
        } else {
            let trx = new Transaction(this.user.account, -amt);
        }
        console.log(`Balance: $${this.user.account.balance}`);
        readline.keyInPause('\n\nContinue...');
        this.loggedInMenu();
    }

    /**
     * prompts user for a deposit amount and deposits into the user's account
     */
    deposit() {
        let amt = Number.parseFloat(readline.question('How much would you like to deposit? '));
        if (isNaN(amt)) {
            console.error('\nInvalid input.');
            this.deposit();
        } else if (amt < 0) {
            console.error('\nCannot deposit a negative amount.');
            this.deposit();
        }
        let trx = new Transaction(this.user.account, amt);
        console.log(`Balance: $${this.user.account.balance}`);
        readline.keyInPause('\n\nContinue...');
        this.loggedInMenu();
    }

    /**
     * displays all transactions on the user's account ordered by latest transaction
     */
    displayTransactions() {
        console.clear();
        console.log('Transactions')
        console.log('------------')
        for (const [date, amts] of this.user.account.transactions) {
            let tempAmt = amts.reverse();
            tempAmt.forEach(x => {
                if (x < 0) {
                    console.log(`${date}: -$${-1*x}`);
                } else {
                    console.log(`${date}: $${x}`);
                }
            });
        }
        readline.keyInPause('\n\nContinue...');
        this.loggedInMenu();
    }
} 

module.exports = ATM;


