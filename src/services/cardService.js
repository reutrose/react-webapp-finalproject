import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CARDS_API = import.meta.env.VITE_PROJECT_API;
const CARDS_URL = `${CARDS_API}/cards`;

// Tools for Pagination
export const setPagesNumber = (cards, cardsPerPage) => {
	const pages = [];
	let pagesLength = Math.ceil(cards.length / cardsPerPage);
	for (let i = 0; i < pagesLength; i++) {
		pages[i] = { id: i + 1, value: i + 1, active: true };
	}
	return pages;
};

export const paginateCards = (cards, page, cardsPerPage) => {
	const start = (page - 1) * cardsPerPage;
	const end = start + cardsPerPage;
	const displayCards = cards.slice(start, end);
	const range = `${start + 1} - ${end > cards.length ? cards.length : end}`;
	return { displayCards, range };
};

// Tools for Search Box
export const filterCards = (cards, query) => {
	return cards.filter((card) => {
		const searchString =
			`${card.title} ${card.phone} ${card.address.houseNumber} ${card.address.street} ${card.address.city} ${card.address.country} ${card.bizNumber}`.toLowerCase();
		return searchString.includes(query.toLowerCase());
	});
};

// Cards - CRUD Operations

// Get All Cards
export const getAllCards = async () => {
	const businessCards = [];
	return axios
		.get(CARDS_URL)
		.then((response) => response.data)
		.then((data) => {
			data.forEach((card) => {
				businessCards.push(card);
			});
			return businessCards;
		})
		.catch((error) => {
			console.error(error);
			throw error;
		});
};

// Get a Card by ID
export const getCardById = async (cardId) => {
	let businessCard = {};
	return axios
		.get(`${CARDS_URL}/${cardId}`)
		.then((response) => response.data)
		.then((data) => {
			businessCard = data;
			return businessCard;
		})
		.catch((error) => {
			console.error(error);
			throw error;
		});
};

// Get a Card by Email
export const getCardByEmail = async (email) => {
	let cards = await getAllCards();
	let card = await cards.find((card) => card.email === email);
	console.log(card);
};

export const navigateToBusinessPage = async (email, nav) => {
	let newCard = await getCardByEmail(email);
	let cardId = await newCard._id;
	nav(`/business-details/${cardId}`);
};

// Get all my cards
export const getAllMyCards = async () => {
	try {
		let token = localStorage.getItem("token");
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `${CARDS_URL}/my-cards`,
			headers: {
				"x-auth-token": token,
			},
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Create a new card
export const createNewCard = async (cardData) => {
	try {
		let token = localStorage.getItem("token");
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: CARDS_URL,
			headers: {
				"x-auth-token": token,
			},
			data: cardData,
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Update a card
export const updateCard = async (cardId, cardData) => {
	try {
		let token = localStorage.getItem("token");
		let config = {
			method: "put",
			maxBodyLength: Infinity,
			url: `${CARDS_URL}/${cardId}`,
			headers: {
				"x-auth-token": token,
			},
			data: cardData,
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Like/Unlike a card
export const cardLikeUnlike = async (cardId) => {
	try {
		let token = localStorage.getItem("token");
		let config = {
			method: "patch",
			maxBodyLength: Infinity,
			url: `${CARDS_URL}/${cardId}`,
			headers: {
				"x-auth-token": token,
			},
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getLikedByUserId = async () => {
	try {
		let token = localStorage.getItem("token");
		let userId = jwtDecode(token)._id;
		let cards = await getAllCards();
		let likedCards = [];
		for (let card of cards) {
			if (card.likes.includes(userId)) {
				likedCards.push(card);
			}
		}
		return likedCards;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Delete a card
export const deleteCard = async (cardId) => {
	try {
		let token = localStorage.getItem("token");
		let config = {
			method: "delete",
			maxBodyLength: Infinity,
			url: `${CARDS_URL}/${cardId}`,
			headers: {
				"x-auth-token": token,
			},
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
