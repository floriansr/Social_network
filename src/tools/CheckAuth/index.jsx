import React from "react"
import { useSelector, useDispatch } from "react-redux"


import { setConnexion } from "../../redux";


const CheckAuth = () => {
	const dispatch = useDispatch();
	const logii = useSelector(state => state.log);


	dispatch(setConnexion())



	return (
	<>
	    <p>{logii}</p>

	</>
	);
};

export default CheckAuth