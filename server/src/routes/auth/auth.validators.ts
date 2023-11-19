import { body } from "express-validator";

const userRoles = ["admin"];

const registerValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .escape()
        .trim()
        .withMessage("Invalid email"),
    body("password", "Must be at least 6 characters")
        .isLength({ min: 6 })
        .escape()
        .trim(),
    body("role").isIn(userRoles).withMessage("Invalid role").escape().trim(),
    body("firstName")
        .notEmpty()
        .withMessage("Firstname required")
        .escape()
        .trim(),
    body("lastName")
        .notEmpty()
        .withMessage("Firstname required")
        .escape()
        .trim(),
];

const loginValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .escape()
        .trim()
        .withMessage("Invalid email"),
    body("password", "Must be at least 6 characters")
        .isLength({ min: 6 })
        .escape()
        .trim(),
];

export { registerValidator, loginValidator };
