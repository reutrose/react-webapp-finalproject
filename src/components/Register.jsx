import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "../services/userService";
import { jwtDecode } from "jwt-decode";
import { ThemeContext } from "./Theme";
import { useContext, useState } from "react";

function Register() {
	const { themeClasses } = useContext(ThemeContext);
	const [errorMessage, setErrorMessage] = useState("");
	const nav = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: {
				first: "",
				middle: "",
				last: "",
			},
			phone: "",
			email: "",
			password: "",
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
			isBusiness: false,
		},
		validationSchema: Yup.object({
			name: Yup.object({
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
			}),
			phone: Yup.string()
				.matches(/^05\d{8}$/, "Invalid phone number.")
				.required("Phone number is a required field."),
			email: Yup.string()
				.email("Invalid email format.")
				.required("Email is a required field."),
			password: Yup.string()
				.min(9, "Password must be at least 9 characters")
				.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
				.matches(/[a-z]/, "Password must contain at least one lowercase letter")
				.matches(/\d/, "Password must contain at least one number")
				.matches(
					/[!@#$%^&*-]/,
					"Password must contain at least one special character"
				)
				.required("Password is a required field."),
			image: Yup.object({
				url: Yup.string().url("Invalid URL").min(14),
				alt: Yup.string()
					.min(2, "Image's Description must contain at least 2 characters.")
					.max(256),
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
					.min(2, "House number must contain at least 2 characters.")
					.max(256)
					.required("House number is a required field."),
				zip: Yup.string()
					.min(2, "Zip must contain at least 2 characters.")
					.max(256)
					.required("Zip is a required field."),
			}),
			isBusiness: Yup.boolean(),
		}),
		onSubmit: (values) => {
			userRegister(values)
				.then(() => {
					userLogin({ email: values.email, password: values.password })
						.then((response) => {
							const token = response;
							const user = jwtDecode(token);
							console.log(user);
							nav("/");
						})
						.catch((err) => {
							console.error("Login failed:", err);
						});
				})
				.catch((err) => {
					console.error("Registration failed:", err);
					if (err.response.data === "User already registered") {
						setErrorMessage("User already exists.");
					}
				});
		},
	});

	return (
		<div className={themeClasses.textColor}>
			<h1 className="my-4">Register</h1>
			<form onSubmit={formik.handleSubmit}>
				<div className="row">
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="name.first"
								className={`form-control ${
									formik.touched.name?.first && formik.errors.name?.first
										? "is-invalid"
										: ""
								}`}
								placeholder="First Name"
								onChange={formik.handleChange}
								value={formik.values.name.first}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								First Name<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.name?.first && formik.errors.name?.first ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.name.first}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="name.middle"
								className={`form-control ${
									formik.touched.name?.middle && formik.errors.name?.middle
										? "is-invalid"
										: ""
								}`}
								placeholder="Middle Name"
								onChange={formik.handleChange}
								value={formik.values.name.middle}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">Middle Name</label>
							{formik.touched.name?.middle && formik.errors.name?.middle ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.name.middle}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-floating mb-3">
							<input
								type="text"
								autoComplete="on"
								name="name.last"
								className={`form-control ${
									formik.touched.name?.last && formik.errors.name?.last
										? "is-invalid"
										: ""
								}`}
								placeholder="Last Name"
								onChange={formik.handleChange}
								value={formik.values.name.last}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Last Name<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.name?.last && formik.errors.name?.last ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.name.last}
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
								type="password"
								autoComplete="on"
								name="password"
								className={`form-control ${
									formik.touched.password && formik.errors.password
										? "is-invalid"
										: ""
								}`}
								placeholder="Password"
								onChange={formik.handleChange}
								value={formik.values.password}
								onBlur={formik.handleBlur}
							/>
							<label className="text-secondary">
								Password<span style={{ color: "red" }}>*</span>
							</label>
							{formik.touched.password && formik.errors.password ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.password}
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
							<label className="text-secondary">Image URL</label>
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
							<label className="text-secondary">Image Description</label>
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
					<div className="col-md-6 mb-3">
						<div className="form-check mb-3">
							<input
								type="checkbox"
								name="isBusiness"
								className="form-check-input"
								onChange={formik.handleChange}
								checked={formik.values.isBusiness}
							/>
							<label className={`form-check-label ${themeClasses.textColor}`}>
								Signup as business.
							</label>
							{formik.touched.isBusiness && formik.errors.isBusiness ? (
								<div
									className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
								>
									{formik.errors.isBusiness}
								</div>
							) : null}
						</div>
					</div>
				</div>
				{errorMessage && (
					<div className="alert alert-danger" role="alert">
						{errorMessage} &nbsp;
						<Link to="/login" className="alert-link">
							Already a member? Login!
						</Link>
					</div>
				)}
				<div className="d-flex mb-2 w-100 justify-content-center">
					<button
						type="button"
						className="btn btn-outline-info me-1"
						style={{ width: "100px" }}
						onClick={() => nav("/")}
					>
						<i className="fa-solid fa-house"></i>
					</button>
					<button
						type="button"
						className="btn btn-outline-warning ms-1"
						style={{ width: "100px" }}
						onClick={() => formik.resetForm()}
					>
						<i className="fa-solid fa-arrows-rotate"></i>
					</button>
				</div>
				<div className="d-flex mb-2 w-100 justify-content-center">
					<button
						type="submit"
						disabled={!formik.dirty || !formik.isValid}
						className="btn btn-dark"
						style={{ width: "200px" }}
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
}

export default Register;
