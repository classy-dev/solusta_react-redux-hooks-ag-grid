import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import @material-ui
import { Button, Grid, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import components
import Notification from '../../../../shared/Notification';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(4),
	},
	container: {
		marginTop: theme.spacing(12),
	},
	item: {
		textAlign: 'center'
	},
	button: {
		margin: theme.spacing(1),
		padding: theme.spacing(1.5),
		width: '400px',
		textDecoration: 'uppercase'
	},
	snackBar: {
		marginTop: '50px',
	}
}));

function Category(props) {
	const [succeed, setSucceed] = useState(false);
	const [failed, setFailed] = useState(false);

	const classes = useStyles();
	const dispatch = useDispatch();
	const success = useSelector(({ registration }) => registration.attendee.success);
	const fail = useSelector(({ registration }) => registration.attendee.fail);

	useEffect(() => {
		dispatch(Actions.getAttendeeCategories());
	}, [dispatch]);

	useEffect(() => {
		setSucceed(success);
	}, [success]);

	useEffect(() => {
		setFailed(fail);
	}, [fail]);

	const addSpeaker = () => {
		props.history.push('/app/attendees/attendee/speaker');
	}

	const addOrganizer = () => {
		props.history.push('/app/attendees/attendee/organizer');
	}

	const addParticipant = () => {
		props.history.push('/app/attendees/attendee/participant');
	}

	const addEventCrew = () => {
		props.history.push('/app/attendees/attendee/event-crew');
	}

	const addMedia = () => {
		props.history.push('/app/attendees/attendee/media');
	}

	const addSecurity = () => {
		props.history.push('/app/attendees/attendee/security');
	}

	const addContractor = () => {
		props.history.push('/app/attendees/attendee/contractor');
	}

	const onCloseSuccessSnack = () => {
		setSucceed(false);
	};

	const onCloseFailSnack = () => {
		setFailed(false);
	}

	return (
		<React.Fragment>
			<div className={classes.root}>
				<Grid container spacing={3} className={classes.container}>
					<Grid item xs={12} md={6} className={classes.item}>
						<Button variant="contained" color="secondary" className={classes.button} onClick={addSpeaker}>
							Speaker
						</Button>
					</Grid>
					<Grid item xs={12} md={6} className={classes.item}>
						<Button variant="contained" color="secondary" className={classes.button} onClick={addOrganizer}>
							Organizer
						</Button>
					</Grid>
					<Grid item xs={12} md={6} className={classes.item}>
						<Button variant="contained" color="secondary" className={classes.button} onClick={addParticipant}>
							Participant
						</Button>
					</Grid>
					<Grid item xs={12} md={6} className={classes.item}>
						<Button variant="contained" color="secondary" className={classes.button} onClick={addEventCrew}>
							Event Crew
						</Button>
					</Grid>
					<Grid item xs={12} md={6} className={classes.item}>
						<Button variant="contained" color="secondary" className={classes.button} onClick={addMedia}>
							Media
						</Button>
					</Grid>
					<Grid item xs={12} md={6} className={classes.item}>
						<Button variant="contained" color="secondary" className={classes.button} onClick={addSecurity}>
							Security
                        </Button>
					</Grid>
					<Grid item xs={12} md={12} className={classes.item}>
						<Button variant="contained" color="secondary" className={classes.button} onClick={addContractor}>
							Contractor
						</Button>
					</Grid>
				</Grid>
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={succeed}
				autoHideDuration={4000}
				onClose={onCloseSuccessSnack}
				className={classes.snackBar}
			>
				<Notification
					onClose={() => setSucceed(false)}
					variant="success"
					message="Saving Attendee Success"
				/>
			</Snackbar>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={failed}
				autoHideDuration={4000}
				onClose={onCloseFailSnack}
				className={classes.snackBar}
			>
				<Notification
					onClose={() => setFailed(false)}
					variant="success"
					message="Saving Attendee Fail"
				/>
			</Snackbar>
		</React.Fragment>
	);
}

export default withRouter(withReducer('registration', reducer)(Category));
