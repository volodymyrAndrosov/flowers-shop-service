import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, removeEvent, editEvent } from '../redux/actions';

export default function EventsTable() {
	const events = useSelector((state) => state.events);
	const token = useSelector((state) => state.token);
	const isPsychologist = useSelector((state) => state.isPsychologist);
	const dispatch = useDispatch();

	const [state, setState] = useState({
		columns: [
			{ title: 'Event', field: 'event' },
			{ title: 'Thoughts', field: 'thoughts' },
			{ title: 'Emotions', field: 'emotions' },
		],
		data: events,
	});

	useEffect(() => {
		setState({ ...state, data: events });
	}, [events]);

	return (
		<MaterialTable
			title='Events table'
			columns={state.columns}
			data={state.data}
			options={{
				paging: false,
			}}
			editable={
				isPsychologist
					? {}
					: {
							onRowAdd: (newData) => {
								return dispatch(
									addEvent(token, {
										event: newData.event,
										thoughts: newData.thoughts,
										emotions: newData.emotions,
									})
								);
							},
							onRowUpdate: (newData, oldData) =>
								dispatch(
									editEvent(token, {
										event: newData.event,
										thoughts: newData.thoughts,
										emotions: newData.emotions,
										id: oldData._id,
									})
								),
							onRowDelete: (oldData) =>
								dispatch(removeEvent(token, oldData._id)),
					  }
			}
		/>
	);
}
