import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import {
	updateUserType,
	updateUserToken,
	logout,
} from "../services/userService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ThemeContext } from "./Theme";
import { format } from "date-fns";

const UserCard = ({ userData }) => {
	const [show, setShow] = useState(false);
	const [showLogOutModal, setShowLogOutModal] = useState(false);
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const { themeClasses } = useContext(ThemeContext);

	let token = localStorage.getItem("token");
	let userId = jwtDecode(token)._id;

	// Show / Hide --- Change User Type Modal
	const handleClose = () => {
		setErrorMessage("");
		setPassword("");
		setShow(false);
	};
	const handleShow = () => setShow(true);

	// Show / Hide --- Log Out Modal
	const handleLogOutShow = () => setShowLogOutModal(true);
	const handleLogOutClose = () => setShowLogOutModal(false);

	const handleConfirmChange = async () => {
		try {
			await updateUserType(userId, token);
			await updateUserToken(userData.email, password);
			setShow(false);
			location.reload();
		} catch (error) {
			if (error.response && error.response.status === 400) {
				error.message = "Incorrect password";
				setErrorMessage(error.message);
			}
			error.message = "User type change failed";
			console.error(error);
		}
	};

	const handleLogOut = async () => {
		await logout();
	};

	return (
		<>
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
			<Modal show={showLogOutModal} onHide={handleLogOutClose}>
				<Modal.Header closeButton className={themeClasses.bgColor}>
					<Modal.Title>Log Out?</Modal.Title>
				</Modal.Header>
				<Modal.Body className={themeClasses.bgColor}>
					<p>Are you sure you want to log out from your account?</p>
				</Modal.Body>
				<Modal.Footer className={themeClasses.bgColor}>
					<Button variant="outline-secondary" onClick={handleLogOutClose}>
						Cancel
					</Button>
					<Button variant="danger" onClick={handleLogOut}>
						Log Out
					</Button>
				</Modal.Footer>
			</Modal>
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="card mb-3">
							<div className="card-body">
								<h5 className="card-title">Full Name:</h5>
								<p className="card-text capitalize">
									{`${userData.name.first} ${userData.name.last}`}
								</p>
							</div>
						</div>
						<div className="card mb-3">
							<div className="card-body">
								<h5 className="card-title">Email Address:</h5>
								<p className="card-text">{userData.email}</p>
							</div>
						</div>
						<div className="card mb-3">
							<div className="card-body">
								<h5 className="card-title">Phone Number:</h5>
								<p className="card-text">{userData.phone}</p>
							</div>
						</div>
						<div className="card mb-3">
							<div className="card-body">
								<h5 className="card-title">Address:</h5>
								<p className="card-text">
									<strong>Street: </strong>
									<span className="capitalize">
										{userData.address.street} {userData.address.houseNumber}
									</span>
								</p>
								<p className="card-text">
									<strong>City: </strong>
									<span className="capitalize">{userData.address.city}</span>
								</p>
								{userData.address.state && (
									<p className="card-text">
										<strong>State / Province: </strong>
										<span className="capitalize">{userData.address.state}</span>
									</p>
								)}
								<p className="card-text">
									<strong>Country: </strong>
									<span className="capitalize">{userData.address.country}</span>
								</p>
								<p className="card-text">
									<strong>Zipcode: </strong>
									<span className="capitalize">{userData.address.zip}</span>
								</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="card mb-3">
							<div className="card-body">
								<h5 className="card-title">Image:</h5>
							</div>
							<div className="d-flex justify-content-center">
								<img
									className="card-image-bottom"
									src={userData.image.url}
									alt={userData.image.alt}
									style={{ width: "100px" }}
								/>
							</div>
						</div>
						<div className="card mb-3">
							<div className="card-body">
								<h5 className="card-title">User Type</h5>
								<p className="card-text">
									You are currently registered as a{" "}
									<span className="fw-bold">
										{userData.isBusiness ? "Business" : "Customer"}
									</span>
									.
								</p>
								<button onClick={handleShow} className="btn btn-warning w-100">
									Change to a{" "}
									<span className="fw-bold">
										{userData.isBusiness ? "Customer" : "Business"}
									</span>{" "}
									Account
								</button>
							</div>
						</div>
						<div className="card mb-3">
							<div className="card-body">
								<h5 className="card-title">Log Out</h5>
								<button
									className="btn btn-danger w-100"
									onClick={handleLogOutShow}
								>
									Log Out &nbsp;{" "}
									<i className="fa-solid fa-right-from-bracket"></i>
								</button>
							</div>
						</div>
						<div className="card mb-3">
							<div className="card-body">
								<p className="card-text">
									<strong>User Since: </strong>
									{format(new Date(userData.createdAt), "MMMM do yyyy")}{" "}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

UserCard.propTypes = {
	userData: PropTypes.object.isRequired,
};

export default UserCard;
