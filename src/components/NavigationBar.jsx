import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "./Theme";

function NavigationBar({ userType, onSearch }) {
	const { themeClasses, toggleTheme } = useContext(ThemeContext);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
		onSearch(e.target.value);
	};

	return (
		<Navbar expand="lg" className={themeClasses.navColor}>
			<Container fluid>
				<Navbar.Brand href="/">
					<img
						src="/BCardsLogo.svg"
						width="120"
						height="50"
						className="d-inline-block align-top"
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
						<Nav.Link href="/about" className="text-light fw-bold me-2">
							ABOUT
						</Nav.Link>
						{userType !== "guest" && (
							<Nav.Link href="/favorites" className="text-light fw-bold me-2">
								FAV CARDS
							</Nav.Link>
						)}
						{userType === "business" && (
							<Nav.Link href="/my-cards" className="text-light fw-bold me-2">
								MY CARDS
							</Nav.Link>
						)}
						{userType === "admin" && (
							<Nav.Link href="/my-cards" className="text-light fw-bold me-2">
								MY CARDS
							</Nav.Link>
						)}
						{userType === "admin" && (
							<Nav.Link href="/sandbox" className="text-light fw-bold me-2">
								SANDBOX
							</Nav.Link>
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
							<Nav.Link href="/register" className="text-light fw-bold">
								SIGNUP
							</Nav.Link>
						)}
						{userType === "guest" && (
							<Nav.Link href="/login" className="text-light fw-bold">
								LOGIN
							</Nav.Link>
						)}
						{userType !== "guest" && (
							<Nav.Link href="/profile" className="text-light">
								<i className="fa-solid fa-circle-user fa-2xl mx-2"></i>
							</Nav.Link>
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
