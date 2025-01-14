import { useContext, useEffect, useState } from "react";
import {
	deleteUser,
	getAllUsers,
	getUserById,
	updateUserType,
} from "../services/userService";
import { getAllCards } from "../services/cardService";
import { ThemeContext } from "./Theme";
import Spinner from "react-bootstrap/Spinner";
import { jwtDecode } from "jwt-decode";

function Sandbox() {
	let [users, setUsers] = useState([]);
	let [cards, setCards] = useState([]);
	let [searchTerm, setSearchTerm] = useState("");
	let [expandedUserId, setExpandedUserId] = useState(null);
	let [loading, setLoading] = useState(true);
	let [processingUserId, setProcessingUserId] = useState(null);
	let [deletingUserId, setDeletingUserId] = useState(null);
	let [currentAdmin, setCurrentAdmin] = useState(null);
	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");
	let loggedUserId = token ? jwtDecode(token)._id : null;
	const { themeClasses } = useContext(ThemeContext);

	useEffect(() => {
		const fetchData = async () => {
			const usersData = await getAllUsers();
			const cardsData = await getAllCards();
			const loggedUser = await getUserById(loggedUserId);
			setUsers(usersData);
			setCards(cardsData);
			setCurrentAdmin(loggedUser);
			setLoading(false);
		};
		fetchData();
	}, []);

	const handleEditRole = async (userId) => {
		try {
			setProcessingUserId(userId);
			const token =
				sessionStorage.getItem("token") || localStorage.getItem("token");
			await updateUserType(userId, token);
			getAllUsers().then((users) => {
				setUsers(users);
				setProcessingUserId(null);
			});
		} catch (error) {
			console.error(error);
			setProcessingUserId(null);
		}
	};

	const handleDelete = async (userId) => {
		try {
			setDeletingUserId(userId);
			const token =
				sessionStorage.getItem("token") || localStorage.getItem("token");
			await deleteUser(userId, token);
			getAllUsers().then((users) => {
				setUsers(users);
				setDeletingUserId(null);
			});
		} catch (error) {
			console.error(error);
			setDeletingUserId(null);
		}
	};

	const filteredUsers = users.filter((user) => {
		const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
		const role = user.isAdmin
			? "admin"
			: user.isBusiness
			? "business"
			: "customer";
		return (
			fullName.includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			role.includes(searchTerm.toLowerCase())
		);
	});

	const handleRowClick = (userId) => {
		setExpandedUserId(expandedUserId === userId ? null : userId);
	};

	const getUserCardCount = (userId) => {
		return cards.filter((card) => card.user_id === userId).length;
	};

	return (
		<>
			<div className="container mt-4 mb-4 text-center">
				<h1>Hello, Admin!</h1>
				<p>
					Welcome to the admin sandbox. Here you can edit and delete users from
					the database.
				</p>
				<input
					type="text"
					placeholder="Search by name, email, or role"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="form-control mb-3"
				/>
			</div>
			{loading ? (
				<div className="text-center">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			) : filteredUsers.length > 0 ? (
				<div className="table-responsive">
					<table
						className={`table table-hover table-bordered ${themeClasses.tableColor}`}
					>
						<thead>
							<tr>
								<th scope="col" className="w-20">
									Email
								</th>
								<th scope="col">Role</th>
								<th scope="col">Cards</th>
								<th scope="col">Edit Role</th>
								<th scope="col">DEL</th>
							</tr>
						</thead>
						<tbody>
							{filteredUsers.map((user) => (
								<>
									<tr key={user._id}>
										<td
											className={"w-20"}
											onClick={() => handleRowClick(user._id)}
											style={{ cursor: "pointer" }}
										>
											{user.email}{" "}
											<span className="text-danger">
												{currentAdmin._id === user._id ? "(YOU)" : ""}
											</span>
										</td>
										<td style={{ cursor: "default" }}>
											{user.isAdmin
												? "Admin"
												: user.isBusiness
												? "Business"
												: "Customer"}
										</td>
										<td style={{ cursor: "default" }}>
											{getUserCardCount(user._id)}
										</td>
										<td>
											{!user.isAdmin ? (
												<button
													className={`btn btn-sm btn-${
														user.isBusiness ? "info" : "warning"
													}`}
													onClick={() => handleEditRole(user._id)}
													disabled={processingUserId === user._id}
												>
													{processingUserId === user._id
														? "Processing..."
														: `Make ${
																user.isBusiness ? "Customer" : "Business"
														  }`}
												</button>
											) : null}
										</td>
										<td>
											{!user.isAdmin ? (
												<button
													className={"btn btn-sm btn-danger"}
													onClick={() => handleDelete(user._id)}
													disabled={deletingUserId === user._id}
												>
													{deletingUserId === user._id ? (
														<Spinner
															as="span"
															animation="border"
															size="sm"
															role="status"
															aria-hidden="true"
														/>
													) : (
														<i className="fa-solid fa-trash-can"></i>
													)}
												</button>
											) : null}
										</td>
									</tr>
									{expandedUserId === user._id && (
										<tr>
											<td colSpan="5">
												<strong>First Name:</strong> {user.name.first} <br />
												<strong>Last Name:</strong> {user.name.last}
											</td>
										</tr>
									)}
								</>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p>No users found</p>
			)}
		</>
	);
}

export default Sandbox;
