import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import {
	cardLikeUnlike,
	deleteCard,
	getLikedByUserId,
} from "../services/cardService";
import { jwtDecode } from "jwt-decode";
import DeleteCardModal from "./modals/DeleteCardModal";
import UnlikeCardModal from "./modals/UnlikeCardModal";
import CardTemplate from "./CardTemplate";

function Favorites() {
	const [likedCards, setLikedCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
	const [showUnlikeCardModal, setShowUnlikeCardModal] = useState(false);
	const [selectedCardId, setSelectedCardId] = useState(null);

	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");
	let user = null;
	if (token) {
		user = jwtDecode(token);
	}

	const fetchLikedCards = async () => {
		try {
			setLoading(true);
			const cards = await getLikedByUserId();
			setLikedCards(cards);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleUnlike = async (cardId) => {
		try {
			await cardLikeUnlike(cardId);
			setShowUnlikeCardModal(false);
			setLikedCards((prevCards) =>
				prevCards.filter((card) => card._id !== cardId)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (cardId) => {
		try {
			await deleteCard(cardId);
			setShowDeleteCardModal(false);
			setLikedCards((prevCards) =>
				prevCards.filter((card) => card._id !== cardId)
			);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchLikedCards();
	}, []);

	return (
		<div>
			<DeleteCardModal
				show={showDeleteCardModal}
				handleClose={() => setShowDeleteCardModal(false)}
				handleDeleteCard={() => handleDelete(selectedCardId)}
			/>
			<UnlikeCardModal
				show={showUnlikeCardModal}
				handleClose={() => setShowUnlikeCardModal(false)}
				handleUnlikeCard={() => handleUnlike(selectedCardId)}
			/>
			<h1>Favorite Cards</h1>
			{loading ? (
				<div className="d-flex justify-content-center my-5">
					<Spinner animation="border" variant="primary" role="status"></Spinner>
				</div>
			) : (
				<div className="row justify-content-evenly">
					{likedCards.length ? (
						likedCards.map((card) => (
							<CardTemplate
								key={card._id}
								card={card}
								handleLikeUnlike={() => {
									setSelectedCardId(card._id);
									setShowUnlikeCardModal(true);
								}}
								handleDelete={() => {
									setSelectedCardId(card._id);
									setShowDeleteCardModal(true);
								}}
								userType={user.isBusiness ? "business" : "customer"}
							/>
						))
					) : (
						<p>No favorite cards found.</p>
					)}
				</div>
			)}
		</div>
	);
}

export default Favorites;
