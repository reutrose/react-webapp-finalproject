import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import MyCards from "./components/MyCards";
import Favorites from "./components/Favorites";
import Home from "./components/Home";
import CreateCard from "./components/CreateCard";
import EditCard from "./components/EditCard";
import BusinessDetails from "./components/BusinessDetails";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/Theme";
import { useEffect, useState } from "react";
import { filterCards } from "./services/cardService";
import { jwtDecode } from "jwt-decode";
import UserProfile from "./components/UserProfile";
import Sandbox from "./components/Sandbox";

function App() {
	let [userType, setUserType] = useState("guest");
	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");

	useEffect(() => {
		if (token) {
			const decoded = jwtDecode(token);
			if (decoded.isAdmin === true) {
				setUserType("admin");
			} else if (decoded.isAdmin === false && decoded.isBusiness === true) {
				setUserType("business");
			} else if (decoded.isAdmin === false && decoded.isBusiness === false) {
				setUserType("user");
			}
		} else {
			setUserType("guest");
		}
	}, [token]);

	const [cards, setCards] = useState([]);
	const [filteredCards, setFilteredCards] = useState([]);

	const handleSearch = (query) => {
		const filtered = filterCards(cards, query);
		setFilteredCards(filtered);
	};

	return (
		<ThemeProvider>
			<Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
				<div>
					<NavigationBar userType={userType} onSearch={handleSearch} />
					<div className="container">
						<Routes>
							{/* Everyone */}

							<Route
								path="/"
								element={
									<Home
										cards={cards}
										setCards={setCards}
										filteredCards={filteredCards}
										setFilteredCards={setFilteredCards}
										userType={userType}
									/>
								}
							/>
							<Route path="/about" element={<About />} />
							<Route
								path="/business-details/:id"
								element={<BusinessDetails />}
							/>

							{/* Only Guests */}

							{userType === "guest" && (
								<>
									<Route path="/login" element={<Login />} />
									<Route path="/register" element={<Register />} />
								</>
							)}

							{/* Admin, Business, Customer */}
							{userType !== "guest" && (
								<>
									<Route path="/favorites" element={<Favorites />} />
									<Route
										path="/profile"
										element={<UserProfile userType={userType} />}
									/>
								</>
							)}

							{/* Admin, Business */}
							{userType !== "guest" && userType !== "user" && (
								<>
									<Route path="/my-cards" element={<MyCards />} />
									<Route path="/create-card" element={<CreateCard />} />
									<Route path="/edit-card/:id" element={<EditCard />} />
								</>
							)}

							{/* Admin */}

							{userType === "admin" ? (
								<Route path="/sandbox" element={<Sandbox />} />
							) : null}

							{/* Not Found */}

							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</div>
					<Footer userType={userType} />
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
