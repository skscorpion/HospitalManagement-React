import reducer from '../patientReducer';

describe(`the patientReducer reducer`, () => {
	it(`should return the default state`, () => {
		const state = undefined;
		const action = {};
		const expectedOutput = {
			error: null,
			loading: false,
			patients: [],
			selectedPatient: {},
		};
		expect(reducer(state, action)).toEqual(expectedOutput);
	});
});
