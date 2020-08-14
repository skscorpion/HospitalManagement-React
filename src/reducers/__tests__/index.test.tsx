import index from '../index';
import authReducer from '../authReducer';
import patientReducer from '../patientReducer';

describe(`the index reducer`, () => {
	it(`should return the default state for both`, () => {
		const state = undefined;
		const action = {};
		const expectedOutput = {
			auth: { isSignedIn: null },
			patient: {
				error: null,
				loading: false,
				patients: [],
				selectedPatient: {},
			},
		};
		expect(index(state, action)).toEqual(expectedOutput);
	});
});
