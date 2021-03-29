/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { getAccountInfo } from './api';
import { Account } from './pages';
import { Pharmacys } from './pages';
import { accountState } from './recoil';

const App: React.FC = React.memo(() => {
    const history = useHistory()
    const pathname = history.location.pathname

    const [account, setAccountDataState] = useRecoilState(accountState.accountDataState)

    useEffect(() => {
        const accountInfo = getAccountInfo()

        if (accountInfo?.loginSession?.mToken) {
            setAccountDataState(accountInfo)
        }
    }, [])

    useEffect(() => {
        if (account.loginSession?.mToken && pathname === '/login') {
            history.push('/search-pharmacys')
        }
    }, [account, pathname])

    if (account.loginSession?.mToken) {
        return <Pharmacys />
    }
    return <Account />
});

export default App