import { body } from "express-validator";

const userRoles = ["admin"];

const authValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email must not be empty")
        .isEmail()
        .withMessage("Invalid email")
        .escape(),
    body("password", "Must be at least 6 characters")
        .isLength({ min: 6 })
        .escape(),
    body("role").isIn(userRoles).escape().withMessage("Invalid role"),
];

export { authValidator };
