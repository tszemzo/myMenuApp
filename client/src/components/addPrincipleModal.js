import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuAppBar from '../components/menuAppBar';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
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

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

class AddPrincipleModal extends React.Component{

	constructor(props){
		super(props);
		const { principle } = props
		console.log(principle)
		this.state = {
			name: (principle)? principle.name : '',
			info: (principle)? principle.information : '',
		}
		
	}

	
	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
		  [name]: value
		});
	}

	createNew(){
		let principle = {
		    name: this.state.name,
			information: this.state.info,
		};
		fetch(server_url + '/principles', {
		  method: 'post',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(principle),
		})
		.then(res => res.json())
		.then(res => {
		  console.log(res);
		  this.props.onAdd(res)
		})
		.catch(err => {
		});

	}
	
	editOld(){
		let principle = {
		    name: this.state.name,
			information: this.state.info,
		};
		fetch(server_url + '/principles/'+this.props.principle.id, {
		  method: 'put',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(principle),
		})
		.then(res => res.json())
		.then(res => {
		  console.log(res);
		})
		.catch(err => {
		});

	}
	onSubmit = (event) => {
		event.preventDefault();
		if(this.props.principle)
			this.editOld()
		else
			this.createNew()
		
		this.props.handleClose()
	}

	render(){
		const { classes } = this.props;
		return(
			<Dialog
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          		<DialogContent>
					<main className={classes.main}>
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
				              value={this.state.name}
				              onChange={this.handleInputChange}
				              autoFocus />
				            </FormControl>
				            <FormControl margin="normal" required fullWidth>
				              <InputLabel htmlFor="textarea">Descripción</InputLabel>
				              <Input name="info"
				              type="info"
				              autoComplete='off'
				              value={this.state.info}
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
	        		</main>
	        	</DialogContent>
        </Dialog>
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

export default  withStyles(styles)(AddPrincipleModal);