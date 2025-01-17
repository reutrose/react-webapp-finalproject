import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { ThemeContext } from "../Theme";
import { useContext } from "react";

const LogoutModal = ({ show, handleClose, handleLogout }) => {
	const { themeClasses } = useContext(ThemeContext);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton className={themeClasses.bgColor}>
				<Modal.Title>Log Out?</Modal.Title>
			</Modal.Header>
			<Modal.Body className={themeClasses.bgColor}>
				<p>Are you sure you want to log out from your account?</p>
			</Modal.Body>
			<Modal.Footer className={themeClasses.bgColor}>
				<Button variant="outline-secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="danger" onClick={handleLogout}>
					Log Out
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

LogoutModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleLogout: PropTypes.func.isRequired,
};

export default LogoutModal;
