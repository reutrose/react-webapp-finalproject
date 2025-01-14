import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	getAllCards,
	setPagesNumber,
	paginateCards,
	deleteCard,
	cardLikeUnlike,
} from "../services/cardService";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./Theme";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { jwtDecode } from "jwt-decode";

function Home({ setCards, filteredCards, setFilteredCards, userType }) {
	let [businessCards, setBusinessCards] = useState([]);
	let [page, setPage] = useState(1);
	let [range, setRange] = useState("");
	let [loading, setLoading] = useState(true);
	let nav = useNavigate();
	const { themeClasses } = useContext(ThemeContext);
	const pages = setPagesNumber(filteredCards, 12);

	const token = localStorage.getItem("token");
	let user = null;
	if (token) {
		user = jwtDecode(token);
	}

	useEffect(() => {
		getAllCards()
			.then((data) => {
				setCards(data);
				setFilteredCards(data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, [setCards, setFilteredCards]);

	useEffect(() => {
		const { displayCards, range } = paginateCards(filteredCards, page, 12);
		setBusinessCards(displayCards);
		setRange(range);
	}, [page, filteredCards]);

	const onClickHandler = (page) => {
		setPage(page.value);
	};

	const handleDelete = (cardId) => {
		deleteCard(cardId)
			.then(() => {
				setFilteredCards(filteredCards.filter((card) => card._id !== cardId));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleLikeUnlike = (cardId) => {
		cardLikeUnlike(cardId)
			.then((updatedCard) => {
				setFilteredCards(
					filteredCards.map((card) =>
						card._id === cardId ? updatedCard : card
					)
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className="container">
				<h2 className="display-2 fw-bold my-3">Cards Page</h2>
				<p className="fs-5 text">
					Here you can find business cards from all categories.
				</p>
				<div style={user.isBusiness ? null : { display: "none" }}>
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
				</div>
			</div>
			<hr />
			{loading ? (
				<div className="d-flex justify-content-center my-5">
					<Spinner animation="border" variant="primary" role="status"></Spinner>
				</div>
			) : (
				<>
					<div className="container row-lg-4 row-md-6 row-sm-12 text-center">
						<button
							className="btn btn-light btn-sm m-1"
							onClick={() => setPage(page - 1)}
							disabled={page === 1}
						>
							Prev
						</button>
						{pages.length ? (
							pages.map((pageItem) => (
								<button
									type="button"
									key={pageItem.id}
									className={`btn ${
										pageItem.value === page ? "active" : ""
									} btn-sm m-1`}
									data-bs-toggle="button"
									onClick={() => onClickHandler(pageItem)}
								>
									{pageItem.value}
								</button>
							))
						) : (
							<p>No pages.</p>
						)}
						<button
							className="btn btn-light btn-sm m-1"
							onClick={() => setPage(page + 1)}
							disabled={page === pages.length}
						>
							Next
						</button>
					</div>
					<div className="container row-lg-4 row-md-6 row-sm-12 text-center">
						{range} cards out of {filteredCards.length} cards.
					</div>
					<div className="row justify-content-evenly">
						{businessCards.length ? (
							businessCards.map((card) => (
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
												style={{ height: "200px", objectFit: "cover" }}
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
											{user ? (
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
											) : null}
											{userType === "business" || userType === "admin" ? (
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
											) : null}
											{userType === "business" || userType === "admin" ? (
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
											) : null}
										</Card.Footer>
									</Card>
								</div>
							))
						) : (
							<p>No cards found.</p>
						)}
					</div>
				</>
			)}
		</>
	);
}

Home.propTypes = {
	setCards: PropTypes.func.isRequired,
	filteredCards: PropTypes.array.isRequired,
	setFilteredCards: PropTypes.func.isRequired,
	userType: PropTypes.string.isRequired,
};

export default Home;
