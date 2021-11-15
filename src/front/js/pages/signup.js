import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [data, setData] = useState({
		email: "",
		name: "",
		password: "",
		position: ""
	});
	const [message, setMessage] = useState({
		show: false,
		text: ""
	});

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

	const submitForm = event => {
		event.preventDefault();
		actions.createUser(data).then(result => {
			console.log(result);
			if (result.created) {
				setMessage({ show: true, text: "El usuario fue creado." });
			}
		});
	};

	return (
		<>
			<div className="text-center mt-5">
				<h1>Sign Up</h1>
				<p>
					<img src="https://i.gifer.com/embedded/download/3eO0.gif" />
				</p>
				<p>You need to sign up first before you can use this page!</p>

				<form onSubmit={submitForm}>
					{message.show ? <h3>{message.text}</h3> : ""}
					<div className="form-group text-center mt-5" style={{ width: "50%", margin: "auto" }}>
						<label htmlFor="emailInput">Email address</label>
						<input
							type="email"
							name="email"
							className="form-control"
							id="emailInput"
							placeholder="name@example.com"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group" style={{ width: "50%", margin: "auto" }}>
						<label htmlFor="passwordInput">Password</label>
						<input
							type="password"
							name="password"
							className="form-control"
							id="passwordInput"
							placeholder="Insert your password here"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group" style={{ width: "50%", margin: "auto" }}>
						<label htmlFor="nameInput">Name</label>
						<input
							type="text"
							name="name"
							className="form-control"
							id="nameInput"
							placeholder=" Insert your name here"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group" style={{ width: "50%", margin: "auto" }}>
						<label htmlFor="positionSelect">Position select</label>
						<select
							className="form-control"
							name="position"
							id="positionSelect"
							onChange={handleInputChange}>
							{store.positions.map((value, index) => {
								return (
									<option key={index} value={value.id}>
										{value.name}
									</option>
								);
							})}
						</select>
					</div>
					<button>
						<Link to="/home">Sign Up</Link>
					</button>
				</form>
			</div>
		</>
	);
};
