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

test('get daily withdrawal amount', () => {
    let testAccount = new Account(uuid(), 0);
    testAccount.appendTransaction({ date: '05/05/2019', amount: 5000 });
    testAccount.appendTransaction({ date: '05/05/2019', amount: -100 });
    testAccount.appendTransaction({ date: '05/06/2019', amount: -1900 });
    expect(testAccount.getDailyTotalWithdrawal(new Date(2019,4,6))).toBe(1900);
})
