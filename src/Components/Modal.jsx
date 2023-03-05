import React from 'react'
import { useGlobalContext } from '../Context'

function Modal() {

    const { selectedMeal, closeModal } = useGlobalContext();
    console.log(selectedMeal) // returns the meal object
    //destructure the meal object passed from selectedModal useState
    const { idMeal, strMeal: title, strMealThumb: img, strInstructions: text, strSource:source} = selectedMeal;
    
    
    return ( 
    <aside className='modal-overlay'>
        <div className="modal-container">
            <img src={img} alt={title} className="img modal-img" />
            <div className="modal-content">
                <h4>{title}</h4>
                <p>Cooking Intstructions</p>
                <p>{text}</p>
                <a href={source} target="_blank">Full Recipe</a>
            <button className='btn btn-hipster close-btn' onClick={closeModal}>close</button>

            </div>
        </div>
    </aside>
  )
}

export default Modal