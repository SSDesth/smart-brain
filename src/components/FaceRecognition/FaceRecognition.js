import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageURL, box}) =>{
	return(
		
		<div className = 'center ma'>
			<div className='ContenedorIMG'>
				<div className = ' absolute mt2'>
					<img alt='' id='inputImage'
					src={imageURL} width='450' height ='auto'/>
					
					<div className='bounding-box' 
					style = {{top: box.topRow, 
						right : box.rightCol,
						bottom : box.bottomRow,
						left: box.leftCol}}></div>
				</div>
			</div>
			
			
		</div>	
	);
}
export default FaceRecognition;