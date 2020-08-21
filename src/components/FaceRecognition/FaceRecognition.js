import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageURL,cBox}) =>{
	let localBoxes=cBox.map((elemento, i)=>{
						return <div
							key= {i}
							className='bounding-box' 
							style = {{top: elemento.topRow, 
							right : elemento.rightCol,
							bottom : elemento.bottomRow,
							left: elemento.leftCol}}>
						</div>
					});
	return(
		
		<div className = 'center ma'>
			<div className='ContenedorIMG'>
				<div className = ' absolute mt2'>
					<img alt='' id='inputImage'
					src={imageURL} width='450' height ='auto'/>
					
					{localBoxes}
				</div>
			</div>
			
			
		</div>	
	);
}
export default FaceRecognition;