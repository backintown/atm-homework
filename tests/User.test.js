const Account = require('../src/Account');
const Transaction = require('../src/Transaction')
const User = require('../src/User');
const uuid = require('uuid/v4');


test('check pin auth', () => {
    let user = new User('alex','1234');
    expect(user.checkPin('0000')).toBeFalsy();
    expect(user.checkPin('1234')).toBeTruthy();
    expect(user.checkPin('12345')).toBeFalsy();
});