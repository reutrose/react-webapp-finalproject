import { getCardById } from "../services/cardService";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { cardLikeUnlike, deleteCard } from "../services/cardService";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./Theme";
import { jwtDecode } from "jwt-decode";

function BusinessPage() {
	let { id } = useParams();
	const [loading, setLoading] = useState(true);
	let nav = useNavigate();
	const { themeClasses } = useContext(ThemeContext);

	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");
	let user = null;
	if (token) {
		user = jwtDecode(token);
	}
	let [businessCard, setBusinessCard] = useState({
		_id: "",
		title: "",
		bizNumber: "",
		phone: "",
	});

	useEffect(() => {
		getCardById(id)
			.then((card) => {
				setBusinessCard(card);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	const handleLikeUnlike = (cardId) => {
		cardLikeUnlike(cardId)
			.then((updatedCard) => {
				setBusinessCard(updatedCard);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = async (cardId) => {
		try {
			if (confirm("Are you sure you want to delete this card?")) {
				await deleteCard(cardId);
				nav("/");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			{loading ? (
				<div className="d-flex justify-content-center my-5">
					<Spinner animation="border" variant="primary" role="status"></Spinner>
				</div>
			) : (
				<>
					<div className="container mt-5">
						<div
							className={`card mb-3 ${themeClasses.bgColor} ${themeClasses.textColor}`}
						>
							<div className="card-body text-center">
								<h5 className="card-title capitalize">{businessCard.title}</h5>
								<p className="card-text capitalize">{businessCard.subtitle}</p>
							</div>
						</div>
					</div>
					<div className="container mb-5">
						<div className="row">
							<div className="col-12 col-md-6">
								<div
									className={`card mb-3 ${themeClasses.bgColor} ${themeClasses.textColor}`}
								>
									<div className="d-flex justify-content-center">
										<img
											className="card-image-bottom w-100 rounded"
											src={businessCard.image.url}
											alt={businessCard.image.alt}
											style={{ maxHeight: "400px" }}
										/>
									</div>
									{user && (
										<div className="card-body text-center">
											<Link
												className="mx-2 mt-2"
												onClick={() => handleLikeUnlike(businessCard._id)}
												style={{
													color: "inherit",
													cursor: "pointer",
												}}
											>
												{businessCard.likes &&
												businessCard.likes.includes(user._id) ? (
													<i className="fa-solid fa-heart text-danger"></i>
												) : (
													<i className="fa-regular fa-heart"></i>
												)}
											</Link>
										</div>
									)}
								</div>
								<div className="card mb-3 bg-danger">
									<div className="card-body">
										<p className="card-text text-white">
											Business Liked By {businessCard.likes.length} People.
										</p>
									</div>
								</div>
								{user.isBusiness && businessCard.user_id === user._id && (
									<div
										className={`card mb-3 ${themeClasses.bgColor} ${themeClasses.textColor}`}
									>
										<div className="card-body">
											<h5 className="card-title">Hello, Owner!</h5>
											<button
												className="w-100 mb-2 btn btn-warning"
												onClick={() => nav(`/edit-card/${businessCard._id}`)}
											>
												EDIT CARD
											</button>
											<button
												className="w-100 mb-2 btn btn-danger"
												onClick={() => handleDelete(businessCard._id)}
											>
												DELETE CARD
											</button>
										</div>
									</div>
								)}
							</div>
							<div className="col-12 col-md-6">
								<div
									className={`card mb-3 ${themeClasses.bgColor} ${themeClasses.textColor}`}
								>
									<div className="card-body">
										<h5 className="card-title">About The Business:</h5>
										<p className="card-text capitalize">
											{businessCard.description}
										</p>
									</div>
								</div>
								<div
									className={`card mb-3 ${themeClasses.bgColor} ${themeClasses.textColor}`}
								>
									<div className="card-body">
										<h5 className="card-title">Phone Number:</h5>
										<p className="card-text">{businessCard.phone}</p>
										<Link
											className="mx-2 mt-2"
											to={`tel:${businessCard.phone}`}
											style={{ color: "inherit" }}
										>
											<i className="fa-solid fa-phone"></i>
										</Link>
									</div>
								</div>
								<div
									className={`card mb-3 ${themeClasses.bgColor} ${themeClasses.textColor}`}
								>
									<div className="card-body">
										<h5 className="card-title">Email Address:</h5>
										<p className="card-text">{businessCard.email}</p>
									</div>
								</div>
								<div
									className={`card mb-3 ${themeClasses.bgColor} ${themeClasses.textColor}`}
								>
									<div className="card-body">
										<h5 className="card-title">Address:</h5>
										<p className="card-text">
											<strong>Street: </strong>
											<span className="capitalize">
												{businessCard.address.street}{" "}
												{businessCard.address.houseNumber}
											</span>
										</p>
										<p className="card-text">
											<strong>City: </strong>
											<span className="capitalize">
												{businessCard.address.city}
											</span>
										</p>
										{businessCard.address.state && (
											<p className="card-text">
												<strong>State / Province: </strong>
												<span className="capitalize">
													{businessCard.address.state}
												</span>
											</p>
										)}
										<p className="card-text">
											<strong>Country: </strong>
											<span className="capitalize">
												{businessCard.address.country}
											</span>
										</p>
										<p className="card-text">
											<strong>Zipcode: </strong>
											<span className="capitalize">
												{businessCard.address.zip}
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default BusinessPage;
