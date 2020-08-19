import React from 'react';

const Navigation = ({onRouteChange, route}) =>{
	
	switch(route){
		case 'singin':
			return(
				<nav style = {{display:'flex', 
				justifyContent:'flex-end'}}>
					<p 
						onClick = {() => onRouteChange('register')} 
						className='f3 link din black pa3 pointer'>
						Register
					</p>
				</nav>
			);
			
		case 'register':
			return(
				<nav style = {{display:'flex', 
				justifyContent:'flex-end'}}>
					<p 
						onClick = {() => onRouteChange('singin')} 
						className='f3 link din black pa3 pointer'>
						Sing In
					</p>
				</nav>
			);
			
		default:
			return(
				<nav style = {{display:'flex', 
				justifyContent:'flex-end'}}>
					<p 
						onClick = {() => onRouteChange('singin')} 
						className='f3 link din black pa3 pointer'>
						Sign Out
					</p>
					<p 
						onClick = {() => onRouteChange('register')} 
						className='f3 link din black pa3 pointer'>
						Register
					</p>
				</nav>
			);

	}

}
export default Navigation;