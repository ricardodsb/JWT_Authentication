import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<>
			<div className="text-center mt-5">
				<h1>Sign Up</h1>
				<p>
					<img src="https://i.gifer.com/embedded/download/3eO0.gif" />
				</p>
				<p>You need to sign up first before you can use this page!</p>
			</div>
			<div className="text-center mt-5">
				<input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button>
					<Link to="/home">Sign Up</Link>
				</button>
			</div>
		</>
	);
};
