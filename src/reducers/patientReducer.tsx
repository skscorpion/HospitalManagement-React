import {
	ADD_PATIENT,
	SELECTED_PATIENT,
	FETCH_PATIENTS,
	FETCH_PATIENTS_ERROR,
	SET_PATIENTS,
} from '../actions/types';

const INITIAL_STATE = {
	loading: false,
	patients: [],
	selectedPatient: {},
	error: null,
};

export default (state: any = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case ADD_PATIENT:
			return { ...state };
		case SELECTED_PATIENT:
			let patient: any;
			if (action.patientID) {
				patient = state.patients.find(
					(p: any) => p.patientID === action.patientID
				);
			} else {
				patient = null;
			}
			return { ...state, selectedPatient: patient };
		case FETCH_PATIENTS:
			return {
				...state,
				patients: action.patients,
				loading: false,
			};
		case FETCH_PATIENTS_ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case SET_PATIENTS:
			return { ...state, patients: action.patients };
		default:
			return state;
	}
};
