import PropTypes from "prop-types";

function ValidationError({ touched, error, fbColor }) {
	if (!touched || !error) return null;

	return (
		<div className={`invalid-feedback ${fbColor} rounded px-2`}>{error}</div>
	);
}

ValidationError.propTypes = {
	touched: PropTypes.bool,
	error: PropTypes.string,
	fbColor: PropTypes.string,
};

export default ValidationError;
