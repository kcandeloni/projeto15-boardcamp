import joi from "joi";

const customerSchema = joi.object({
    name: joi.string().min(3).required(),
    phone: joi.string().pattern(/^[0-9]+$/, 'numbers').min(10).max(11).required(),
    cpf: joi.string().length(11).pattern(/^[0-9]+$/, 'numbers').required(),
    birthday: joi.string().pattern(/^[0-9]+$/, 'numbers').required().length(8),
});

export default customerSchema;