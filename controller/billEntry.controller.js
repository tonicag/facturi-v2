const db = require('../models');
const getBillEntry = async(req, res) => {
    const billEntryId = req.params.billentryId;
    if (!billEntryId) return res.status(400).json({ 'message': 'Please send the billentryId!' });
    try {
        const user = await db.User.findByPk(req.body.userId);
        const billEntry = await db.BillEntry.findByPk(req.params.billentryId);
        const bill = await billEntry.getBill();
        if (bill.ownerId != user.companyId) {
            return res.status(400).json({ 'message': 'Something went wrong!' });
        }
        return res.status(200).json(billEntry.toJSON());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
}
const getAllBillEntry = async(req, res) => {
    console.log('here');
    const billId = req.body.billId;
    if (!billId) return res.status(400).json({ 'message': 'Please send the billId!' });
    try {
        const user = await db.User.findByPk(req.body.userId);
        const bill = await db.Bill.findByPk(req.body.billId);
        if (bill.ownerId != user.companyId)
            return res.status(400).json({ 'message': 'You don\'t have rights to acces this!' });
        const billEntries = await db.BillEntry.findAll({
            where: {
                billId: billId
            }
        }, { raw: true });
        return res.status(200).json(billEntries);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
}
const createBillEntry = async(req, res) => {

    if (!req.body.billId) return res.status(400).json({ 'message': 'Please send the billId!' });
    try {
        const user = await db.User.findByPk(req.body.userId);
        const billEntries = req.body.billentries;
        console.log(req.body.billentries);
        billEntries.map(async(billEntry) => {
            console.log(billEntry);
            const newBill = db.BillEntry.build(billEntry);
            newBill.billId = req.body.billId;
            await newBill.save();

        })
        return res.status(200).json({ 'message': 'Success!' })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
};

const updateOneBillEntry = async(req, res) => {
    const billEntryId = req.params.billentryId;
    if (!billEntryId) return res.status(400).json({ 'message': 'Please send the billentryId!' });
    try {
        const user = await db.User.findByPk(req.body.userId);
        const billEntry = await db.BillEntry.findByPk(req.params.billentryId);
        const bill = await billEntry.getBill();
        if (bill.ownerId != user.companyId || req.body.billEntry.id || req.body.billEntry.billId) {
            return res.status(400).json({ 'message': 'Something went wrong!' });
        }

        await billEntry.update(req.body.billEntry);
        billEntry.id = req.params.billentryId;
        await billEntry.save();
        return res.status(200).json({ 'message': 'Succesfully updated!' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
};

module.exports = {
    createBillEntry: createBillEntry,
    getBillEntry: getBillEntry,
    getAllBillEntry: getAllBillEntry,
    updateOneBillEntry: updateOneBillEntry
}