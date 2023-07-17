import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PsyTable from './PsyTable';
import { addChainedAccount } from '../redux/actions';

const useStyles = makeStyles({
	card: {
		padding: '20px',
		marginBottom: '20px',
	},
	form: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
});

export default function MainPage() {
	const classes = useStyles();
	const isPsychologist = useSelector((state) => state.isPsychologist);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();
	const [clientId, setClientId] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addChainedAccount(token, clientId));
		setClientId('');
	};

	return [
		<>
			{isPsychologist ? null : (
				<Card className={classes.card}>
					<Box>
						<h3>My unique id (give it to your psychologist)</h3>
						<span>{token}</span>
					</Box>
				</Card>
			)}
		</>,
		<PsyTable />,
		<>
			{isPsychologist ? (
				<Card className={classes.card}>
					<form
						onSubmit={handleSubmit}
						className={classes.form}
						noValidate
						autoComplete='off'>
						<TextField
							id='outlined-basic'
							label='Client id'
							variant='outlined'
							fullWidth
							style={{ marginRight: '20px' }}
							onChange={(e) => setClientId(e.target.value)}
							value={clientId}
						/>
						<Button type='submit' variant='contained' color='primary'>
							Add
						</Button>
					</form>
				</Card>
			) : null}
		</>,
	];
}
