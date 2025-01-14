import * as Yup from "yup";

const nameValidation = Yup.object({
	first: Yup.string()
		.min(2, "First name must contain at least 2 characters.")
		.max(256)
		.required("First name is a required field."),
	middle: Yup.string()
		.min(2, "Middle name must contain at least 2 characters.")
		.max(256),
	last: Yup.string()
		.min(2, "Last name must contain at least 2 characters.")
		.max(256)
		.required("Last name is a required field."),
});

const phoneValidation = Yup.string()
	.matches(/^05\d{8}$/, "Invalid phone number.")
	.required("Phone number is a required field.");

const imageValidation = Yup.object({
	url: Yup.string().url("Invalid URL").min(14),
	alt: Yup.string()
		.min(2, "Image's Description must contain at least 2 characters.")
		.max(256),
});

const addressValidation = Yup.object({
	state: Yup.string()
		.min(2, "State must contain at least 2 characters.")
		.max(256),
	country: Yup.string()
		.min(2, "Country must contain at least 2 characters.")
		.max(256)
		.required("Country is a required field."),
	city: Yup.string()
		.min(2, "City must contain at least 2 characters.")
		.max(256)
		.required("City is a required field."),
	street: Yup.string()
		.min(2, "Street must contain at least 2 characters.")
		.max(256)
		.required("Street is a required field."),
	houseNumber: Yup.string()
		.min(2, "House number must contain at least 2 characters.")
		.max(256)
		.required("House number is a required field."),
	zip: Yup.string()
		.min(2, "Zip must contain at least 2 characters.")
		.max(256)
		.required("Zip is a required field."),
});

export { nameValidation, phoneValidation, imageValidation, addressValidation };
