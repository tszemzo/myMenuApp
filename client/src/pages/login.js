import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuAppBar from '../components/menuAppBar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadOutlineIcon from '@material-ui/icons/CloudUpload';
import config from '../config/config';
var authToken = require('..//providers/authToken');

const server_url = config.server_url;

class Login extends React.Component{

	constructor(props){
		super(props);
	}

	
	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
		  [name]: value
		});
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let user = {
		    "username": this.state.username,
		    "password": this.state.password,
		};
		fetch(server_url + '/user/authenticate', {
		  method: 'post',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(user),
		})
		.then(res => res.json())
		.then(res => {
		  console.log(res);
		  if (res.result === 'OK') {
		    console.log(res.token);
		    authToken.setToken(res.token);
		    this.props.history.push('/productos');
		  } else {
		    const error = new Error(res.error);
		    throw error;
		  }
		})
		.catch(err => {
		  console.error(err);
		});
	}


	render(){
		const { classes } = this.props;
		return(
			<div className={classes.container}>
				<MenuAppBar/>
				<main className={classes.main}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<CloudUploadOutlineIcon />
						{/*<LockOutlineIcon />*/}
					</Avatar>
					<Typography component="h1" variant="h5">
					Ingresar a la plataforma
					</Typography>
					<form className={classes.form} onSubmit={this.onSubmit}>
			            <FormControl margin="normal" required fullWidth>
			              <InputLabel htmlFor="name">Usuario</InputLabel>
			              <Input id="username"
			              name="username"
			              autoComplete="username"
			              onChange={this.handleInputChange}
			              autoFocus />
			            </FormControl>
			            <FormControl margin="normal" required fullWidth>
			              <InputLabel htmlFor="password">Contraseña</InputLabel>
			              <Input name="password"
			              type="password" 
			              id="password"
			              autoComplete="current-password"
			              onChange={this.handleInputChange}
			              />
			            </FormControl>
			            <Button
			              type="submit"
			              fullWidth
			              variant="contained"
			              color="primary"
			              className={classes.submit}
			            >
			              Ingresar
			            </Button>
			        </form>
        		</Paper>
        		</main>
			</div>
		)
	}
}

const styles = theme => ({
	test: {
		backgroundColor: 'tomato',
		color: '#a2a',
		margin: 'auto',
		marginTop: '30px',
		width: '50%',
		height: '40px',
	},
	main: {
	    width: 'auto',
	    display: 'block', // Fix IE 11 issue.
	    marginLeft: theme.spacing.unit * 3,
	    marginRight: theme.spacing.unit * 3,
	    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
	      width: 400,
	      marginLeft: 'auto',
	      marginRight: 'auto',
	    },
	},
	container: {
		margin: 40,
	},
	paper: {
	    marginTop: theme.spacing.unit * 8,
	    display: 'flex',
	    flexDirection: 'column',
	    alignItems: 'center',
	    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
	    margin: theme.spacing.unit,
	    backgroundColor: theme.palette.secondary.main,
	},
	form: {
	    width: '100%', // Fix IE 11 issue.
	    marginTop: theme.spacing.unit,
	},
	submit: {
	    marginTop: theme.spacing.unit * 3,
	},
});

export default  withStyles(styles)(Login);