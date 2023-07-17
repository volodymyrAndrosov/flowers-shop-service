import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import QuestionsTable from './QuestionsTable';
import { useDispatch, useSelector } from 'react-redux';
import { addThought, removeThought, editThought } from '../redux/actions';

export default function ThoughtsTable() {
	const thoughts = useSelector((state) => state.thoughts);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();
	const isPsychologist = useSelector((state) => state.isPsychologist);

	const [state, setState] = useState({
		columns: [{ title: 'Thought', field: 'name' }],
		data: thoughts,
	});

	useEffect(() => {
		setState({ ...state, data: thoughts });
	}, [thoughts]);

	return (
		<MaterialTable
			title='My negative thoughts'
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
								addThought(token, {
									name: newData.name,
								})
							);
						},
						onRowUpdate: (newData, oldData) =>
							dispatch(
								editThought(token, {
									name: newData.name,
									id: oldData._id,
								})
							),
						onRowDelete: (oldData) =>
							dispatch(removeThought(token, oldData._id)),
					}
			}
			detailPanel={(rowData) => {
				return (
					<QuestionsTable
						tindex={thoughts.findIndex(
							(thought) => thought.name === rowData.name
						)}
					/>
				);
			}}
			onRowClick={(event, rowData, togglePanel) => togglePanel()}
		/>
	);
}
