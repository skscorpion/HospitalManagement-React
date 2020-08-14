import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { TextField, Radio } from 'final-form-material-ui';
import {
	Typography,
	Paper,
	Link,
	Grid,
	Button,
	CssBaseline,
	RadioGroup,
	FormLabel,
	FormGroup,
	FormControl,
	FormControlLabel,
	InputLabel,
} from '@material-ui/core';
import CellButton from '../helpers/CellButton';
import SelectInput from './selectInput';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IPatientForm } from './form-types';
import validate from './validation';
import axios from 'axios';
import Layout from '../layout';
import Authenticate from '../helpers/Authenticate';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface formProps {
	handleSubmit: any;
	reset: any;
	submitting: any;
	pristine: any;
	values: any;
}

interface Errors {
	firstName: string;
	lastName: string;
	email: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			display: 'flex',
			justifyContent: 'flex-end',
		},
		form: {
			padding: theme.spacing(2),
			width: '70vw',
		},
		gridRow: {
			marginBottom: '15px',
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		select: {
			width: '100%',
			borderTop: 'none',
			borderLeft: 'none',
			borderRight: 'none',
			outline: 'none',
			height: '35px',
		},
		dFlexEnd: {
			display: 'flex',
			justifyContent: 'flex-end',
		},
		pageRefresh: {
			marginLeft: '50px',
		},
		selectLabel: {
			fontSize: '12px',
		},
	})
);

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const PatientForm = (props: any) => {
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		setOpen(false);
		setError(false);
	};
	const classes = useStyles();
	const {
		history,
		isAuthenticated,
		match: { path },
	} = props;
	const isViewOnly = path === '/View';
	const pageHeading = path.replace('/', '');
	useEffect((): any => {
		if (
			(pageHeading === 'Edit' || pageHeading === 'View') &&
			!props.patientData.patientID
		) {
			redirectToHome();
		}
	});

	const onSubmit = async (values: any) => {
		const headers = {
			'Content-Type': 'application/json',
		};
		const promise = axios.post('http://localhost:5000/Patient', values, {
			headers,
		});

		promise
			.then((value) => {
				setOpen(true);
				setTimeout(() => {
					redirectToHome();
				}, 2000);
			})
			.catch((error) => setError(true));
	};

	const redirectToHome = () => {
		history.push('/Home');
	};

	const FormFirstRow = () => {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={4}>
					<Field
						fullWidth
						required
						name='surName'
						component={TextField}
						type='text'
						label='Surname'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
						autoFocus
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Field
						fullWidth
						required
						name='firstName'
						component={TextField}
						type='text'
						label='First Name'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<FormControl component='fieldset'>
						<FormLabel className={classes.selectLabel} component='legend'>
							Gender
						</FormLabel>
						<RadioGroup row>
							<FormControlLabel
								label='Male'
								control={
									<Field
										name='gender'
										component={Radio}
										type='radio'
										value='M'
										disabled={isViewOnly}
										color='primary'
									/>
								}
							/>
							<FormControlLabel
								label='Female'
								control={
									<Field
										name='gender'
										component={Radio}
										type='radio'
										value='F'
										disabled={isViewOnly}
										color='primary'
									/>
								}
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
			</React.Fragment>
		);
	};

	const FormSecondRow = () => {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='age'
						component={TextField}
						type='text'
						label='Age'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<InputLabel className={classes.selectLabel}>
						Marital Status
					</InputLabel>
					<Field<string>
						name='maritalStatus'
						component={SelectInput}
						className={classes.select}
						disabled={isViewOnly}
					>
						<option />
						<option value='married'>Married</option>
						<option value='unmarried'>Un Married</option>
						<option value='na'>N/A</option>
					</Field>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='dob'
						component={TextField}
						type='date'
						label='Date Of Birth'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</React.Fragment>
		);
	};

	const FormThirdRow = () => {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<InputLabel className={classes.selectLabel}>Religion</InputLabel>
					<Field<string>
						name='religion'
						component={SelectInput}
						className={classes.select}
						disabled={isViewOnly}
						required
					>
						<option />
						<option value='hindu'>Hindu</option>
						<option value='muslim'>Muslim</option>
						<option value='christian'>Christian</option>
						<option value='other'>Other Religion</option>
					</Field>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='phone'
						component={TextField}
						type='text'
						label='Phone'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='email'
						component={TextField}
						type='text'
						label='Email Address'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</React.Fragment>
		);
	};

	const FormFourthRow = () => {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='nationality'
						component={TextField}
						type='text'
						label='Nationality'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='state'
						component={TextField}
						type='text'
						label='State'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='occupation'
						component={TextField}
						type='text'
						label='Occupation'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</React.Fragment>
		);
	};

	const FormFifthRow = () => {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='address'
						component={TextField}
						type='text'
						label='Address'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}></Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}></Grid>
			</React.Fragment>
		);
	};

	const FormSixthRow = () => {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='kinName'
						component={TextField}
						type='text'
						label='Name'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='relationship'
						component={TextField}
						type='text'
						label='Relationship'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						fullWidth
						required
						name='kinPhone'
						component={TextField}
						type='text'
						label='Phone'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</React.Fragment>
		);
	};

	const FormSeventhRow = () => {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						label='Email Address'
						name='kinEmail'
						component={TextField}
						type='text'
						required
						fullWidth
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						label='Occupation'
						name='kinOccupation'
						component={TextField}
						type='text'
						required
						fullWidth
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
					<Field
						label='Address'
						name='kinAddress'
						component={TextField}
						type='text'
						required
						fullWidth
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<Layout props={props}>
				<div style={{ padding: 16, margin: 'auto', maxWidth: '70vw' }}>
					<Form
						onSubmit={onSubmit}
						initialValues={{ ...props.patientData }}
						validate={validate}
						render={({
							handleSubmit,
							submitting,
							pristine,
							values,
							hasValidationErrors,
						}) => (
							<form noValidate onSubmit={handleSubmit}>
								<Paper style={{ padding: 16 }}>
									<Grid container alignItems='flex-start' spacing={2}>
										<Grid item xs={12}>
											<h2>{pageHeading} Patient</h2>
										</Grid>
										<Grid item xs={12} className={classes.dFlexEnd}>
											<Field
												label='Patient Id'
												name='patientID'
												component={TextField}
												type='text'
												variant='outlined'
												disabled
											/>
										</Grid>
										<FormFirstRow />
										<FormSecondRow />
										<FormThirdRow />
										<FormFourthRow />
										<FormFifthRow />
										<Grid item xs={12}>
											<h3>Kin Information</h3>
										</Grid>
										<FormSixthRow />
										<FormSeventhRow />
										<Grid container alignItems='flex-start' spacing={2}>
											<Grid item style={{ marginTop: 16 }}>
												<Button
													variant='contained'
													color='primary'
													type='submit'
													disabled={submitting || isViewOnly}
												>
													Submit
												</Button>
											</Grid>
											<Grid item style={{ marginTop: 16 }}>
												<Button
													type='button'
													variant='contained'
													disabled={submitting}
													color='secondary'
													onClick={redirectToHome}
												>
													Cancel
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</Paper>
							</form>
						)}
					/>
				</div>
			</Layout>

			<Snackbar
				open={open}
				autoHideDuration={2000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleClose} severity='success'>
					{pageHeading === 'Add'
						? 'New Patient Record Added'
						: 'Patient Details Modified'}
				</Alert>
			</Snackbar>

			<Snackbar
				open={error}
				autoHideDuration={200}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert severity='error' onClose={handleClose}>
					Unable to save patient record, please try again later!
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
};

const mapStateToProps = (state: any) => {
	return {
		patientData: state.patient.selectedPatient,
	};
};

export default connect(mapStateToProps, {})(Authenticate(PatientForm));
