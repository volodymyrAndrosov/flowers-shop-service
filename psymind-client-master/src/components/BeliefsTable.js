import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import BeliefTable from './BeliefTable';
import { useDispatch, useSelector } from 'react-redux';
import { addBelief, removeBelief, editBelief } from '../redux/actions';

export default function BeliefsTable() {
	const beliefs = useSelector((state) => state.beliefs);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();
	const isPsychologist = useSelector((state) => state.isPsychologist);

	const [state, setState] = useState({
		columns: [{ title: 'Belief', field: 'name' }],
		data: beliefs,
	});

	useEffect(() => {
		setState({ ...state, data: beliefs });
	}, [beliefs]);

	return (
		<MaterialTable
			title='My negative beliefs'
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
								addBelief(token, {
									name: newData.name,
									forr: [],
									against: [],
								})
							);
						},
						onRowUpdate: (newData, oldData) =>
							dispatch(
								editBelief(token, {
									name: newData.name,
									id: oldData._id,
								})
							),
						onRowDelete: (oldData) =>
							dispatch(removeBelief(token, oldData._id)),
					}
			}
			detailPanel={(rowData) => {
				return <BeliefTable index={rowData.tableData.id} />;
			}}
			onRowClick={(togglePanel) => togglePanel()}
		/>
	);
}
