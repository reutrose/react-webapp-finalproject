import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./Theme";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function Footer({ userType }) {
	const { themeClasses } = useContext(ThemeContext);

	return (
		<footer className={`footer mt-auto py-3 ${themeClasses.bgColor}`}>
			<Container>
				<Row className="text-center">
					<Col>
						<Link to="/about" className="text-decoration-none">
							<Button
								variant="link"
								className={`text-decoration-none ${themeClasses.textColor}`}
								style={{ fontSize: "0.75rem" }}
							>
								<i className="fa-solid fa-info-circle fa-xl mb-1"></i>
								<br />
								About
							</Button>
						</Link>
					</Col>
					<Col>
						{userType === "guest" && (
							<Link to="/login" className="text-decoration-none">
								<Button
									variant="link"
									className={`text-decoration-none ${themeClasses.textColor}`}
									style={{ fontSize: "0.75rem" }}
								>
									<i className="fa-solid fa-sign-in-alt fa-xl mb-1"></i>
									<br />
									Login
								</Button>
							</Link>
						)}
						{userType !== "guest" && (
							<Link to="/favorites" className="text-decoration-none">
								<Button
									variant="link"
									className={`text-decoration-none ${themeClasses.textColor}`}
									style={{ fontSize: "0.75rem" }}
								>
									<i className="fa-solid fa-heart fa-xl mb-1"></i>
									<br />
									Fav Cards
								</Button>
							</Link>
						)}
					</Col>
					<Col>
						{userType === "guest" && (
							<Link to="/register" className="text-decoration-none">
								<Button
									variant="link"
									className={`text-decoration-none ${themeClasses.textColor}`}
									style={{ fontSize: "0.75rem" }}
								>
									<i className="fa-solid fa-user-plus fa-xl mb-1"></i>
									<br />
									Signup
								</Button>
							</Link>
						)}
						{userType === "business" && (
							<Link to="/my-cards" className="text-decoration-none">
								<Button
									variant="link"
									className={`text-decoration-none ${themeClasses.textColor}`}
									style={{ fontSize: "0.75rem" }}
								>
									<i className="fa-solid fa-id-card-clip fa-xl mb-1"></i>
									<br />
									My Cards
								</Button>
							</Link>
						)}
						{userType === "admin" && (
							<Link to="/my-cards" className="text-decoration-none">
								<Button
									variant="link"
									className={`text-decoration-none ${themeClasses.textColor}`}
									style={{ fontSize: "0.75rem" }}
								>
									<i className="fa-solid fa-id-card-clip fa-xl mb-1"></i>
									<br />
									My Cards
								</Button>
							</Link>
						)}
					</Col>
				</Row>
			</Container>
		</footer>
	);
}
Footer.propTypes = {
	userType: PropTypes.string.isRequired,
};

export default Footer;
