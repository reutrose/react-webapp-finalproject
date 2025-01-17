import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { ThemeContext } from "../Theme";
import { useContext } from "react";

const DeleteCardModal = ({ show, handleClose, handleDeleteCard }) => {
	const { themeClasses } = useContext(ThemeContext);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton className={themeClasses.bgColor}>
				<Modal.Title>Delete Card?</Modal.Title>
			</Modal.Header>
			<Modal.Body className={themeClasses.bgColor}>
				<p>Are you sure you want to delete this card permanently?</p>
			</Modal.Body>
			<Modal.Footer className={themeClasses.bgColor}>
				<Button variant="outline-secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="danger" onClick={handleDeleteCard}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

DeleteCardModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleDeleteCard: PropTypes.func.isRequired,
};

export default DeleteCardModal;
