import * as Yup from "yup";

const validationSchema = Yup.object({
	name: Yup.object({
		first: Yup.string()
			.min(2, "First name must contain at least 2 characters.")
			.max(256, "First name cannot exceed 256 characters.")
			.required("First name is a required field."),
		middle: Yup.string()
			.min(2, "Middle name must contain at least 2 characters.")
			.max(256, "Middle name cannot exceed 256 characters.")
			.notRequired(),
		last: Yup.string()
			.min(2, "Last name must contain at least 2 characters.")
			.max(256, "Last name cannot exceed 256 characters.")
			.required("Last name is a required field."),
	}),
	phone: Yup.string()
		.matches(/^05\d{8}$/, "Invalid phone number.")
		.required("Phone number is a required field."),
	email: Yup.string()
		.email("Invalid email format.")
		.required("Email is a required field."),
	password: Yup.string()
		.min(9, "Password must be at least 9 characters.")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter.")
		.matches(/\d/, "Password must contain at least one number.")
		.matches(
			/[!@#$%^&*-]/,
			"Password must contain at least one special character."
		)
		.required("Password is a required field."),
	image: Yup.object({
		url: Yup.string()
			.url("Invalid URL.")
			.min(14, "URL must contain at least 14 characters.")
			.notRequired(),
		alt: Yup.string()
			.min(2, "Image's Description must contain at least 2 characters.")
			.max(256, "Image's Description cannot exceed 256 characters.")
			.notRequired(),
	}),
	address: Yup.object({
		state: Yup.string()
			.min(2, "State must contain at least 2 characters.")
			.max(256, "State cannot exceed 256 characters.")
			.notRequired(),
		country: Yup.string()
			.min(2, "Country must contain at least 2 characters.")
			.max(256, "Country cannot exceed 256 characters.")
			.required("Country is a required field."),
		city: Yup.string()
			.min(2, "City must contain at least 2 characters.")
			.max(256, "City cannot exceed 256 characters.")
			.required("City is a required field."),
		street: Yup.string()
			.min(2, "Street must contain at least 2 characters.")
			.max(256, "Street cannot exceed 256 characters.")
			.required("Street is a required field."),
		houseNumber: Yup.number()
			.typeError("House number must be a valid number.")
			.required("House number is a required field."),
		zip: Yup.number()
			.typeError("Zip must be a valid number.")
			.required("Zip is a required field."),
	}),
	isBusiness: Yup.boolean().required(),
});

export default validationSchema;
