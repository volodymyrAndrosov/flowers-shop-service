import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getBeliefs, getThoughts, getEvents } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
	rroot: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: '#3F51B5',
	},
	nested: {
		// paddingLeft: theme.spacing(4),
		backgroundColor: '#3F51B5',
		width: '360px',
	},
	list: {
		position: 'absolute',
		backgroundColor: '#3F51B5',
		width: '360px',
		padding: '0px 10px',
	},
	root: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	icon: {
		borderRadius: '50%',
		width: 16,
		height: 16,
		boxShadow:
			'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
		backgroundColor: '#f5f8fa',
		backgroundImage:
			'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
		'$root.Mui-focusVisible &': {
			outline: '2px auto rgba(19,124,189,.6)',
			outlineOffset: 2,
		},
		'input:hover ~ &': {
			backgroundColor: '#ebf1f5',
		},
		'input:disabled ~ &': {
			boxShadow: 'none',
			background: 'rgba(206,217,224,.5)',
		},
	},
	checkedIcon: {
		backgroundColor: '#137cbd',
		backgroundImage:
			'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
		'&:before': {
			display: 'block',
			width: 16,
			height: 16,
			backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
			content: '""',
		},
		'input:hover ~ &': {
			backgroundColor: '#106ba3',
		},
	},
}));

export default function ClientChooser() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List
			component='nav'
			aria-labelledby='nested-list-subheader'
			className={classes.rroot}>
			<ListItem button onClick={handleClick}>
				<ListItemText primary='Client' />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding className={classes.list}>
					<CustomizedRadios />
				</List>
			</Collapse>
		</List>
	);
}

function CustomizedRadios() {
	const chainedAccounts = useSelector((state) => state.chainedAccounts);
	const dispatch = useDispatch();
	const [client, setClient] = useState('');

	const handleChange = (e) => {
		setClient(e.target.value);
		const clientToken = chainedAccounts.find(
			(acc) => acc.name === e.target.value
		).token;
		dispatch(getEvents(clientToken));
		dispatch(getBeliefs(clientToken));
		dispatch(getThoughts(clientToken));
	};

	return (
		<FormControl component='fieldset'>
			<RadioGroup
				name='customized-radios'
				onChange={handleChange}
				value={client}>
				{chainedAccounts.map((acc, index) => (
					<FormControlLabel
						value={acc.name}
						control={<StyledRadio />}
						label={acc.name}
						key={index}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}

function StyledRadio(props) {
	const classes = useStyles();

	return (
		<Radio
			className={classes.root}
			disableRipple
			color='default'
			checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
			icon={<span className={classes.icon} />}
			{...props}
		/>
	);
}
