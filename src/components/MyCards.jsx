import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import {
	cardLikeUnlike,
	deleteCard,
	getAllMyCards,
} from "../services/cardService";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CardTemplate from "./CardTemplate";
import DeleteCardModal from "./modals/DeleteCardModal";

function MyCards() {
	let [myCards, setMyCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
	const [selectedCardId, setSelectedCardId] = useState(null);

	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");
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
				console.error(err);
			});
	};

	const handleDelete = async (cardId) => {
		try {
			await deleteCard(cardId);
			setShowDeleteCardModal(false);
			setMyCards(myCards.filter((card) => card._id !== cardId));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getMyCards();
	}, []);

	return (
		<div>
			<DeleteCardModal
				show={showDeleteCardModal}
				handleClose={() => setShowDeleteCardModal(false)}
				handleDeleteCard={() => handleDelete(selectedCardId)}
			/>
			<h1>My Cards</h1>
			<Link
				to="/create-card"
				className="btn btn-primary rounded-circle add-card"
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
							<CardTemplate
								key={card._id}
								card={card}
								handleLikeUnlike={handleLikeUnlike}
								handleDelete={() => {
									setSelectedCardId(card._id);
									setShowDeleteCardModal(true);
								}}
								userType={user.isBusiness ? "business" : "customer"}
							/>
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
