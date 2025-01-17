import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./Theme";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

const CardTemplate = ({ card, handleLikeUnlike, handleDelete, userType }) => {
	const { themeClasses } = useContext(ThemeContext);
	let nav = useNavigate();

	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");
	let user = null;
	if (token) {
		user = jwtDecode(token);
	}

	return (
		<div className="col-lg-4 col-md-6 col-sm-12 align-items-center my-2">
			<Card
				className={`card my-2 col-lg-12 h-100 ${themeClasses.bgColor} ${themeClasses.textColor}`}
			>
				<span
					style={{ cursor: "pointer" }}
					onClick={() => {
						nav(`/business-details/${card._id}`);
					}}
				>
					<Card.Img
						variant="top"
						style={{ height: "200px", objectFit: "cover" }}
						src={card.image.url}
						alt={card.image.alt}
					/>
					<Card.Body>
						<Card.Title>{card.title}</Card.Title>
						<Card.Text
							style={{
								height: "70px",
							}}
						>
							{card.subtitle}
						</Card.Text>
						<hr />
						<ListGroup variant="flush">
							<ListGroup.Item
								className={`m-1 ${themeClasses.bgColor} ${themeClasses.textColor}`}
							>
								<span className="fw-bold">Phone: </span>
								{card.phone}
							</ListGroup.Item>
							<ListGroup.Item
								className={`m-1 ${themeClasses.bgColor} ${themeClasses.textColor}`}
							>
								<span className="fw-bold">Address: </span>
								{card.address.street} {card.address.houseNumber},
								<br />
								{card.address.city}, {card.address.country}
							</ListGroup.Item>
							<ListGroup.Item
								className={`m-1 ${themeClasses.bgColor} ${themeClasses.textColor}`}
							>
								<span className="fw-bold">Card Number: </span>
								{card.bizNumber}
							</ListGroup.Item>
						</ListGroup>
					</Card.Body>
				</span>
				<Card.Footer
					className={`col d-flex justify-content-center text-center border-secondary ${themeClasses.bgColor}`}
				>
					<Link
						className="mx-2 mt-2"
						to={`tel:${card.phone}`}
						style={{ color: "inherit" }}
					>
						<i className="fa-solid fa-phone"></i>
					</Link>
					{user ? (
						<Link
							className="mx-2 mt-2"
							onClick={() => handleLikeUnlike(card._id)}
							style={{
								display: user ? "inline-block" : "none",
								color: "inherit",
								cursor: "pointer",
							}}
						>
							{card.likes && card.likes.includes(user._id) ? (
								<i className="fa-solid fa-heart text-danger"></i>
							) : (
								<i className="fa-regular fa-heart"></i>
							)}
						</Link>
					) : null}
					{userType === "business" || userType === "admin" ? (
						<Link
							className="mx-2 mt-2"
							to={`/edit-card/${card._id}`}
							style={{
								display:
									user.isBusiness && card.user_id === user._id
										? "inline-block"
										: "none",
								color: "inherit",
								cursor: "pointer",
							}}
						>
							<i className="fa-solid fa-pen-to-square"></i>
						</Link>
					) : null}
					{userType === "business" || userType === "admin" ? (
						<Link
							className="mx-2 mt-2"
							onClick={() => handleDelete(card._id)}
							style={{
								display:
									user.isBusiness && card.user_id === user._id
										? "inline-block"
										: "none",
								color: "inherit",
								cursor: "pointer",
							}}
						>
							<i className="fa-solid fa-trash-can"></i>
						</Link>
					) : null}
				</Card.Footer>
			</Card>
		</div>
	);
};

CardTemplate.propTypes = {
	card: PropTypes.object.isRequired,
	handleLikeUnlike: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	userType: PropTypes.string.isRequired,
};

export default CardTemplate;
