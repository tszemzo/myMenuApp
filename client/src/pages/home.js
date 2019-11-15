import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProductCard from '../components/productCard';
import MethodCard from '../components/methodCard';
import MenuCard from '../components/menuCard';
import MenuAppBar from '../components/menuAppBar';
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
				renderer: this.renderMenus.bind(this)

			},
			{
				label: 'Métodos de pago',
				renderer: this.renderMethods.bind(this)

			}],
			products: [],
			payment_methods: [], 
			activePrinciples: [],
			menus: [],
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

	getMenus(){
		fetch(server_url + '/menus', {
			method: 'get',
			headers: {
				'Content-Type':'application/json',
			}
		})
			.then(response => response.json())
			.then(data => {
				this.setState({
					menus : data.menus,
				});
			})
			.catch((err) => {
				console.log(err)
			});
	}

	componentDidMount(){
		this.getProducts();
		this.getPaymentMethods();
		this.getMenus();
	}

	handleTextChange= name => event => {
	    this.setState({ [name] : event.target.value });
	};


	renderProducts(){
		const { classes } = this.props;
		return(
			<div>
				<div className={classes.container}>
					<div className={classes.title} style={{display:"flex"}}>
						<Typography gutterBottom variant="h4" component="h2">
							Entradas
						</Typography>
					</div>

					<div className={classes.products} >
						{this.renderFoodTypeProducts(1)}
					</div>
				</div>
				<div>
					<div className={classes.title} style={{display:"flex"}}>
						<Typography gutterBottom variant="h4" component="h2">
							Platos Principales
						</Typography>
					</div>
					<div className={classes.products}>
						{this.renderFoodTypeProducts(2)}
					</div>
				</div>

				<div className={classes.container}>
					<div className={classes.title} style={{display:"flex"}}>
						<Typography gutterBottom variant="h4" component="h2">
							Postre
						</Typography>
					</div>
					<div className={classes.products}>
						{this.renderFoodTypeProducts(3)}
					</div>
				</div>

				<div className={classes.container}>
					<div className={classes.title} style={{display:"flex"}}>
						<Typography gutterBottom variant="h4" component="h2">
							Guarnicion
						</Typography>
					</div>
					<div className={classes.products}>
						{this.renderFoodTypeProducts(4)}
					</div>
				</div>

				<div className={classes.container}>
					<div className={classes.title} style={{display:"flex"}}>
						<Typography gutterBottom variant="h4" component="h2">
							Bebidas
						</Typography>
					</div>
					<div className={classes.products}>
						{this.renderFoodTypeProducts(5)}
					</div>
				</div>

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

	renderMenus(){
		const { classes } = this.props;
		return(
			<div className={classes.products}>
				{
					this.state.menus.map((menu, i) =>{
						if(menu.name.toLowerCase().includes(this.state.search.toLowerCase()))
							return(
								<div key={i}>
									<MenuCard editable={false} menu={menu}/>
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

				<SearchAppBar stateKey="search" search={this.state.search} onTextChange={this.handleTextChange.bind(this)}/>
			</div>
		)
	}

	renderFoodTypeProducts(foodTypeId) {
		const { classes } = this.props;
		return (
			<div className={classes.products}>
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
		marginTop: '0px',
	},
});

export default  withStyles(styles)(Home);