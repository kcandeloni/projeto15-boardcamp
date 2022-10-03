import joi from "joi";

const rentalSchema = joi.object({
    customerId: joi.number().integer().min(1).max(9999).required(),
    gameId: joi.number().integer().min(1).max(9999).required(),
    daysRented: joi.number().integer().min(1).max(999),
});

export default rentalSchema;