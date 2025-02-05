import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "./Theme";
import { Link } from "react-router-dom";

function NavigationBar({ userType, onSearch }) {
	const { themeClasses, toggleTheme } = useContext(ThemeContext);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
		onSearch(e.target.value);
	};

	return (
		<Navbar expand="lg" className={`${themeClasses.navColor} navigation-bar`}>
			<Container fluid>
				<Navbar.Brand href="/">
					<img
						src="/BCardsLogo.svg"
						className="d-inline-block align-top nav-logo"
						alt="BCards Logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle
					style={{ backgroundColor: "white" }}
					aria-controls="navbarScroll"
				/>
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-4 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Link to="/about" className="nav-link text-light fw-bold me-2">
							ABOUT
						</Link>
						{userType !== "guest" && (
							<Link
								to="/favorites"
								className="nav-link text-light fw-bold me-2"
							>
								FAV CARDS
							</Link>
						)}
						{userType === "business" && (
							<Link to="/my-cards" className="nav-link text-light fw-bold me-2">
								MY CARDS
							</Link>
						)}
						{userType === "admin" && (
							<Link to="/my-cards" className="nav-link text-light fw-bold me-2">
								MY CARDS
							</Link>
						)}
						{userType === "admin" && (
							<Link to="/sandbox" className="nav-link text-light fw-bold me-2">
								SANDBOX
							</Link>
						)}
					</Nav>
					<Form className="d-flex bg-light rounded me-2">
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-0"
							aria-label="Search"
							value={searchQuery}
							onChange={handleSearchChange}
						/>
						<Button variant="light">
							<i className="fa-solid fa-magnifying-glass"></i>
						</Button>
					</Form>
					<Button
						variant="transparent"
						className={themeClasses.textColor}
						onClick={toggleTheme}
					>
						{themeClasses.symbol}
					</Button>
					<Nav style={{ maxHeight: "100px" }} navbarScroll>
						{userType === "guest" && (
							<Link to="/register" className="nav-link text-light fw-bold">
								SIGNUP
							</Link>
						)}
						{userType === "guest" && (
							<Link to="/login" className="nav-link text-light fw-bold">
								LOGIN
							</Link>
						)}
						{userType !== "guest" && (
							<Link to="/profile" className="nav-link text-light">
								<i className="fa-solid fa-circle-user fa-2xl mx-2"></i>
							</Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

NavigationBar.propTypes = {
	userType: PropTypes.string.isRequired,
	onSearch: PropTypes.func.isRequired,
};

export default NavigationBar;
