import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";
import { ThemeContext } from "./Theme";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/userService";
import { emailValidation, passwordValidation } from "../services/schemaService";
import FormField from "./FormField";

function Login() {
	const { themeClasses } = useContext(ThemeContext);
	const nav = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			stayLoggedIn: false,
		},
		validationSchema: yup.object({
			email: emailValidation,
			password: passwordValidation,
			stayLoggedIn: yup.boolean(),
		}),
		onSubmit: async (values) => {
			try {
				await userLogin(values.email, values.password, values.stayLoggedIn);
				nav("/");
			} catch (error) {
				console.error("Login failed:", error);
				setErrorMessage("Invalid email or password.");
			}
		},
	});

	return (
		<>
			<div className="container text-center mt-5 col-12 col-md-6">
				<h4 className="display-6 fw-bold">LOGIN</h4>
				<form
					onSubmit={formik.handleSubmit}
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div className="form-floating mb-2 w-100">
						<FormField
							name="email"
							type="text"
							fieldFor="Email"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="form-floating mb-2 w-100">
						<FormField
							name="password"
							type="password"
							fieldFor="Password"
							formik={formik}
							required={true}
							fbColor={themeClasses.fbColor}
						/>
					</div>
					<div className="form-check mb-3">
						<input
							type="checkbox"
							name="stayLoggedIn"
							className="form-check-input"
							onChange={formik.handleChange}
							checked={formik.values.stayLoggedIn}
						/>
						<label className={`form-check-label ${themeClasses.textColor}`}>
							Keep me logged in.
						</label>
						{formik.touched.stayLoggedIn && formik.errors.stayLoggedIn ? (
							<div
								className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
							>
								{formik.errors.stayLoggedIn}
							</div>
						) : null}
					</div>
					{errorMessage && (
						<div className="alert alert-danger text-center">{errorMessage}</div>
					)}
					<div className="d-flex w-100 mb-2">
						<button
							type="button"
							className="btn btn-outline-info w-50 me-1"
							onClick={() => nav("/")}
						>
							<i className="fa-solid fa-house"></i>
						</button>
						<button
							type="button"
							className="btn btn-outline-warning w-50 ms-1"
							onClick={() => formik.resetForm()}
						>
							<i className="fa-solid fa-arrows-rotate"></i>
						</button>
					</div>
					<button
						type="submit"
						className="btn btn-dark w-100"
						disabled={!formik.dirty || !formik.isValid}
					>
						SUBMIT
					</button>
					<div className={`w-100 my-2 ${themeClasses.bgColor} rounded`}>
						<Link to="/register" className="text-decoration-none">
							New User? Register Now!
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}

export default Login;
