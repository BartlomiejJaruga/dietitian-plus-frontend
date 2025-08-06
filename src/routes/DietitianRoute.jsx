import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRolesENUM } from "@enums";
import useLoadUnitsIfNeeded from "@hooks/useLoadUnitsIfNeeded";


// local component to make sure that units are loaded
function UnitsLoader() {
	useLoadUnitsIfNeeded();
	return null;
}

export default function DietitianRoute() {
	const authState = useSelector((state) => state.auth);
	
	// check if user data is being loaded -> if yes the auth check is omited
	if(authState.isAuthGettingLoaded){
		return null;
	}

	// check if user is authorized for required supply
	if (
		!authState 
		|| authState.isAuthenticated !== true 
		|| authState.userData.user_type !== userRolesENUM.DIETITIAN
	) {
		return <Navigate to="/unauthorized" replace />;
	}

	
	return (
		<>
			<UnitsLoader/>
			<Outlet />
		</>
	);
};

