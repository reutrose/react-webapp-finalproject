import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import {
	updateUserType,
	updateUserToken,
	logout,
	deleteUser,
} from "../services/userService";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import DeleteAccountModal from "./modals/DeleteAccountModal";
import LogoutModal from "./modals/LogoutModal";
import ChangeUserTypeModal from "./modals/ChangeUserTypeModal";

const UserCard = ({ userData }) => {
	const [showChangeUserTypeModal, setShowChangeUserTypeModal] = useState(false);
	const [showLogOutModal, setShowLogOutModal] = useState(false);
	const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");
	let userId = jwtDecode(token)._id;

	const handleConfirmChange = async () => {
		try {
			await updateUserType(userId, token);
			await updateUserToken(userData.email, password);
			setShowChangeUserTypeModal(false);
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

	const handleDeleteAccount = async () => {
		await deleteUser(userId, token);
		logout();
	};

	return (
		<>
			<ChangeUserTypeModal
				show={showChangeUserTypeModal}
				handleClose={() => setShowChangeUserTypeModal(false)}
				handleConfirmChange={handleConfirmChange}
				password={password}
				setPassword={setPassword}
				errorMessage={errorMessage}
				userData={userData}
			/>
			<LogoutModal
				show={showLogOutModal}
				handleClose={() => setShowLogOutModal(false)}
				handleLogout={handleLogOut}
			/>
			<DeleteAccountModal
				show={showDeleteAccountModal}
				handleClose={() => setShowDeleteAccountModal(false)}
				handleDeleteAccount={handleDeleteAccount}
			/>
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
								{userData.address.state != "not defined" && (
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
								<button
									onClick={() => setShowChangeUserTypeModal(true)}
									className="btn btn-warning w-100"
								>
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
									onClick={() => setShowLogOutModal(true)}
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
								<Link
									onClick={() => setShowDeleteAccountModal(true)}
									style={{ color: "red", textDecoration: "none" }}
								>
									I want to permanently delete my account.
								</Link>
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
