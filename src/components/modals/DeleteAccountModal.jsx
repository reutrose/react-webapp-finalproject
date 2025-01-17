import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { ThemeContext } from "../Theme";
import { useContext } from "react";

const DeleteAccountModal = ({ show, handleClose, handleDeleteAccount }) => {
	const { themeClasses } = useContext(ThemeContext);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton className={themeClasses.bgColor}>
				<Modal.Title>Delete Account?</Modal.Title>
			</Modal.Header>
			<Modal.Body className={themeClasses.bgColor}>
				<p>Are you sure you want to delete your account permanently?</p>
			</Modal.Body>
			<Modal.Footer className={themeClasses.bgColor}>
				<Button variant="outline-secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="danger" onClick={handleDeleteAccount}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

DeleteAccountModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleDeleteAccount: PropTypes.func.isRequired,
};

export default DeleteAccountModal;
