import { param, body } from "express-validator";
import { validateObjectId } from "../../utils/validation";

const updateUserValidator = [
    param("_id").custom(validateObjectId).withMessage("Invalid ID parameter"),
    param("_id").escape().trim().notEmpty().withMessage("User id required"),
    body("firstName")
        .optional()
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Firstname must not be empty"),
    body("lastName")
        .optional()
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Lastname must not be empty"),
];

export { updateUserValidator };
