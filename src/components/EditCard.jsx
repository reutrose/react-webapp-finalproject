import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { getCardById, updateCard } from "../services/cardService";
import { useFormik } from "formik";
import { ThemeContext } from "./Theme";
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
				formik.setValues({
					title: card.title,
					subtitle: card.subtitle,
					description: card.description,
					phone: card.phone,
					email: card.email,
					web: card.web,
					image: {
						url:
							card.image.url ===
							"https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg"
								? ""
								: card.image.url,
						alt: card.image.alt === "business card image" ? "" : card.image.alt,
					},
					address: {
						state: card.address.state,
						country: card.address.country,
						city: card.address.city,
						street: card.address.street,
						houseNumber: card.address.houseNumber,
						zip: card.address.zip,
					},
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]);

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
			updateCard(id, values)
				.then((response) => {
					nav(`/business-details/${response._id}`);
				})
				.catch((err) => {
					console.error("Update failed:", err);
					let error = "Update failed: " + err;
					if (error === "Update failed: Error: Email already exists.") {
						setErrorMessage("Email already exists.");
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
						<FormField
							name="title"
							type="text"
							fieldFor="Title"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
							capitalize={true}
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
							capitalize={true}
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
							capitalLetter={true}
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
						onClick={() => nav(-1)}
					>
						BACK
					</button>
					<button
						type="button"
						className="btn btn-outline-warning ms-1 half-row-btn"
						onClick={() => formik.resetForm()}
					>
						CLEAR
					</button>
				</div>
				<div className="d-flex mb-2 w-100 justify-content-center">
					<button type="submit" className="btn btn-dark full-row-btn">
						EDIT
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditCard;
