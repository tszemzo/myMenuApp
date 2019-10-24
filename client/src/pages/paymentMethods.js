import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MethodCard from '../components/methodCard';
import MenuAppBar from '../components/menuAppBar';
import SearchAppBar from '../components/searchAppBar';
import config from '../config/config';

import Anime from 'react-anime';

const server_url = config.server_url;

class Home extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			paymentMethods: [],
			search: ''
		}
	}

	getPaymentMethods(){
		fetch(server_url + '/methods', {
			method: 'get',
			headers: {
				'Content-Type':'application/json',
				// 'Authorization': authToken.getToken(),
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(this.state.paymentMethods);
			console.log(data.methods[0]);

			this.setState({ 
				paymentMethods : data.methods,
			});
		})
		.catch((err) => {
			console.log(err)
		});
	}

	componentDidMount(){
		this.getPaymentMethods();
	}

	handleTextChange= name => event => {
	    this.setState({ [name] : event.target.value });
	};


	render(){
		let animeProps = {
	      opacity: [0, 1],
	      translateY: [-64, 0],
	      delay: (el, i) => i * 100
	    };
		const { classes } = this.props;
		return(
			<div className={classes.container}>
				<div className={classes.title}>
					<Typography gutterBottom variant="h4" component="h2">
		            	Metodos de Pago
		          	</Typography>
		        </div>  
				<div className={classes.methods}>	
					{
						this.state.paymentMethods.map((method, i) =>{
							if(method.name.toLowerCase().includes(this.state.search.toLowerCase()))
								return(
									<div key={i}>
			                    		<MethodCard editable={false} method={method}/>
			                    	</div>
								)

						})
					}
				</div>
				<SearchAppBar stateKey="search" search={this.state.search} onTextChange={this.handleTextChange.bind(this)}/>
			</div>
		)
	}
}

const styles = theme => ({
	test: {
		backgroundColor: '#fff',
		color: '#a2a',
		margin: 'auto',
		marginTop: '300px',
		width: '50%',
		height: '40px',
	},
	container: {
		margin: 20,
	},
	methods: {
		display: 'flex',
		flexFlow: 'row wrap',
		marginTop: '20px',
	},
	title: {
		marginTop: '80px',
		textAlign: 'center'
	},
});

export default  withStyles(styles)(Home);