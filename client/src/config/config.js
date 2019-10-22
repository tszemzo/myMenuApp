var config = {
	server_url: 'http://localhost:4000'
};
if(process.env.NODE_ENV === 'development'){
	console.log('dev');	
	config.server_url = 'http://localhost:4000';
}
if(process.env.NODE_ENV === 'production'){
	config.server_url =  '';
}

export default config;