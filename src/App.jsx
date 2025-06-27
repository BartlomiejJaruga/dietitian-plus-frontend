import './App.scss'

import { Routes, Route } from 'react-router-dom'
import HomePage from '@pages/HomePage/HomePage'
import AuthPage from '@pages/AuthPage/AuthPage'
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage'
import DietitianRoute from '@routes/DietitianRoute'
import DietitianDashboardPage from '@pages/DietitianDashboardPage/DietitianDashboardPage'
import UnauthorizedPage from '@pages/UnauthorizedPage/UnauthorizedPage'
import PatientRoute from '@routes/PatientRoute'
import PatientDashboardPage from '@pages/PatientDashboardPage/PatientDashboardPage'
import GetStartedPage from '@pages/GetStartedPage/GetStartedPage'
import PatientQuestionnairePage from '@pages/PatientQuestionnairePage/PatientQuestionnairePage'
import PatientAboutMePage from '@pages/PatientAboutMePage/PatientAboutMePage'
import DietitianDishesPage from '@pages/DietitianDishesPage/DietitianDishesPage'
import DietitianPatientsPage from '@pages/DietitianPatientsPage/DietitianPatientsPage'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { sessionSavedSettingsDataENUM } from '@enums'
import { loginUser, setAuthIsGettingLoaded } from '@slices/authSlice'
import { setIsQuestionnaireCompleted } from '@slices/patientSlice'

function App() {
    const dispatch = useDispatch();


    useEffect(() => {
        const storedSessionUserData = sessionStorage.getItem(sessionSavedSettingsDataENUM.USER_DATA);
        
        if(storedSessionUserData){
            dispatch(loginUser(JSON.parse(storedSessionUserData)));
        }
        else{
            dispatch(setAuthIsGettingLoaded(false));
        }

        const storedIsQuestionnaireCompleted = sessionStorage.getItem(
            sessionSavedSettingsDataENUM.IS_PATIENT_QUESTIONNAIRE_COMPLETED
        );

        if(storedIsQuestionnaireCompleted){
            dispatch(setIsQuestionnaireCompleted(JSON.parse(storedIsQuestionnaireCompleted)));
        }
    }, [dispatch]);

    return (
        <>
            <Routes>
                    {/* PUBLIC routes */}
                    <Route path='/' element={<HomePage/>} />    
                    <Route path='/auth' element={<AuthPage/>} />
                    <Route path='/getStarted' element={<GetStartedPage/>} />
                    <Route path='/unauthorized' element={<UnauthorizedPage/>} />
                    <Route path='*' element={<NotFoundPage/>} />

                    {/* Protected DIETITIAN routes */}
                    <Route element={<DietitianRoute/>}>
                        <Route path="/dietitian/dashboard" element={<DietitianDashboardPage/>} />
                        <Route path="/dietitian/dishes" element={<DietitianDishesPage/>} />
                        <Route path="/dietitian/patients" element={<DietitianPatientsPage/>} />
                    </Route>

                    {/* Protected PATIENT routes */}
                    <Route element={<PatientRoute/>}>
                        <Route path="/patient/dashboard" element={<PatientDashboardPage/>} />
                        <Route path="/patient/questionnaire" element={<PatientQuestionnairePage/>} />
                        <Route path="/patient/aboutMe" element={<PatientAboutMePage/>} />
                    </Route>
            </Routes>
        </>
    )
}

export default App
