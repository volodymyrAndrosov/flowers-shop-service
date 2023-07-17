export default (state, action) => {
	switch (action.type) {
		case 'SET_TOKEN':
			return { ...state, token: action.payload.token };
		case 'SET_USERNAME':
			return { ...state, userName: action.payload.userName };
		case 'SET_SIGNIN':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				signIn: action.payload.signIn,
				token: action.payload.token,
				userName: action.payload.userName,
				isPsychologist: action.payload.isPsychologist,
				chainedAccounts: action.payload.chainedAccounts,
			};
		case 'SET_BELIEFS':
			return {
				...state,
				beliefs: action.payload,
			};
		case 'SET_THOUGHTS':
			return {
				...state,
				thoughts: action.payload,
			};
		case 'SET_EVENTS':
			return {
				...state,
				events: action.payload,
			};
		case 'SET_CHAINED_ACCOUNTS':
			return {
				...state,
				chainedAccounts: action.payload.chainedAccounts,
			};
		default:
			return state;
	}
};
