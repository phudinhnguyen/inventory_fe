import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getAccountInfo } from './api';
import { Account } from './pages';
import { Pharmacys } from './pages';
import { accountState } from './recoil';

const App: React.FC = React.memo(() => {
    const [ accountDataState, setAccountDataState ] = useRecoilState(accountState.accountDataState)

    useEffect(() => {
        const accountInfo = getAccountInfo()

        if (accountInfo?.loginSession?.mToken) {
            setAccountDataState(accountInfo)
        }
    }, [])

    if (accountDataState.loginSession?.mToken) {
        return <Pharmacys />
    }
    return <Account />
});

export default App