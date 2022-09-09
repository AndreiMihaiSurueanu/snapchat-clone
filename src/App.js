import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WebcamCapture from "./WebcamCapture";
import ChatView from "./ChatView";
import Preview from "./Preview";
import Chats from "./Chats";
import Login from "./Login";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// the user is logged in
				dispatch(
					login({
						userName: authUser.displayName,
						profilePic: authUser.photoURL,
						id: authUser.uid,
					})
				);
			} else {
				dispatch(logout());
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="app">
			<Router>
				{!user ? (
					<Login />
				) : (
					<div className="app__body">
						<Switch>
							<Route path="/chats/view">
								<ChatView />
							</Route>
							<Route path="/chats">
								<Chats />
							</Route>
							<Route path="/preview">
								<Preview />
							</Route>
							<Route exact path="/">
								<WebcamCapture />
							</Route>
						</Switch>
					</div>
				)}
			</Router>
		</div>
	);
}

export default App;
