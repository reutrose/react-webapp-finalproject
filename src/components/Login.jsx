import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { ThemeContext } from "./Theme";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/userService";

function Login() {
	const { themeClasses } = useContext(ThemeContext);
	const nav = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			stayLoggedIn: false,
		},
		validationSchema: yup.object({
			email: yup
				.string()
				.required("Email is required.")
				.email("Invalid email format.")
				.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format."),
			password: yup
				.string()
				.required("Password is required.")
				.min(10, "Password must be at least 10 characters"),
			stayLoggedIn: yup.boolean(),
		}),
		onSubmit: async (values) => {
			try {
				await userLogin(values.email, values.password, values.stayLoggedIn);
				nav("/");
			} catch (error) {
				console.error("Login failed:", error);
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
						<input
							type="email"
							autoComplete="on"
							name="email"
							className={`form-control ${
								formik.touched.email && formik.errors.email ? "is-invalid" : ""
							}`}
							id="floatingInput"
							placeholder="name@example.com"
							onChange={formik.handleChange}
							value={formik.values.email}
							onBlur={formik.handleBlur}
						/>
						<label
							htmlFor="floatingInput"
							className={`text-secondary ${
								formik.touched.email && formik.errors.email ? "text-danger" : ""
							}`}
						>
							Email*
						</label>
						{formik.touched.email && formik.errors.email ? (
							<div
								className={`invalid-feedback ${themeClasses.fbColor} rounded`}
							>
								{formik.errors.email}
							</div>
						) : null}
					</div>
					<div className="form-floating mb-2 w-100">
						<input
							type="password"
							autoComplete="on"
							name="password"
							className={`form-control ${
								formik.touched.password && formik.errors.password
									? "is-invalid"
									: ""
							}`}
							id="floatingPassword"
							placeholder="Password"
							onChange={formik.handleChange}
							value={formik.values.password}
							onBlur={formik.handleBlur}
						/>
						<label
							htmlFor="floatingPassword"
							className={`text-secondary ${
								formik.touched.password && formik.errors.password
									? "text-danger"
									: ""
							}`}
						>
							Password*
						</label>
						{formik.touched.password && formik.errors.password ? (
							<div
								className={`invalid-feedback ${themeClasses.fbColor} rounded`}
							>
								{formik.errors.password}
							</div>
						) : null}
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
