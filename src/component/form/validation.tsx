const validate = (values: any) => {
	const requiredErrorMsg = 'This field is Required';
	const errors: any = {};
	// surName
	if (!values.surName) {
		errors.surName = requiredErrorMsg;
	}
	// firstName
	if (!values.firstName) {
		errors.firstName = requiredErrorMsg;
	}
	// gender
	if (!values.gender) {
		errors.gender = requiredErrorMsg;
	}
	// age
	if (!values.age) {
		errors.age = requiredErrorMsg;
	} else if (isNaN(Number(values.age))) {
		errors.age = 'Must be a number';
	}
	// maritalStatus
	if (!values.maritalStatus) {
		errors.maritalStatus = requiredErrorMsg;
	}
	// dob
	if (!values.dob) {
		errors.dob = requiredErrorMsg;
	}
	// religion
	if (!values.religion) {
		errors.religion = requiredErrorMsg;
	}
	// phone
	if (!values.phone) {
		errors.phone = requiredErrorMsg;
	} else if (
		isNaN(Number(values.phone)) ||
		values.phone.length > 10 ||
		values.phone.length < 10
	) {
		errors.phone = 'Invalid Phone number';
	}
	// email
	if (!values.email) {
		errors.email = requiredErrorMsg;
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	// nationality
	if (!values.nationality) {
		errors.nationality = requiredErrorMsg;
	}
	// state
	if (!values.state) {
		errors.state = requiredErrorMsg;
	}
	// occupation
	if (!values.occupation) {
		errors.occupation = requiredErrorMsg;
	}
	// address
	if (!values.address) {
		errors.address = requiredErrorMsg;
	}
	// kinName
	if (!values.kinName) {
		errors.kinName = requiredErrorMsg;
	}
	// relationship
	if (!values.relationship) {
		errors.relationship = requiredErrorMsg;
	}
	// kinPhone
	if (!values.kinPhone) {
		errors.kinPhone = requiredErrorMsg;
	} else if (
		isNaN(Number(values.kinPhone)) ||
		values.kinPhone.length > 10 ||
		values.kinPhone.length < 10
	) {
		errors.kinPhone = 'Invalid Phone number';
	}
	// kinEmail
	if (!values.kinEmail) {
		errors.kinEmail = requiredErrorMsg;
	} else if (
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.kinEmail)
	) {
		errors.kinEmail = 'Invalid email address';
	}
	// kinOccupation
	if (!values.kinOccupation) {
		errors.kinOccupation = requiredErrorMsg;
	}
	// kinAddress
	if (!values.kinAddress) {
		errors.kinAddress = requiredErrorMsg;
	}

	return errors;
};

export default validate;
