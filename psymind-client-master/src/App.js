import React, { useEffect } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import Register from './components/Register';
import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import axios from 'axios';
import serverURL from './serverURL.js';
import { getBeliefs, getThoughts, getEvents } from './redux/actions';
import Dashboard from './components/Dashboard';

function App() {
	const token = useSelector((state) => state.token);
	const signIn = useSelector((state) => state.signIn);
	const dispatch = useDispatch();

	useEffect(() => {
		trySignIn();
		dispatch(getBeliefs(token));
		dispatch(getThoughts(token));
		dispatch(getEvents(token));
	}, [signIn, token]);

	const trySignIn = async () => {
		const token = localStorage.getItem('token');
		if (!token) return;
		let res;
		try {
			res = await axios.put(`${serverURL}/api/clients/isclient`, {
				token,
			});
		} catch {
			return;
		}
		const { isClient, userName, isPsychologist, chainedAccounts } = res.data;
		if (isClient) {
			dispatch({
				type: 'SET_SIGNIN',
				payload: {
					signIn: true,
					token,
					userName,
					isPsychologist,
					chainedAccounts,
				},
			});
		}
	};

	return (
		<Router>
			<div className='app'>
				<Switch>
					<Route exact path='/'>
						{signIn ? <Redirect to='/dashboard' /> : <Redirect to='/signin' />}
					</Route>
					<Route path='/signin'>
						<SignIn />
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
					<Route path='/dashboard'>
						<Dashboard />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
