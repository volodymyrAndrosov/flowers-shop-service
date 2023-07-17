import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { editChainedAccounts } from '../redux/actions';

export default function PsyTable({ index }) {
	const [state, setState] = useState({
		columns: [
			{ title: 'Name', field: 'name' },
			{ title: 'Email', field: 'email' },
		],
		data: [],
	});

	const chainedAccounts = useSelector((state) => state.chainedAccounts);
	const isPsychologist = useSelector((state) => state.isPsychologist);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();

	useEffect(() => {
		setState({ ...state, data: chainedAccounts });
	}, [chainedAccounts]);

	return (
		<MaterialTable
			style={{}}
			title='My Psychologists'
			columns={state.columns}
			data={state.data}
			options={{
				search: false,
				paging: false,
			}}
			editable={{
				onRowDelete: (oldData) => {
					const newChainedAccounts = { ...newChainedAccounts };
					newChainedAccounts.splice(
						newChainedAccounts.findIndex((a) => a.id === oldData.id),
						1
					);
					return dispatch(editChainedAccounts(token, newChainedAccounts));
				},
			}}
		/>
	);
}
