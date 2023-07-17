import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import AnswerTable from './AnswerTable';
import { useDispatch, useSelector } from 'react-redux';

export default function QuestionsTable({ tindex }) {
	const thoughts = useSelector((state) => state.thoughts);
	const [state, setState] = useState({
		columns: [{ title: 'Question to the thought', field: 'question' }],
		data: [],
	});

	useEffect(() => {
		setState({ ...state, data: thoughts[tindex].questions });
	}, [thoughts]);

	return (
		<MaterialTable
			title={thoughts[tindex].name}
			columns={state.columns}
			data={state.data}
			options={{
				paging: false,
				search: false,
			}}
			detailPanel={(rowData) => {
				return (
					<AnswerTable
						tindex={tindex}
						qindex={thoughts[tindex].questions.findIndex(
							(question) => question.question === rowData.question
						)}
					/>
				);
			}}
			onRowClick={(togglePanel) => togglePanel()}
		/>
	);
}
