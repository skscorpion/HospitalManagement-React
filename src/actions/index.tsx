import {
	SIGN_IN,
	SIGN_OUT,
	ADD_PATIENT,
	SELECTED_PATIENT,
	FETCH_PATIENTS,
	SET_PATIENTS,
} from './types';
import axios from 'axios';

export const signIn = () => {
	return {
		type: SIGN_IN,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

export const addPatient = (patient: any) => {
	return {
		type: ADD_PATIENT,
		patient,
	};
};

export const fetchPatients = () => {
	const promise = axios.get('http://localhost:5000/Patient');
	return {
		type: FETCH_PATIENTS,
		payload: promise,
	};
};

export const selectedPatient = (patientID: string) => {
	return {
		type: SELECTED_PATIENT,
		patientID,
	};
};

export const setPatients = (patients: any) => {
	return {
		type: SET_PATIENTS,
		patients,
	};
};

export const patients = () => {
	return {
		type: FETCH_PATIENTS,
	};
};
