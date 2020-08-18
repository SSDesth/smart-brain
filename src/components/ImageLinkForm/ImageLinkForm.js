import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () =>{
	return(
		<div>
			<p className = 'f3'>
			{'This Web App will detect faces in your pictures. Git it a try'}
			</p>

			<div className = ' forn pa4 br3 shadow-5 ImageLinkForm'>
				<input className = 'f4 pa2 w-70 center' type='text' />
				<button className = 'w-30 grow f4 link ph3 pv2 dib 
				white bg-light-blue'>Detect</button>
			</div>
		</div>	
	);
}
export default ImageLinkForm;
