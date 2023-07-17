import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { editThought } from '../redux/actions';

export default function AnswerTable({ tindex, qindex }) {
	const [state, setState] = useState({
		columns: [{ title: 'Answer', field: 'answer' }],
		data: [],
	});

	const thoughts = useSelector((state) => state.thoughts);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();
	const isPsychologist = useSelector((state) => state.isPsychologist);

	useEffect(() => {
		setState({
			...state,
			data: [{ answer: thoughts[tindex].questions[qindex].answer }],
		});
	}, [thoughts]);

	return (
		<MaterialTable
			title={thoughts[tindex].questions[qindex].question}
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
						onRowUpdate: (newData, oldData) => {
							const thought = { ...thoughts[tindex] };
							const questions = thought.questions;
							questions[qindex].answer = newData.answer;
							return dispatch(editThought(token, thought));
						},
					}
			}
		/>
	);
}

// {
//   thought,
//   clientId,
//   questions: [
//     {
//       question,
//       answer
//     }
//   ]
// }
