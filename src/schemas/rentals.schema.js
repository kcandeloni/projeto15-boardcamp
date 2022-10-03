import joi from "joi";

const customerSchema = joi.object({
    customerId: joi.number().integer().min(0).max(9999).required(),
    gameId: joi.number().integer().min(0).max(9999).required(),
    daysRented: joi.number().integer().min(0).max(999),
    returnDate: joi.string().pattern(/^[0-9]+$/, 'numbers').length(8),
    originalPrice: joi.number().integer().min(0).max(9999999999).required(),
    delayFee: joi.number().integer().min(0).max(9999999999),
});

export default customerSchema;