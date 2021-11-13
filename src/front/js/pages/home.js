import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		},
		[store.token]
	);
	return (
		<div className="text-center mt-5">
			<h1>Hi there!</h1>
			<p>You can login now with your email and password clicking in the button from the navbar!</p>
			<p>
				<img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Hello_To_You.gif" />
			</p>
		</div>
	);
};
