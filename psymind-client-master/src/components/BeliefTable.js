import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { editBelief } from '../redux/actions';

export default function BeliefTable({ index }) {
	const [state, setState] = useState({
		columns: [
			{ title: 'For', field: 'forr' },
			{ title: 'Against', field: 'against' },
		],
		data: [],
	});

	const beliefs = useSelector((state) => state.beliefs);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();
	const isPsychologist = useSelector((state) => state.isPsychologist);

	useEffect(() => {
		const row = beliefs[index];
		const newData = [];
		let length = 0;
		length = Math.max(row.forr.length, row.against.length);
		for (let i = 0; i < length; i++) {
			newData.push({});
		}
		for (let i = 0; i < row.forr.length; i++) {
			newData[i].forr = row.forr[i];
		}
		for (let i = 0; i < row.against.length; i++) {
			newData[i].against = row.against[i];
		}
		setState({ ...state, data: newData });
	}, [beliefs]);

	return (
		<MaterialTable
			style={{}}
			title={beliefs[index].name}
			columns={state.columns}
			data={state.data}
			options={{
				search: false,
				paging: false,
			}}
			editable={
				isPsychologist
					? {}
					: {
						onRowAdd: (newData) => {
							const forr = newData.forr ? newData.forr : '';
							const against = newData.against ? newData.against : '';
							return dispatch(
								editBelief(token, {
									forr: [...beliefs[index].forr, forr],
									against: [...beliefs[index].against, against],
									id: beliefs[index]._id,
								})
							);
						},
						onRowUpdate: (newData, oldData) => {
							const belief = { ...beliefs[index] };
							belief.forr.splice(
								belief.forr.indexOf(oldData.forr),
								1,
								newData.forr
							);
							belief.against.splice(
								belief.against.indexOf(oldData.against),
								1,
								newData.against
							);
							return dispatch(
								editBelief(token, {
									forr: belief.forr,
									against: belief.against,
									id: belief._id,
								})
							);
						},
						onRowDelete: (oldData) => {
							const belief = { ...beliefs[index] };
							belief.forr.splice(belief.forr.indexOf(oldData.forr), 1);
							belief.against.splice(
								belief.against.indexOf(oldData.against),
								1
							);
							return dispatch(
								editBelief(token, {
									forr: belief.forr,
									against: belief.against,
									id: belief._id,
								})
							);
						},
					}
			}
		/>
	);
}
