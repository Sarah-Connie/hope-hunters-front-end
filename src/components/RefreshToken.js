import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

//   const refresh = async () => {
    // try {
    //   const response = await fetch('/refresh', {
    //     method: 'GET',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    const refresh = async () => {

        //mock data for development
        const response = {
            json: () => ({
            jwt: { token: "fakeRefreshTokenForTesting" },
            })
        };
        
        if (response.ok) {
            const data = await response.json();
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(data.jwt.token);
                return {
                    ...prev,
                    user: {
                      ...prev.user,
                      jwt: data.jwt.token,
                    },
                  };
                });
            return data.jwt.token
            } else console.log('Error refreshing token:');
        
        } 
        return refresh;
    };

export default useRefreshToken;
