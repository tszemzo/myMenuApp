import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class About extends React.Component{

	render(){
		const { classes } = this.props;
		return (
			<Paper className={classes.paper}>
			<Typography component="h1" variant="h4" align="left">
				El Restaurante
			</Typography>
			<Typography component="p" variant="p" color="secondary" align="left" gutterBottom>
				<br></br>Somos un restaurante con una larga trayectoria brindando el mejor servicio
				a consumidores con paladares muy variados.
				<br></br>
				<br></br>
				El personal de cocina y atención ha sido capacitado para que used pueda tener una
				experiencia culinaria a la altura de sus expectativas.
			</Typography>
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

export default  withStyles(styles)(About);
