import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const token = sessionStorage.getItem("token");
	const history = useHistory();

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		},
		[store.token]
	);

	console.log("This is your token", store.token);
	const handleClick = () => {
		actions.login(email, password);
	};

	if (store.token && store.token != "" && store.token != undefined) history.push("/login");
	return (
		<div className="text-center mt-3">
			<h1>Login</h1>

			<div className="text-center mt-5">
				{store.token && store.token != "" && store.token != undefined ? (
					"You are logged in  " + store.token
				) : (
					<div>
						<input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
						<input
							type="password"
							placeholder="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<button onClick={handleClick}>Login</button>
					</div>
				)}
				<div className="alert alert-info">{store.message}</div>
			</div>
		</div>
	);
};
