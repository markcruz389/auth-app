import { body } from "express-validator";

const authValidator = [
    body("email", "Email must not be empty").not().isEmpty(),
    body("email", "Invalid email").isEmail().escape(),
    body("password", "Must be at least 6 characters")
        .isLength({ min: 6 })
        .escape(),
];

export { authValidator };
