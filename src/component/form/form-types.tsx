export interface IPatientForm {
	patientId: string;
	firstName: string;
	age: string;
	surname: string;
	address: string;
	dob: string;
	email: string;
	gender: string;
	kinName: string;
	kinEmail: string;
	kinAddress: string;
	kinPhone: string;
	kinOccuputaion: string;
	phone: string;
	occupation: string;
	maritalStatus: string;
	nationality: string;
	religion: string;
	relationship: string;
	state: string;
}

export interface IProps {
	label: string;
	name: string;
	type: string;
	control?: any;
	validation?: any;
	register?: any;
	errors?: any;
	options?: any;
}
