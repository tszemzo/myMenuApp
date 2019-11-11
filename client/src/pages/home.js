import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProductCard from '../components/productCard';
<<<<<<< HEAD
import MethodCard from '../components/methodCard';
import MenuAppBar from '../components/menuAppBar';
=======
>>>>>>> e050dec742d67e3a0b7bb16114fade870d39fa9f
import SearchAppBar from '../components/searchAppBar';
import TabNav from '../components/tabNav';
import config from '../config/config';
import IconButton from '@material-ui/core/IconButton';
import AddProductModal from '../components/addProductModal';
import AddBox from '@material-ui/icons/AddBox';



const server_url = config.server_url;

class Home extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			tabs:[{
				label: 'Platos',
				renderer: this.renderProducts.bind(this)

			},{
				label: 'Menues',
				renderer: this.renderProducts.bind(this)

			},
			{
				label: 'Métodos de pago',
				renderer: this.renderMethods.bind(this)

			}],
			products: [],
			payment_methods: [], 
			activePrinciples: [],
			search: '',
			addProductShow:false,
			addPrincipleShow:false,
			addPaymentMethodShow:false,
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
			console.log(data.methods)
			this.setState({
				payment_methods : data.methods,
			});
		})
		.catch((err) => {
			console.log(err)
		});
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
		this.getPaymentMethods();
	}

	handleTextChange= name => event => {
	    this.setState({ [name] : event.target.value });
	};

	renderProducts(){
		const { classes } = this.props;
		return(
			<div className={classes.products}>
				{
					this.state.products.map((product, i) =>{
						if(product.name.toLowerCase().includes(this.state.search.toLowerCase()))
							return(
								<div key={i}>
		                    		<ProductCard editable={false} product={product}/>
		                    	</div>
							)
					})
				}
			</div>
		)
	}

	renderMethods(){
		const { classes } = this.props;
		return(
			<div className={classes.products}>
				{
					this.state.payment_methods.map((method, i) =>{
						if(method.name.toLowerCase().includes(this.state.search.toLowerCase()))
							return(
								<div key={i}>
		                    		<MethodCard editable={false} method={method}/>
		                    	</div>
							)
					})
				}
			</div>
		)
	}


	render(){
		const { classes } = this.props;
		return(
			<div className={classes.container}>
				<TabNav tabs={this.state.tabs}/>
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
		marginTop: 70
	},
	products: {
		display: 'flex',
		flexFlow: 'row wrap',
		marginTop: '70px',
	},
});

export default  withStyles(styles)(Home);