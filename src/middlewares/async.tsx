export default ({ dispatch, getState }: any) => (next: any) => (
	action: any
) => {
	// if (!action) {
	// 	return next(action);
	// }
	if (!action.payload || !action.payload.then) {
		return next(action);
	}

	if (action.payload && action.patients) {
		return next(action);
	}

	action.payload.then(function (response: any) {
		const newAction = { ...action, patients: response.data };
		dispatch(newAction);
	});
};
