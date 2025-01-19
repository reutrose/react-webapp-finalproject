import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "../services/userService";
import { ThemeContext } from "./Theme";
import { useContext, useState } from "react";
import FormField from "./FormField";
import {
	nameValidation,
	phoneValidation,
	emailValidation,
	passwordValidation,
	imageValidation,
	addressValidation,
	isBusinessValidation,
} from "../services/schemaService";

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
			name: nameValidation,
			phone: phoneValidation,
			email: emailValidation,
			password: passwordValidation,
			image: imageValidation,
			address: addressValidation,
			isBusiness: isBusinessValidation,
		}),
		onSubmit: (values) => {
			userRegister(values)
				.then(() => {
					userLogin(values.email, values.password, false)
						.then(nav("/"))
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
						<FormField
							name="name.first"
							type="text"
							fieldFor="First Name"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="name.middle"
							type="text"
							fieldFor="Middle Name"
							formik={formik}
							required={false}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="name.last"
							type="text"
							fieldFor="Last Name"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="phone"
							type="text"
							fieldFor="Phone"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="email"
							type="text"
							fieldFor="Email"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="password"
							type="password"
							fieldFor="Password"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="image.url"
							type="url"
							fieldFor="Image URL"
							formik={formik}
							required={false}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="image.alt"
							type="text"
							fieldFor="Image Description"
							formik={formik}
							required={false}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="address.state"
							type="text"
							fieldFor="State"
							formik={formik}
							required={false}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="address.country"
							type="text"
							fieldFor="Country"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="address.city"
							type="text"
							fieldFor="City"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="address.street"
							type="text"
							fieldFor="Street"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="address.houseNumber"
							type="text"
							fieldFor="House Number"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="address.zip"
							type="text"
							fieldFor="Zip-Code"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
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
						className="btn btn-outline-info me-1 half-row-btn"
						onClick={() => nav("/")}
					>
						<i className="fa-solid fa-house"></i>
					</button>
					<button
						type="button"
						className="btn btn-outline-warning ms-1 half-row-btn"
						onClick={() => formik.resetForm()}
					>
						<i className="fa-solid fa-arrows-rotate"></i>
					</button>
				</div>
				<div className="d-flex mb-2 w-100 justify-content-center">
					<button
						type="submit"
						disabled={!formik.dirty || !formik.isValid}
						className="btn btn-dark full-row-btn"
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
}

export default Register;
