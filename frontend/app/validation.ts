import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .test(
      "complexity",
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      (value) =>
        /[A-Z]/.test(value) && // at least one uppercase letter
        /[a-z]/.test(value) && // at least one lowercase letter
        /[0-9]/.test(value) && // at least one digit
        /[@$!%*?&#]/.test(value) // at least one special character
    ),

  // Optional: Add validation for other fields like name, phone, etc.
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const bankValidationSchema = Yup.object().shape({
  account_name: Yup.string().required("Account name is required"),

  account_number: Yup.string().required("Account number is required"),

  bank_name: Yup.string().required("Bank name is required"),
});
