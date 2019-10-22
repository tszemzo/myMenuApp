import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class Contact extends React.Component{

	onSubmit(){

	}

	render(){
		const { classes } = this.props;
		return (

			<Paper className={classes.paper}>
				<Typography component="h1" variant="h4" align="left" gutterBottom>
					Tu opinion nos interesa
				</Typography>
				<Typography component="h1" variant="h5" align="left">
					Formulario de Contacto
				</Typography>

				<form className={classes.form} onSubmit={this.onSubmit}>
			            <FormControl margin="normal" required fullWidth>
			              <InputLabel htmlFor="name">Nombre</InputLabel>
			              <Input id="name"
			              name="name"
			              />
			            </FormControl>
			            <FormControl margin="normal" required fullWidth>
			              <InputLabel htmlFor="description">Deja tu comentario o sugerencia...</InputLabel>
			              <Input name="description"
			              type="text"
			              multiline={true}
			              />
			            </FormControl>
			            <Button
			              type="submit"
			              fullWidth
			              variant="contained"
			              color="primary"
			              href="/"
			              className={classes.submit}
			            >
			              Enviar
			            </Button>
			        </form>
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
	form: {
	    width: '100%', // Fix IE 11 issue.
	    marginTop: theme.spacing.unit,
	},
	submit: {
	    marginTop: theme.spacing.unit * 3,
	},
});

export default  withStyles(styles)(Contact);
