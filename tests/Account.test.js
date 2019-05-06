const Account = require('../src/Account');
const Transaction = require('../src/Transaction')
const uuid = require('uuid/v4');


test('deposit amount into account', () => {
    let testAccount = new Account(uuid(), 0);
    let trx = new Transaction(testAccount, 500);
    expect(testAccount.balance).toBe(500);
});

test('withdraw amount from account', () => {
    let testAccount = new Account(uuid(), 0);
    testAccount.appendTransaction({ date: '05/08/2019', amount: 500 });
    testAccount.appendTransaction({ date: '05/08/2019', amount: -100 });
    expect(testAccount.balance).toBe(400);
});