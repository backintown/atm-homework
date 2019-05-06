const uuid = require('uuid/v4');

/**
 * Takes in a Date object and returns a date string MM/dd/YYYY
 * 
 * @param Date date 
 * @returns String date string
 */
const getDateString = (date) => {
    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    let day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return `${month}/${day}/${year}`;
}

/**
 * Account for a user
 */
class Account {

    /**
     * Creates an account and associates it with the user
     * 
     * @param String userID 
     * @param float balance 
     */
    constructor(userID, balance) {
        this.accountID = uuid();
        this.userID = userID;
        this.balance = balance;
        this.transactions = new Map();
    }
    
    /**
     * Adds a transaction to the account's transactions map
     * Updates the account balance
     * 
     * @param Transaction trx 
     */
    appendTransaction(trx) {
        this.balance += trx.amount;
        if (this.transactions.has(trx.date)) {
            this.transactions.get(trx.date).push(trx.amount);
        } else {
            this.transactions.set(trx.date, [trx.amount]);
        }
    }

    /**
     * Returns the total amount withdrawn for a particular date
     * 
     * @param Date date 
     * @returns float withdrawnTotal
     */
    getDailyTotalWithdrawal(date) {
        let dateString = getDateString(date);
        if (this.transactions.has(dateString)) {
            return -1 * (this.transactions.get(dateString)
                .filter((amt) => amt < 0)
                .reduce((total, amt) => total + amt, 0));
        } else {
            return 0;
        }
        
    }
    
}

module.exports = Account;