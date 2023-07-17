import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import CloudIcon from '@material-ui/icons/Cloud';
import { Link } from 'react-router-dom';

export const mainListItems = (
	<div>
		<Link to='/'>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary='Main page' />
			</ListItem>
		</Link>
		<Link to='/dashboard/events'>
			<ListItem button>
				<ListItemIcon>
					<AccessibilityNewIcon />
				</ListItemIcon>
				<ListItemText primary='Events' />
			</ListItem>
		</Link>
		<Link to='/dashboard/thoughts'>
			<ListItem button>
				<ListItemIcon>
					<CloudIcon />
				</ListItemIcon>
				<ListItemText primary='Thoughts' />
			</ListItem>
		</Link>
		<Link to='/dashboard/beliefs'>
			<ListItem button>
				<ListItemIcon>
					<AccountTreeIcon />
				</ListItemIcon>
				<ListItemText primary='Beliefs' />
			</ListItem>
		</Link>
	</div>
);
