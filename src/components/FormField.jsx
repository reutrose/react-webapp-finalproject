import PropTypes from "prop-types";
import { getIn } from "formik";

const FormField = ({
	type = "text",
	name,
	label,
	placeholder,
	formik,
	disabled,
	themeClasses = {},
	autoComplete = "on",
	capitalize = false,
	capitaletters = false,
}) => {
	const error = getIn(formik.touched, name) && getIn(formik.errors, name);
	const value = getIn(formik.values, name);

	return (
		<div className="form-floating mb-3">
			<input
				type={type}
				name={name}
				className={`form-control ${capitalize ? "capitalize" : ""} ${
					capitaletters ? "capitaletters" : ""
				} ${error ? "is-invalid" : ""}`}
				placeholder={placeholder || label}
				onChange={formik.handleChange}
				value={value}
				onBlur={formik.handleBlur}
				disabled={disabled}
				autoComplete={autoComplete}
			/>
			<label className="text-secondary">{label}</label>
			{error && (
				<div
					className={`invalid-feedback ${themeClasses.fbColor} rounded px-2`}
				>
					{getIn(formik.errors, name)}
				</div>
			)}
		</div>
	);
};

FormField.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	formik: PropTypes.object.isRequired,
	disabled: PropTypes.bool,
	themeClasses: PropTypes.object,
	autoComplete: PropTypes.string,
	capitalize: PropTypes.bool,
	capitaletters: PropTypes.bool,
};

export default FormField;
