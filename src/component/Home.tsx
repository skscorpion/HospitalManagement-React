import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import CellButton from './helpers/CellButton';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Box from '@material-ui/core/Box';
import { selectedPatient, setPatients, fetchPatients } from '../actions';
import Layout from './layout';
import Authenticate from './helpers/Authenticate';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Home = (props: any) => {
	const [state, setState] = useState({
		patientList: [],
		error: null,
	});
	const [loading, setLoading] = useState(true);

	function Alert(props: AlertProps) {
		return <MuiAlert elevation={6} variant='filled' {...props} />;
	}
	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	useEffect((): any => {
		// props.fetchPatients();
		setState({
			patientList: props.patients,
			error: null,
		});
		let isSubscribed = true;
		const promise = axios.get('http://localhost:5000/Patient');
		promise
			.then((value) => {
				if (isSubscribed) {
					setState({
						patientList: value.data,
						error: null,
					});
				}
				props.setPatients(value.data);
				setLoading(false);
			})
			.catch((error) => {
				setOpen(true);
				if (isSubscribed) {
					setState({
						patientList: [],
						error: error,
					});
				}
				setLoading(false);
			});

		return () => (isSubscribed = false);
	}, []);

	const onEditClicked = (id: string) => {
		props.selectedPatient(id);
		props.history.push('/Edit');
	};

	const onViewClicked = (id: string) => {
		props.selectedPatient(id);
		props.history.push('/View');
	};

	const gridData: any = {
		columnDefs: [
			{ headerName: 'Patient ID', field: 'patientID', sortable: true },
			{ headerName: 'Name', field: 'firstName', sortable: true },
			{ headerName: 'Contact', field: 'phone' },
			{
				headerName: 'Action',
				field: 'patientID',
				width: '100',
				cellRenderer: 'btnCellRenderer',
				cellRendererParams: {
					clicked: (field: any) => onEditClicked(field),
					caption: 'Edit',
					color: 'primary',
				},
			},
			{
				headerName: '',
				field: 'patientID',
				width: '120',
				cellRenderer: 'btnCellRenderer',
				cellRendererParams: {
					clicked: (field: any) => onViewClicked(field),
					caption: 'Detail',
					color: 'secondary',
				},
			},
		],
		frameworkComponents: {
			btnCellRenderer: CellButton,
		},
	};

	return (
		<React.Fragment>
			<Layout props={props} title='Home'>
				<Box display='flex' justifyContent='center'>
					<div
						className='ag-theme-alpine'
						style={{ height: '520px', width: '70vw', marginTop: '20px' }}
					>
						<AgGridReact
							columnDefs={gridData.columnDefs}
							rowData={state.patientList}
							frameworkComponents={gridData.frameworkComponents}
							pagination={true}
							paginationPageSize={10}
						></AgGridReact>
					</div>
				</Box>
			</Layout>
			<Snackbar
				open={open}
				autoHideDuration={20000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleClose} severity='error'>
					<span>Something went wrong, Please Refresh the page</span>
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
};

const mapStateToProps = (state: any) => {
	const { patient } = state;
	return {
		loading: patient.loading,
		items: patient.data,
		error: patient.error,
		patients: patient.patients,
	};
};

export default connect(mapStateToProps, {
	selectedPatient,
	setPatients,
	fetchPatients,
})(Authenticate(Home));
