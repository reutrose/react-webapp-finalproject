import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import {
	cardLikeUnlike,
	deleteCard,
	getAllMyCards,
} from "../services/cardService";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./Theme";
import { jwtDecode } from "jwt-decode";

function MyCards() {
	let [myCards, setMyCards] = useState([]);
	const [loading, setLoading] = useState(true);
	let nav = useNavigate();
	const { themeClasses } = useContext(ThemeContext);

	const token = localStorage.getItem("token");
	let user = null;
	if (token) {
		user = jwtDecode(token);
	}

	const getMyCards = async () => {
		try {
			setLoading(true);
			const cards = await getAllMyCards();
			setMyCards(cards);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleLikeUnlike = (cardId) => {
		cardLikeUnlike(cardId)
			.then((updatedCard) => {
				setMyCards(
					myCards.map((card) => (card._id === cardId ? updatedCard : card))
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = async (cardId) => {
		try {
			if (confirm("Are you sure you want to delete this card?")) {
				await deleteCard(cardId).then(() => {
					setMyCards(myCards.filter((card) => card._id !== cardId));
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getMyCards();
	}, []);

	return (
		<div>
			<h1>My Cards</h1>
			<Link
				to="/create-card"
				className="btn btn-primary rounded-circle"
				style={{
					position: "fixed",
					bottom: "90px",
					right: "15px",
					width: "50px",
					height: "50px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<i className="fa-solid fa-plus"></i>
			</Link>
			{loading ? (
				<div className="d-flex justify-content-center my-5">
					<Spinner animation="border" variant="primary" role="status"></Spinner>
				</div>
			) : (
				<div className="row justify-content-evenly">
					{myCards.length ? (
						myCards.map((card) => (
							<div
								className="col-lg-4 col-md-6 col-sm-12 align-items-center my-2"
								key={card._id}
							>
								<Card
									className={`card my-2 col-lg-12 h-100 ${themeClasses.bgColor} ${themeClasses.textColor}`}
								>
									<span
										style={{ cursor: "pointer" }}
										onClick={() => {
											nav(`/business-details/${card._id}`);
										}}
									>
										<Card.Img
											variant="top"
											style={{
												height: "200px",
												objectFit: "cover",
												cursor: "pointer",
											}}
											src={card.image.url}
											alt={card.image.alt}
										/>
										<Card.Body>
											<Card.Title>{card.title}</Card.Title>
											<Card.Text
												style={{
													height: "70px",
												}}
											>
												{card.subtitle}
											</Card.Text>
											<hr />
											<ListGroup variant="flush">
												<ListGroup.Item
													className={`m-1 ${themeClasses.bgColor} ${themeClasses.textColor}`}
												>
													<span className="fw-bold">Phone: </span>
													{card.phone}
												</ListGroup.Item>
												<ListGroup.Item
													className={`m-1 ${themeClasses.bgColor} ${themeClasses.textColor}`}
												>
													<span className="fw-bold">Address: </span>
													{card.address.street} {card.address.houseNumber},
													<br />
													{card.address.city}, {card.address.country}
												</ListGroup.Item>
												<ListGroup.Item
													className={`m-1 ${themeClasses.bgColor} ${themeClasses.textColor}`}
												>
													<span className="fw-bold">Card Number: </span>
													{card.bizNumber}
												</ListGroup.Item>
											</ListGroup>
										</Card.Body>
									</span>
									<Card.Footer
										className={`col d-flex justify-content-center text-center border-secondary ${themeClasses.bgColor}`}
									>
										<Link
											className="mx-2 mt-2"
											to={`tel:${card.phone}`}
											style={{ color: "inherit" }}
										>
											<i className="fa-solid fa-phone"></i>
										</Link>
										<Link
											className="mx-2 mt-2"
											onClick={() => handleLikeUnlike(card._id)}
											style={{
												display: user ? "inline-block" : "none",
												color: "inherit",
												cursor: "pointer",
											}}
										>
											{card.likes && card.likes.includes(user._id) ? (
												<i className="fa-solid fa-heart text-danger"></i>
											) : (
												<i className="fa-regular fa-heart"></i>
											)}
										</Link>
										<Link
											className="mx-2 mt-2"
											to={`/edit-card/${card._id}`}
											style={{
												display:
													user.isBusiness && card.user_id === user._id
														? "inline-block"
														: "none",
												color: "inherit",
												cursor: "pointer",
											}}
										>
											<i className="fa-solid fa-pen-to-square"></i>
										</Link>
										<Link
											className="mx-2 mt-2"
											onClick={() => handleDelete(card._id)}
											style={{
												display:
													user.isBusiness && card.user_id === user._id
														? "inline-block"
														: "none",
												color: "inherit",
												cursor: "pointer",
											}}
										>
											<i className="fa-solid fa-trash-can"></i>
										</Link>
									</Card.Footer>
								</Card>
							</div>
						))
					) : (
						<p>No cards found.</p>
					)}
				</div>
			)}
		</div>
	);
}

export default MyCards;
