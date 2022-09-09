import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";
import { auth, provider } from "./firebase";
import "./Login.css";

function Login() {
	const dispatch = useDispatch();

	const signIn = () => {
		auth.signInWithPopup(provider)
			.then(({ user }) => {
				dispatch(
					login({
						userName: user.displayName,
						profilePic: user.photoURL,
						id: user.uid,
					})
				);
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://scx2.b-cdn.net/gfx/news/hires/2017/snapchat.jpg"
					alt="snapchat logo"
				/>
				<Button variant="outlined" onClick={signIn}>
					Sign in
				</Button>
			</div>
		</div>
	);
}

export default Login;
