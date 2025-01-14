import axios from "axios";
import { jwtDecode } from "jwt-decode";

const USERS_API = import.meta.env.VITE_PROJECT_API;
const USERS_URL = `${USERS_API}/users`;

// User Login
export const userLogin = async (email, password, loggedIn) => {
	try {
		const data = JSON.stringify({ email, password });
		const config = {
			method: "post",
			maxBodyLength: Infinity,
			url: `${USERS_URL}/login`,
			headers: { "Content-Type": "application/json" },
			data: data,
		};
		const response = await axios.request(config);
		const token = response.data.token || response.data;
		if (!token) {
			throw new Error("No token received from server.");
		}
		loggedIn
			? (localStorage.setItem("token", token),
			  sessionStorage.setItem("token", token))
			: sessionStorage.setItem("token", token);
		return response.data;
	} catch (error) {
		console.error("Login Error:", error.response?.data || error.message);
		throw error;
	}
};

// Register User
export const userRegister = async (userData) => {
	try {
		let data = {
			name: {
				first: userData.name.first,
				middle: userData.name.middle,
				last: userData.name.last,
			},
			phone: userData.phone,
			email: userData.email,
			password: userData.password,
			image: {
				url:
					userData.image.url || "https://i.ibb.co/B4rd7yx/default-Avatar.png",
				alt: userData.image.alt || "Avatar",
			},
			address: {
				state: userData.address.state,
				country: userData.address.country,
				city: userData.address.city,
				street: userData.address.street,
				houseNumber: userData.address.houseNumber,
				zip: userData.address.zip,
			},
			isBusiness: userData.isBusiness,
		};

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: USERS_URL,
			headers: {},
			data: data,
		};

		const response = await axios.request(config);
		console.log(JSON.stringify(response.data));
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Check if email already registered
export const checkEmail = (email) => {
	return axios.get(`${USERS_URL}?email=${email}`);
};

// Get a User by ID
export const getUserById = async () => {
	try {
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");
		const decoded = jwtDecode(token);
		const userId = decoded._id;
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `${USERS_URL}/${userId}`,
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

// Get All Users
export const getAllUsers = async () => {
	try {
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: USERS_URL,
			headers: {
				"x-auth-token": token,
			},
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

// Update User
// values.name, values.phone, values.image, values.address
export const updateUser = async (updatedData, userId) => {
	try {
		const token =
			sessionStorage.getItem("token") || localStorage.getItem("token");
		let config = {
			method: "put",
			maxBodyLength: Infinity,
			url: `${USERS_URL}/${userId}`,
			headers: {
				"x-auth-token": token,
				"Content-Type": "application/json",
			},
			data: JSON.stringify(updatedData),
		};
		const response = await axios.request(config);
		let updatedUser = JSON.stringify(response.data);
		return updatedUser;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Update User Type
export const updateUserType = async (userId, token) => {
	const myHeaders = new Headers();
	myHeaders.append("x-auth-token", token);

	const requestOptions = {
		method: "PATCH",
		headers: myHeaders,
		redirect: "follow",
	};

	await fetch(`${USERS_URL}/${userId}`, requestOptions)
		.then((response) => response.text())
		.catch((error) => console.error(error));
};

// Update User Token
export const updateUserToken = async (email, password) => {
	try {
		const credentials = { email, password };
		const data = JSON.stringify(credentials);
		const config = {
			method: "post",
			maxBodyLength: Infinity,
			url: `${USERS_URL}/login`,
			headers: { "Content-Type": "application/json" },
			data: data,
		};
		const response = await axios.request(config);
		const token = response.data.token || response.data;
		if (!token) {
			throw new Error("No token received from server.");
		}
		localStorage.getItem("token") ? localStorage.setItem("token", token) : null;
		sessionStorage.setItem("token", token);
		return response.data;
	} catch (error) {
		console.error("Token Update Error:", error.response?.data || error.message);
		throw error;
	}
};

// Delete User
export const deleteUser = async (userId, token) => {
	try {
		let config = {
			method: "delete",
			maxBodyLength: Infinity,
			url: `${USERS_URL}/${userId}`,
			headers: {
				"x-auth-token": token,
			},
		};
		const response = await axios.request(config);
		console.log(JSON.stringify(response.data));
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const logout = async () => {
	try {
		localStorage.removeItem("token");
		sessionStorage.removeItem("token");
		window.location.replace("/login");
	} catch (error) {
		console.error(error);
	}
};
