const Sequelieze = require('sequelize');

const dbConfig = require('../config/db.config');

const sequelize = new Sequelieze(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    });

const User = require('./user.model')(Sequelieze, sequelize);
const Address = require('./address.model')(Sequelieze, sequelize);
const BankAccount = require('./bankAccount.model')(Sequelieze, sequelize);
const Bill = require('./bill.model')(Sequelieze, sequelize);
const Company = require('./company.model')(Sequelieze, sequelize);
const BillEntry = require('./billEntry.model')(Sequelieze, sequelize);


Bill.hasMany(BillEntry);
BillEntry.belongsTo(Bill);

Bill.belongsTo(Company, { as: 'owner' });
Bill.belongsTo(Company, { as: 'buyer' });

Company.hasOne(Address);
Company.hasMany(BankAccount);

Company.hasOne(User);
User.hasOne(Company);
//sequelize.sync();

db = {};

db.User = User;
db.Company = Company;
db.Address = Address;
db.BankAccount = BankAccount;
db.Bill = Bill;
db.BillEntry = BillEntry;

db.sequelize = sequelize;
db.Sequelieze = Sequelieze;
module.exports = db;