const uuid = require('uuid/v4');

const allTransactions = [];

/**
 * Transaction class for our ATM
 */
class Transaction {

    /**
     * Creates a Transaction and adds itself to the associated account
     * 
     * @param Account account 
     * @param float amount 
     */
    constructor(account, amount) {
        this.id = uuid();
        this.amount = amount;
        this.account = account;
        this.date = this.getCurrentDateString();
        this.account.appendTransaction(this);
        allTransactions.push({
            id: this.id,
            account: this.account,
            amount: this.amount,
            date: this.date
        })
    }

    /**
     * @returns the current date string in MM/dd/YYYY format
     */
    getCurrentDateString() {
        let date = new Date();
        let year = date.getFullYear();

        let month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        let day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return `${month}/${day}/${year}`;
    }
    
    /**
     * Prints out every transaction object
     * for debugging purposes
     */
    static getEveryTransaction() {
        allTransactions.forEach(trx => {
            console.log(trx);
        });
    }
}

module.exports = Transaction;
