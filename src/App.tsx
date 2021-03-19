import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Account } from './pages';
import { Pharmacys } from './pages';
import { accountState } from './recoil';

const App: React.FC = React.memo(() => {
    const { token } = useRecoilValue(accountState.accountDataState)

    useEffect(() => {

    }, [])

    if (token) {
        return <Pharmacys />
    }

    return <Account />
});

export default App;
