import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { ThemeContext } from "../Theme";
import { useContext } from "react";

const ChangeUserTypeModal = ({
	show,
	handleClose,
	handleConfirmChange,
	password,
	setPassword,
	errorMessage,
	userData,
}) => {
	const { themeClasses } = useContext(ThemeContext);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton className={themeClasses.bgColor}>
				<Modal.Title>
					Change to a {userData.isBusiness ? "Customer" : "Business"} Account
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={themeClasses.bgColor}>
				<p>
					Changing the user type will change your permissions. Are you sure?
				</p>
				<div className="input-group">
					<span className="input-group-text">Confirm Password:</span>
					<input
						type="password"
						aria-label="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{errorMessage && (
					<div className="alert alert-danger" role="alert">
						{errorMessage}
					</div>
				)}
			</Modal.Body>
			<Modal.Footer className={themeClasses.bgColor}>
				<Button variant="danger" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="success" onClick={handleConfirmChange}>
					Change
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

ChangeUserTypeModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleConfirmChange: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
	setPassword: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	userData: PropTypes.object.isRequired,
};

export default ChangeUserTypeModal;
