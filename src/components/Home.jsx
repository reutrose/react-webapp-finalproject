import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	getAllCards,
	setPagesNumber,
	paginateCards,
	deleteCard,
	cardLikeUnlike,
} from "../services/cardService";
import Spinner from "react-bootstrap/Spinner";
import { jwtDecode } from "jwt-decode";
import CardTemplate from "./CardTemplate";
import { Link } from "react-router-dom";
import DeleteCardModal from "./modals/DeleteCardModal";

function Home({ setCards, filteredCards, setFilteredCards, userType }) {
	let [businessCards, setBusinessCards] = useState([]);
	let [page, setPage] = useState(1);
	let [range, setRange] = useState("");
	let [loading, setLoading] = useState(true);
	const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
	const [selectedCardId, setSelectedCardId] = useState(null);
	const pages = setPagesNumber(filteredCards, 12);

	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");
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
				console.error(err);
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
				setShowDeleteCardModal(false);
				setFilteredCards(filteredCards.filter((card) => card._id !== cardId));
			})
			.catch((err) => {
				console.error(err);
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
				console.error(err);
			});
	};

	return (
		<>
			<DeleteCardModal
				show={showDeleteCardModal}
				handleClose={() => setShowDeleteCardModal(false)}
				handleDeleteCard={() => handleDelete(selectedCardId)}
			/>
			<div className="container">
				<h2 className="display-2 fw-bold my-3">Cards Page</h2>
				<p className="fs-5 text">
					Here you can find business cards from all categories.
				</p>
				<div
					style={
						user
							? user.isBusiness
								? null
								: { display: "none" }
							: { display: "none" }
					}
				>
					<Link
						to="/create-card"
						className="btn btn-primary rounded-circle add-card"
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
								<CardTemplate
									key={card._id}
									card={card}
									handleLikeUnlike={handleLikeUnlike}
									handleDelete={() => {
										setSelectedCardId(card._id);
										setShowDeleteCardModal(true);
									}}
									userType={userType}
								/>
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
