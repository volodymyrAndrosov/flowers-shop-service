import axios from 'axios';
import serverURL from '../serverURL';

export function getBeliefs(token) {
	return async (dispatch) => {
		if (!token) return dispatch({ type: '', payload: [] });
		const res = await axios.post(`${serverURL}/api/beliefs/getbeliefs`, {
			token,
		});

		const beliefs = res.data;
		return dispatch({ type: 'SET_BELIEFS', payload: beliefs });
	};
}

export function addBelief(token, belief) {
	return async (dispatch) => {
		const res = await axios.post(`${serverURL}/api/beliefs/belief`, {
			token,
			belief,
		});
		const beliefs = res.data;
		return dispatch({ type: 'SET_BELIEFS', payload: beliefs });
	};
}

export function editBelief(token, belief) {
	return async (dispatch) => {
		const res = await axios.put(`${serverURL}/api/beliefs/belief`, {
			token,
			belief,
		});
		const beliefs = res.data;
		return dispatch({ type: 'SET_BELIEFS', payload: beliefs });
	};
}

export function removeBelief(token, beliefId) {
	return async (dispatch) => {
		const res = await axios.post(`${serverURL}/api/beliefs/removebelief`, {
			token,
			beliefId,
		});
		const beliefs = res.data;
		return dispatch({ type: 'SET_BELIEFS', payload: beliefs });
	};
}

export function getThoughts(token) {
	return async (dispatch) => {
		if (!token) return dispatch({ type: '', payload: [] });
		const res = await axios.post(`${serverURL}/api/thoughts/getthoughts`, {
			token,
		});

		const thoughts = res.data;
		return dispatch({ type: 'SET_THOUGHTS', payload: thoughts });
	};
}

export function addThought(token, thought) {
	return async (dispatch) => {
		const res = await axios.post(`${serverURL}/api/thoughts/thought`, {
			token,
			thought,
		});
		const thoughts = res.data;
		return dispatch({ type: 'SET_THOUGHTS', payload: thoughts });
	};
}

export function editThought(token, thought) {
	return async (dispatch) => {
		const res = await axios.put(`${serverURL}/api/thoughts/thought`, {
			token,
			thought,
		});
		const thoughts = res.data;
		return dispatch({ type: 'SET_THOUGHTS', payload: thoughts });
	};
}

export function removeThought(token, thoughtId) {
	return async (dispatch) => {
		const res = await axios.post(`${serverURL}/api/thoughts/removethought`, {
			token,
			thoughtId,
		});
		const thoughts = res.data;
		return dispatch({ type: 'SET_THOUGHTS', payload: thoughts });
	};
}

export function getEvents(token) {
	return async (dispatch) => {
		if (!token) return dispatch({ type: '', payload: [] });
		const res = await axios.post(`${serverURL}/api/events/getevents`, {
			token,
		});

		const events = res.data;
		return dispatch({ type: 'SET_EVENTS', payload: events });
	};
}

export function addEvent(token, event) {
	return async (dispatch) => {
		const res = await axios.post(`${serverURL}/api/events/event`, {
			token,
			...event,
		});
		const events = res.data;
		return dispatch({ type: 'SET_EVENTS', payload: events });
	};
}

export function editEvent(token, event) {
	return async (dispatch) => {
		const res = await axios.put(`${serverURL}/api/events/event`, {
			token,
			event,
		});
		const events = res.data;
		return dispatch({ type: 'SET_EVENTS', payload: events });
	};
}

export function removeEvent(token, eventId) {
	return async (dispatch) => {
		const res = await axios.post(`${serverURL}/api/events/removeevent`, {
			token,
			eventId,
		});
		const events = res.data;
		return dispatch({ type: 'SET_EVENTS', payload: events });
	};
}

export function removeChainedAccount(token, email) {
	return async (dispatch) => {
		const res = await axios.post(
			`${serverURL}/api/chainedAccounts/removeChainedAccount`,
			{
				token,
				email,
			}
		);
		const chainedAccount = res.data;
		return dispatch({ type: 'SET_CHAINED_ACCOUNTS', payload: chainedAccount });
	};
}

export function addChainedAccount(token, clientId) {
	return async (dispatch) => {
		const res = await axios.post(
			`${serverURL}/api/chainedAccounts/chainedAccount`,
			{
				token,
				newChainedAccount: {
					token: clientId,
				},
			}
		);
		const chainedAccount = res.data;
		return dispatch({ type: 'SET_CHAINED_ACCOUNTS', payload: chainedAccount });
	};
}
