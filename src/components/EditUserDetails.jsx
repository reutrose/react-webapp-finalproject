import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import { getUserById, updateUser } from "../services/userService";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./Theme";
import FormField from "./FormField";
import {
	addressValidation,
	imageValidation,
	nameValidation,
	phoneValidation,
} from "../templates/userValidationSchemas";

function EditUserDetails({ setDisplay }) {
	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");
	let userId = jwtDecode(token)._id;
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	let nav = useNavigate();
	const { themeClasses } = useContext(ThemeContext);

	const formik = useFormik({
		initialValues: {
			name: {
				first: "",
				middle: "",
				last: "",
			},
			phone: "",
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
			name: nameValidation,
			phone: phoneValidation,
			image: imageValidation,
			address: addressValidation,
		}),
		onSubmit: (values) => {
			updateUser(values, userId)
				.then(() => {
					setDisplay(false);
					nav("/profile");
				})
				.catch((err) => {
					console.error("Update failed:", err);
					setErrorMessage("Failed to update user details.");
				});
		},
	});

	useEffect(() => {
		getUserById()
			.then((userData) => {
				formik.setValues({
					name: {
						first: userData.name.first,
						middle: userData.name.middle,
						last: userData.name.last,
					},
					phone: userData.phone,
					image: {
						url: userData.image.url,
						alt: userData.image.alt,
					},
					address: {
						state: userData.address.state,
						country: userData.address.country,
						city: userData.address.city,
						street: userData.address.street,
						houseNumber: userData.address.houseNumber,
						zip: userData.address.zip,
					},
				});
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	return (
		<div>
			{loading ? (
				<div className="d-flex justify-content-center my-5">
					<Spinner animation="border" variant="primary" role="status"></Spinner>
				</div>
			) : (
				<>
					<div className={themeClasses.textColor}>
						<form onSubmit={formik.handleSubmit}>
							<div className="row">
								<div className="col-md-6 mb-3">
									<FormField
										name="name.first"
										label="First Name (required)"
										placeholder="First Name"
										formik={formik}
										capitalize
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="name.middle"
										label="Middle Name"
										placeholder="Middle Name"
										formik={formik}
										capitalize
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="name.last"
										label="Last Name (required)"
										placeholder="Last Name"
										formik={formik}
										capitalize
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="phone"
										label="Phone (required)"
										placeholder="Phone"
										formik={formik}
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										type="url"
										name="image.url"
										label="Image URL"
										placeholder="Image URL"
										formik={formik}
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="image.alt"
										label="Image Description"
										placeholder="Image Description"
										formik={formik}
										capitalize
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="address.state"
										label="State"
										placeholder="State"
										formik={formik}
										capitaletters
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="address.country"
										label="Country (required)"
										placeholder="Country"
										formik={formik}
										capitalize
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="address.city"
										label="City (required)"
										placeholder="City"
										formik={formik}
										capitalize
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="address.street"
										label="Street (required)"
										placeholder="Street"
										formik={formik}
										capitalize
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="address.houseNumber"
										label="House Number (required)"
										placeholder="House Number"
										formik={formik}
										capitalize
									/>
								</div>
								<div className="col-md-6 mb-3">
									<FormField
										name="address.zip"
										label="Zip-Code (required)"
										placeholder="Zip"
										formik={formik}
										capitalize
									/>
								</div>
							</div>
							<div className="d-flex mb-2 w-100 justify-content-center">
								<button
									type="button"
									className="btn btn-outline-info me-1"
									style={{ width: "100px" }}
									onClick={() => location.reload()}
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
							{errorMessage && (
								<div className="alert alert-danger text-center">
									{errorMessage}
								</div>
							)}
							<div className="d-flex mb-2 w-100 justify-content-center">
								<button
									type="submit"
									className="btn btn-dark"
									style={{ width: "200px" }}
								>
									SAVE
								</button>
							</div>
						</form>
					</div>
				</>
			)}
		</div>
	);
}

EditUserDetails.propTypes = {
	setDisplay: PropTypes.func.isRequired,
	isBusiness: PropTypes.bool.isRequired,
};

export default EditUserDetails;
