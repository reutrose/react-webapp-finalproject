import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { getCardById, updateCard } from "../services/cardService";
import { useFormik } from "formik";
import { ThemeContext } from "./Theme";

function EditCard() {
	let { id } = useParams();
	const { themeClasses } = useContext(ThemeContext);
	const [errorMessage, setErrorMessage] = useState("");
	const nav = useNavigate();
	let [card, setCard] = useState({
		title: "",
		subtitle: "",
		description: "",
		phone: "",
		email: "",
		web: "",
		image: {
			url: "",
			alt: "",
		},
		address: {
			state: "",
			country: "",
			city: "",
			street: "",
			houseNumber: "",
			zip: "",
		},
	});

	useEffect(() => {
		getCardById(id)
			.then((card) => {
				setCard(card);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	useEffect(() => {
		formik.setFieldValue("title", card.title);
		formik.setFieldValue("subtitle", card.subtitle);
		formik.setFieldValue("description", card.description);
		formik.setFieldValue("phone", card.phone);
		formik.setFieldValue("email", card.email);
		formik.setFieldValue("web", card.web);
		formik.setFieldValue("image.url", card.image.url);
		formik.setFieldValue("image.alt", card.image.alt);
		formik.setFieldValue("address.state", card.address.state);
		formik.setFieldValue("address.country", card.address.country);
		formik.setFieldValue("address.city", card.address.city);
		formik.setFieldValue("address.street", card.address.street);
		formik.setFieldValue("address.houseNumber", card.address.houseNumber);
		formik.setFieldValue("address.zip", card.address.zip);
	}, [card]);

	const formik = useFormik({
		initialValues: {
			title: "",
			subtitle: "",
			description: "",
			phone: "",
			email: "",
			web: "",
			image: {
				url: "",
				alt: "",
			},
			address: {
				state: "",
				country: "",
				city: "",
				street: "",
				houseNumber: "",
				zip: "",
			},
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.min(2, "Card's title must contain at least 2 characters.")
				.max(256)
				.required("Card's title is a required field."),
			subtitle: Yup.string()
				.min(2, "Card's subtitle must contain at least 2 characters.")
				.max(256)
				.required("Card's subtitle is a required field."),
			description: Yup.string()
				.min(2, "Description must contain at least 2 characters.")
				.max(1024)
				.required("Description is a required field."),
			phone: Yup.string()
				.matches(/^05\d{8}$/, "Invalid phone number.")
				.min(9, "Phone must contain at least 9 digits.")
				.max(11, "Phone may contain maximum 11 digits.")
				.required("Phone is a required field."),
			email: Yup.string()
				.email("Invalid email format.")
				.min(5)
				.required("Email is a required field."),
			web: Yup.string().url("Invalid URL").min(14),
			image: Yup.object({
				url: Yup.string()
					.url("Invalid URL")
					.min(14)
					.required("Image URL is a required field."),
				alt: Yup.string()
					.min(2, "Image's Description must contain at least 2 characters.")
					.max(256)
					.required("Image's Description is a required field."),
			}),
			address: Yup.object({
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
					.min(1, "House number must contain at least 1 digit.")
					.max(256)
					.required("House number is a required field."),
				zip: Yup.string()
					.min(2, "Zip must contain at least 2 digits.")
					.max(256)
					.required("Zip is a required field."),
			}),
		}),
		onSubmit: (values) => {
			updateCard(id, values)
				.then(() => {
					nav(`/business-details/${id}`);
				})
				.catch((err) => {
					console.error("Update failed:", err);
					if (
						err.response &&
						err.response.data &&
						err.response.data.includes("E11000 duplicate key error collection")
					) {
						setErrorMessage("Email already exists, please try another one.");
					} else {
						setErrorMessage("An error occurred. Please try again.");
					}
				});
		},
	});

	return (
		<div className={themeClasses.textColor}>
			<h1 className="my-4">Edit Card: {card.title}</h1>
			<form onSubmit={formik.handleSubmit}>
				<div className="row">
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="title"
								className={`form-control ${
									formik.touched.title && formik.errors.title
										? "is-invalid"
										: ""
								}`}
								placeholder="Title"
								onChange={formik.handleChange}
								value={formik.values.title}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Title:
								<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.title && formik.errors.title ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.title}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="subtitle"
								className={`form-control ${
									formik.touched.subtitle && formik.errors.subtitle
										? "is-invalid"
										: ""
								}`}
								placeholder="Subtitle"
								onChange={formik.handleChange}
								value={formik.values.subtitle}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Subtitle<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.subtitle && formik.errors.subtitle ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.subtitle}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="description"
								className={`form-control ${
									formik.touched.description && formik.errors.description
										? "is-invalid"
										: ""
								}`}
								placeholder="Description"
								onChange={formik.handleChange}
								value={formik.values.description}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Description<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.description && formik.errors.description ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.description}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="phone"
								className={`form-control ${
									formik.touched.phone && formik.errors.phone
										? "is-invalid"
										: ""
								}`}
								placeholder="Phone"
								onChange={formik.handleChange}
								value={formik.values.phone}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Phone<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.phone && formik.errors.phone ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.phone}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="email"
								className={`form-control ${
									formik.touched.email && formik.errors.email
										? "is-invalid"
										: ""
								}`}
								placeholder="Email"
								onChange={formik.handleChange}
								value={formik.values.email}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Email<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.email && formik.errors.email ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.email}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="url"
								autoComplete="on"
								name="web"
								className={`form-control ${
									formik.touched.web && formik.errors.web ? "is-invalid" : ""
								}`}
								placeholder="Web"
								onChange={formik.handleChange}
								value={formik.values.web}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">Web</label>
							{formik.touched.web && formik.errors.web ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.web}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="url"
								autoComplete="on"
								name="image.url"
								className={`form-control ${
									formik.touched.image?.url && formik.errors.image?.url
										? "is-invalid"
										: ""
								}`}
								placeholder="Image URL"
								onChange={formik.handleChange}
								value={formik.values.image.url}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Image URL<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.image?.url && formik.errors.image?.url ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.image.url}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="image.alt"
								className={`form-control ${
									formik.touched.image?.alt && formik.errors.image?.alt
										? "is-invalid"
										: ""
								}`}
								placeholder="Image Description"
								onChange={formik.handleChange}
								value={formik.values.image.alt}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Image Description<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.image?.alt && formik.errors.image?.alt ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.image.alt}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="address.state"
								className={`form-control ${
									formik.touched.address?.state && formik.errors.address?.state
										? "is-invalid"
										: ""
								}`}
								placeholder="State"
								onChange={formik.handleChange}
								value={formik.values.address.state}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">State</label>
							{formik.touched.address?.state && formik.errors.address?.state ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.address.state}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="address.country"
								className={`form-control ${
									formik.touched.address?.country &&
									formik.errors.address?.country
										? "is-invalid"
										: ""
								}`}
								placeholder="Country"
								onChange={formik.handleChange}
								value={formik.values.address.country}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Country<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.address?.country &&
							formik.errors.address?.country ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.address.country}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="address.city"
								className={`form-control ${
									formik.touched.address?.city && formik.errors.address?.city
										? "is-invalid"
										: ""
								}`}
								placeholder="City"
								onChange={formik.handleChange}
								value={formik.values.address.city}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								City<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.address?.city && formik.errors.address?.city ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.address.city}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="street"
								autoComplete="on"
								name="address.street"
								className={`form-control ${
									formik.touched.address?.street &&
									formik.errors.address?.street
										? "is-invalid"
										: ""
								}`}
								placeholder="Street"
								onChange={formik.handleChange}
								value={formik.values.address.street}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Street<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.address?.street &&
							formik.errors.address?.street ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.address.street}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="address.houseNumber"
								className={`form-control ${
									formik.touched.address?.houseNumber &&
									formik.errors.address?.houseNumber
										? "is-invalid"
										: ""
								}`}
								placeholder="House Number"
								onChange={formik.handleChange}
								value={formik.values.address.houseNumber}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								House Number<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.address?.houseNumber &&
							formik.errors.address?.houseNumber ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.address.houseNumber}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="address.zip"
								className={`form-control ${
									formik.touched.address?.zip && formik.errors.address?.zip
										? "is-invalid"
										: ""
								}`}
								placeholder="Zip"
								onChange={formik.handleChange}
								value={formik.values.address.zip}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Zip-Code<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.address?.zip && formik.errors.address?.zip ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.address.zip}
								</div>
							) : null}
						</div>
					</div>
				</div>
				{errorMessage && (
					<div className="alert alert-danger" role="alert">
						{errorMessage}
					</div>
				)}
				<div className="d-flex mb-2 w-100 justify-content-center">
					<button
						type="button"
						className="btn btn-outline-info me-1"
						style={{ width: "100px" }}
						onClick={() => nav(-1)}
					>
						BACK
					</button>
					<button
						type="button"
						className="btn btn-outline-warning ms-1"
						style={{ width: "100px" }}
						onClick={() => formik.resetForm()}
					>
						CLEAR
					</button>
				</div>
				<div className="d-flex mb-2 w-100 justify-content-center">
					<button
						type="submit"
						className="btn btn-dark"
						style={{ width: "200px" }}
					>
						EDIT
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditCard;
