import React, { createContext, useState, useContext } from 'react';

const StudentContext = createContext();

export const useStudent = () => {
    return useContext(StudentContext);
};

export const StudentProvider = ({ children }) => {
    const [student, setStudent] = useState(null);
    const [colorCoalition, setColorCoalition] = useState({
        transparence: "#FFFFFF33",
        color: "#FFFFFF"
    })

    return (
        <StudentContext.Provider value={{ student, setStudent, colorCoalition, setColorCoalition }}>
            {children}
        </StudentContext.Provider>
    );
};