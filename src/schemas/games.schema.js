import joi from "joi";

const gameSchema = joi.object({
    name: joi.string().min(3).required(),
    image: joi.string().required(),
    stockTotal: joi.number().integer().min(1).max(9999).required(),
    categoryId: joi.number().integer().min(1).max(999).required(),
    pricePerDay: joi.number().integer().min(1).max(9999999999).required(),
});

export default gameSchema;