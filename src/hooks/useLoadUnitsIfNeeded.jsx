import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUnitsData } from '@slices/unitsSlice';
import { sessionSavedSettingsDataENUM } from '@enums';
import axiosInstance from '@services/axiosInstance';

const useLoadUnitsIfNeeded = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const loadUnits = async () => {
			const storedUnits = sessionStorage.getItem(sessionSavedSettingsDataENUM.UNITS_DATA);

			if (storedUnits) {
				dispatch(setUnitsData({ unitsData: JSON.parse(storedUnits) }));
				return;
			}

			try {
				const response = await axiosInstance.get("/v1/units");

				sessionStorage.setItem(
					sessionSavedSettingsDataENUM.UNITS_DATA, 
					JSON.stringify(response.data)
				);
				dispatch(setUnitsData({ unitsData: response.data }));
			} catch (error) {
				console.error('Error while loading units: ', error);
			}
		};

		loadUnits();
	}, [dispatch]);
};

export default useLoadUnitsIfNeeded;
