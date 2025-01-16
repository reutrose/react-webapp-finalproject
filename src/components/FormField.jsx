import PropTypes from "prop-types";
import ValidationError from "./ValidationError";
import { getIn } from "formik";

function FormField({
	name,
	type,
	formik,
	required,
	fieldFor,
	fbColor,
	capitalize,
}) {
	const { value, onChange, onBlur } = formik.getFieldProps(name);

	return (
		<div className="form-floating mb-3">
			<input
				id={name}
				type={type}
				autoComplete="on"
				name={name}
				className={`form-control ${capitalize ? "capitalize" : null} ${
					getIn(formik.touched, name) && getIn(formik.errors, name)
						? "is-invalid"
						: ""
				}`}
				placeholder={fieldFor}
				onChange={onChange}
				value={value}
				onBlur={onBlur}
			/>
			<label htmlFor={name} className="text-secondary">
				{fieldFor}
				{required && <span style={{ color: "red" }}>*</span>}
			</label>
			<ValidationError
				touched={getIn(formik.touched, name)}
				error={getIn(formik.errors, name)}
				fbColor={fbColor}
			/>
		</div>
	);
}

FormField.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	fbColor: PropTypes.string,
	capitalize: PropTypes.bool,
	fieldFor: PropTypes.string.isRequired,
	formik: PropTypes.object.isRequired,
	required: PropTypes.bool,
};

export default FormField;
