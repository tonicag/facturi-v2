const db = require('../models');


const createBill = async(req, res) => {

    try {
        const user = await db.User.findByPk(req.body.userId);
        const bill = await db.Bill.build(req.body.bill);
        bill.ownerId = user.id;
        bill.buyerId = req.body.buyerId;
        await bill.save();
        //console.log(await bill.getOwner());
        return res.status(200).json({ 'message': 'Success in adding the bill!' })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }



}
const updateBill = async(req, res) => {
    try {
        console.log('Updating bill: ', req.params.billId);
        const user = await db.User.findByPk(req.body.userId);

        const bill = await db.Bill.findByPk(req.params.billId)
        await db.Bill.update(req.body.bill, {
            where: {
                id: bill.id
            }
        });
        bill.ownerId = user.id;
        await bill.save();
        //console.log(await bill.getOwner());
        return res.status(200).json({ 'message': 'Success in updating the bill!' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
}

const getAllBills = async(req, res) => {

    try {
        const user = await db.User.findByPk(req.body.userId);
        const bills = await db.Bill.findAll({ raw: true }, {
            where: {
                ownerId: user.id
            }
        });
        return res.status(200).json({ 'bills': bills });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }


}

module.exports = {
    createBill: createBill,
    updateBill: updateBill,
    getAllBills: getAllBills
}