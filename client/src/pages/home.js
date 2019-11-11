import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProductCard from '../components/productCard';
import SearchAppBar from '../components/searchAppBar';
import config from '../config/config';



const server_url = config.server_url;

class Home extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			products: [],
			search: ''
		}
	}

	getProducts(){
		fetch(server_url + '/product', {
			method: 'get',
			headers: {
				'Content-Type':'application/json',
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(this.state.products);
			console.log(data.products[0]);
			this.setState({ 
				products : data.products,
			});
		})
		.catch((err) => {
			console.log(err)
		});
	}

	componentDidMount(){
		this.getProducts();
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
				<div className={classes.container}>
					<div>
						<div style={{marginTop: 100}} >
							<Typography variant="h4" gutterBottom>
									Entradas
							</Typography>
						</div>
						<div className={classes.products}>
							{this.renderFoodTypeProducts(1)}
						</div>
					</div>
					<div>
						<Typography variant="h4" gutterBottom>
							Platos Principales
						</Typography>
						<div className={classes.products}>
							{this.renderFoodTypeProducts(2)}
						</div>
					</div>
					<div>
						<Typography variant="h4" gutterBottom>
							Postre
						</Typography>
						<div className={classes.products}>
							{this.renderFoodTypeProducts(3)}
						</div>
					</div>
					<div>
						<Typography variant="h4" gutterBottom>
							Guarniciones
						</Typography>
						<div className={classes.products}>
							{this.renderFoodTypeProducts(4)}
						</div>
					</div>
					<div>
						<Typography variant="h4" gutterBottom>
							Bebidas
						</Typography>
						<div className={classes.products}>
							{this.renderFoodTypeProducts(4)}
						</div>
					</div>



				</div>
				<SearchAppBar stateKey="search" search={this.state.search} onTextChange={this.handleTextChange.bind(this)}/>
			</div>
		)
	}

	renderFoodTypeProducts(foodTypeId) {
		return (
			<div>
				{
					this.state.products.map((product, i) =>{
						if(product.name.toLowerCase().includes(this.state.search.toLowerCase())
							&& product.foodTypeId==foodTypeId)
							return(
								<div key={i}>
									<ProductCard editable={false} product={product}/>
								</div>
							)

					})
				}
			</div>
		);
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
	products: {
		display: 'flex',
		flexFlow: 'row wrap',
		marginTop: '70px',
	},
});

export default  withStyles(styles)(Home);