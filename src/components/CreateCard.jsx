import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./Theme";
import { useContext, useState } from "react";
import { createNewCard } from "../services/cardService";
import {
	addressValidation,
	descriptionValidation,
	emailValidation,
	imageValidation,
	phoneValidation,
	subtitleValidation,
	titleValidation,
	websiteValidation,
} from "../services/schemaService";
import FormField from "./FormField";

function CreateCard() {
	const { themeClasses } = useContext(ThemeContext);
	const [errorMessage, setErrorMessage] = useState("");
	const nav = useNavigate();

	const handleCreateNewCard = async (values) => {
		try {
			const newCard = await createNewCard(values);
			return newCard._id;
		} catch (error) {
			setErrorMessage(error.toString());
		}
	};

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
			title: titleValidation,
			subtitle: subtitleValidation,
			description: descriptionValidation,
			phone: phoneValidation,
			email: emailValidation,
			web: websiteValidation,
			image: imageValidation,
			address: addressValidation,
		}),
		onSubmit: (values) => {
			handleCreateNewCard(values)
				.then((data) => {
					if (data) {
						nav(`/business-details/${data}`);
					}
				})
				.catch((err) => {
					console.error("Couldn't Create New Card: ", err);
				});
		},
	});

	return (
		<div className={themeClasses.textColor}>
			<h1 className="my-4">Create New Card</h1>
			<form onSubmit={formik.handleSubmit}>
				<div className="row">
					<div className="col-md-6 mb-3">
						<FormField
							name="title"
							type="text"
							fieldFor="Title"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="subtitle"
							type="text"
							fieldFor="Subtitle"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="col-md-6 mb-3">
						<FormField
							name="description"
							type="text"
							fieldFor="Description"
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
							name="web"
							type="url"
							fieldFor="Web"
							formik={formik}
							required={false}
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
				</div>
				{errorMessage && (
					<div className="alert alert-danger" role="alert">
						{errorMessage}
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
						SUBMIT
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreateCard;
