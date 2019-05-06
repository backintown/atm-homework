const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const Account = require('./Account');

// static userMap for User
const userMap = new Map(); 
// aside - why does js have classes if they don't want them to behave like classes?!?!$@$#

/**
 * User class for our ATM
 */
class User {

    /**
     * Creates a user and an account for the user
     * 
     * @param string userName 
     * @param string pin 
     */
    constructor(userName, pin) {
        this.userID = uuid();
        this.userName = userName;
        this.hash = bcrypt.hashSync(pin, 10);
        this.account = new Account(this.userID, 0);
        userMap.set(userName, this);
    }

    /**
     * Returns an User object given a username
     * 
     * @param string userName 
     * @returns User user
     */
    static getUser(userName) {
        return userMap.get(userName);
    }
    
    /**
     * Checks if the given pin matches for the user
     * 
     * @param string pin
     * @returns boolean
     */
    checkPin(pin) {
        return bcrypt.compareSync(pin, this.hash);
    }
}

module.exports = User;