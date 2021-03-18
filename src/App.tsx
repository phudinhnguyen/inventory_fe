import React, { useEffect, useState } from 'react';
import { Account } from './pages';

const App: React.FC = React.memo(() => {
    const [state, setState] = useState({
        isAuthenticated: false,
    })

    useEffect(() => {
        const init = async () => {

        }

        init()
    }, [])

    return (
        <Account />
    );
});

export default App;
