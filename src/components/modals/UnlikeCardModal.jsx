import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { ThemeContext } from "../Theme";
import { useContext } from "react";

const UnlikeCardModal = ({ show, handleClose, handleUnlikeCard }) => {
	const { themeClasses } = useContext(ThemeContext);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton className={themeClasses.bgColor}>
				<Modal.Title>Unlike Card?</Modal.Title>
			</Modal.Header>
			<Modal.Body className={themeClasses.bgColor}>
				<p>Are you sure you want to unlike this card?</p>
			</Modal.Body>
			<Modal.Footer className={themeClasses.bgColor}>
				<Button variant="outline-secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="danger" onClick={handleUnlikeCard}>
					Unlike
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

UnlikeCardModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleUnlikeCard: PropTypes.func.isRequired,
};

export default UnlikeCardModal;
