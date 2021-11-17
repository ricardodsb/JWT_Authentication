const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			positions: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null });
			},

			login: async (email, password) => {
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

				try {
					const resp = await fetch("https://3001-pink-raven-0i5g685h.ws-eu18.gitpod.io/token", inside); //#YOU SHOULD UPDATE THE URL
					if (resp.status == 401) {
						alert("ERROR");
						return false;
					}
					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					console.log("This came from the backend", data);
					return true;
				} catch (error) {
					console.error("ERROR");
				}
			},
			createUser: data => {
				const response = fetch("https://3001-pink-raven-0i5g685h.ws-eu18.gitpod.io/api/user", {
					//#YOU SHOULD UPDATE THE URL
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				}).then(resp => resp.json());
				return response;
			},
			getPositions: () => {
				fetch("https://3001-pink-raven-0i5g685h.ws-eu18.gitpod.io/api/positions") //#YOU SHOULD UPDATE THE URL
					.then(resp => resp.json())
					.then(data => setStore({ positions: data }))
					.catch(error => console.log("Error loading positions from backend", error));
			},
			getMessage: () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};

				// fetching data from the backend
				fetch("https://3001-pink-raven-0i5g685h.ws-eu18.gitpod.io/private", opts) //#YOU SHOULD UPDATE THE URL
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
