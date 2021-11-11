import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleClick = () => {
		const inside = {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		};
		fetch("https://3001-coral-fly-mjo05ig0.ws-eu18.gitpod.io/token", inside)
			.then(resp => {
				if (resp.status === 200) return resp.json();
				else alert("ERROR");
			})
			.then(data => {});
	};

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
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
		</div>
	);
};
