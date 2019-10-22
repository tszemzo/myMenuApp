import React from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class Landing extends React.Component{

	render(){
		const { classes } = this.props;
		return (
			<Paper className={classes.paper}>
			<Typography component="h1" variant="h4" align="left" gutterBottom>
				Bienvenidos
			</Typography>
			<Link to="/productos">
				<Typography component="p" variant="p" color="secondary" align="left" gutterBottom>
					Clickee aca para acceder a MyMenu App
				</Typography>
		    </Link>
			</Paper>
		);
	}
}

const styles = theme => ({
	paper: {
	    margin: 'auto',
	    marginTop: theme.spacing.unit * 16,
	    width: '50%',
	    minWidth: '300px',
	    display: 'flex',
	    flexDirection: 'column',
	    // alignItems: 'center',
	    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
});

export default  withStyles(styles)(Landing);
