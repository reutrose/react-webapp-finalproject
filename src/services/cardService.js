import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SERVER = import.meta.env.VITE_PROJECT_API;
const CARDS_URL = `${SERVER}/cards`;

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
			`${card.title} ${card.phone} ${card.email} ${card.address.houseNumber} ${card.address.street} ${card.address.city} ${card.address.country} ${card.bizNumber}`.toLowerCase();
		return searchString.includes(query.toLowerCase());
	});
};

// Cards - CRUD Operations

// Get all cards
export const getAllCards = async () => {
	try {
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: CARDS_URL,
			headers: {},
		};
		return await axios
			.request(config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Get a Card by ID
export const getCardById = async (cardId) => {
	try {
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `${CARDS_URL}/${cardId}`,
			headers: {},
		};

		return await axios
			.request(config)
			.then((response) => response.data)
			.catch((error) => {
				console.error(error);
			});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Get all my cards
export const getAllMyCards = async () => {
	try {
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `${CARDS_URL}/my-cards`,
			headers: {
				"x-auth-token": token,
			},
		};
		return await axios
			.request(config)
			.then((response) => response.data)
			.catch((error) => {
				console.error(error);
			});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Create a new card
export const createNewCard = async (cardData) => {
	try {
		let data = {
			...cardData,
			image: {
				url:
					cardData.image.url ||
					"https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
				alt: cardData.image.alt || "Business Card Image",
			},
		};
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: CARDS_URL,
			headers: {
				"x-auth-token": token,
			},
			data: data,
		};
		return await axios
			.request(config)
			.then((response) => response.data)
			.catch((error) => {
				if (error.response.data.includes("email_1 dup key")) {
					throw new Error("Email already exists.");
				}
			});
	} catch (error) {
		if (
			error.response &&
			error.response.data &&
			error.response.data.includes("email_1 dup key")
		) {
			throw new Error("Email already exists.");
		}
		throw error;
	}
};

// Update a card
export const updateCard = async (cardId, cardData) => {
	try {
		let data = {
			...cardData,
			image: {
				url:
					cardData.image.url ||
					"https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
				alt: cardData.image.alt || "Business Card Image",
			},
		};
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");
		let config = {
			method: "put",
			maxBodyLength: Infinity,
			url: `${CARDS_URL}/${cardId}`,
			headers: {
				"x-auth-token": token,
			},
			data: data,
		};
		return await axios
			.request(config)
			.then((response) => response.data)
			.catch((error) => {
				console.error(error);
			});
	} catch (error) {
		if (
			error.response &&
			error.response.data &&
			error.response.data.includes("email_1 dup key")
		) {
			throw new Error("Email already exists.");
		}
		throw error;
	}
};

// Like/Unlike a card
export const cardLikeUnlike = async (cardId) => {
	try {
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");
		let config = {
			method: "patch",
			maxBodyLength: Infinity,
			url: `${CARDS_URL}/${cardId}`,
			headers: {
				"x-auth-token": token,
			},
		};
		return await axios
			.request(config)
			.then((response) => response.data)
			.catch((error) => {
				console.error(error);
			});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getLikedByUserId = async () => {
	try {
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");
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
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");
		let config = {
			method: "delete",
			maxBodyLength: Infinity,
			url: `${CARDS_URL}/${cardId}`,
			headers: {
				"x-auth-token": token,
			},
		};
		return await axios
			.request(config)
			.then((response) => response.data)
			.catch((error) => {
				console.error(error);
			});
	} catch (error) {
		console.error(error);
		throw error;
	}
};
