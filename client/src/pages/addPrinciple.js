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
import InputBase from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadOutlineIcon from '@material-ui/icons/CloudUpload';
import config from '../config/config';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const server_url = config.server_url;

class AddPrinciple extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			name: '',
			info: '',
		}
	}

	
	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
		  [name]: value
		});
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let product = {
		    name: this.state.name,
			information: this.state.info,
		};
		console.log(product);
		fetch(server_url + '/principles', {
		  method: 'post',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(product),
		})
		.then(res => res.json())
		.then(res => {
		  console.log(res);
		  this.props.history.push('/');
		})
		.catch(err => {
		  console.error(err);
		});
	}

	render(){
		const { classes } = this.props;
		return(
			<div>
				<main className={classes.main}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<CloudUploadOutlineIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Subir un producto
					</Typography>
					<form className={classes.form} onSubmit={this.onSubmit}>
			            <FormControl margin="normal" required fullWidth>
			              <InputLabel htmlFor="text">Nombre</InputLabel>
			              <Input id="name"
			              name="name"
			              autoComplete='off'
			              onChange={this.handleInputChange}
			              autoFocus />
			            </FormControl>
			            <FormControl margin="normal" required fullWidth>
			              <InputLabel htmlFor="textarea">Descripción</InputLabel>
			              <Input name="info"
			              type="info"
			              autoComplete='off'
			              multiline={true} 
			              id="info"
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
			              Subir
			            </Button>
			        </form>
        		</Paper>
        		</main>
			</div>
		)
	}
}

const styles = theme => ({
	main: {
	    width: 'auto',
	    display: 'block', // Fix IE 11 issue.
	    marginLeft: theme.spacing.unit * 3,
	    marginRight: theme.spacing.unit * 3,
	    [theme.breakpoints.down('sm')]: {
	      width: '95%',
	      marginLeft: 'auto',
	      marginRight: 'auto',
	    },
	    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
	      width: 400,
	      marginLeft: 'auto',
	      marginRight: 'auto',
	    },
	},
	paper: {
	    marginTop: '5em',
	    marginBottom: '2em',
	    display: 'flex',
	    flexDirection: 'column',
	    alignItems: 'center',
	    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
	    margin: theme.spacing.unit,
	    backgroundColor: theme.palette.primary.main,
	},
	form: {
	    width: '100%', // Fix IE 11 issue.
	    marginTop: theme.spacing.unit,
	},
	inputInList: {
		// width: '85%'
		// display: 'flex',
		width: '80%'
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
	},
	listInput: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		// width: 'inherit'
	},
	submit: {
	    marginTop: theme.spacing.unit * 3,
	},
});

export default  withStyles(styles)(AddPrinciple);