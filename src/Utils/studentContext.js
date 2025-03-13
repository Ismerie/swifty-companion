import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSetupApiClient } from './useSetUpApiClient';

const StudentContext = createContext();

export const useStudent = () => {
    return useContext(StudentContext);
};

export const StudentProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [student, setStudent] = useState(null);
    const [skills, setSkills] = useState(null);
    const [projects, setProjects] = useState(null);
    const [colorCoalition, setColorCoalition] = useState({
        transparence: "#FFFFFF33",
        color: "#FFFFFF"
    });

    useSetupApiClient(token, setToken);

    return (
        <StudentContext.Provider value={{
            token,
            setToken,
            student,
            setStudent,
            colorCoalition,
            setColorCoalition,
            skills,
            setSkills,
            projects,
            setProjects,
        }}>
            {children}
        </StudentContext.Provider>
    );
};
