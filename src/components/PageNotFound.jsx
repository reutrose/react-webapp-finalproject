import { useNavigate } from "react-router-dom";

function PageNotFound() {
	let nav = useNavigate();
	return (
		<>
			<div className="container text-center">
				<p
					style={{ fontSize: "5rem" }}
					className="text-danger text-center mt-5"
				>
					<i className="fa-solid fa-triangle-exclamation"></i>
				</p>
				<h1>404</h1>
				<h2>Page Not Found</h2>
				<p>Oops... Looks like something went wrong</p>
				<button className="btn btn-success mx-2" onClick={() => nav("/")}>
					<i className="fa-solid fa-house"></i>
				</button>
				<button className="btn btn-warning mx-2" onClick={() => nav(-1)}>
					<i className="fa-solid fa-rotate-left"></i>
				</button>
			</div>
		</>
	);
}

export default PageNotFound;
