import { useState, useCallback } from "react";

interface IState {
    status: "ready" | "loading" | "error";
    value: any;
    error: any;
}

interface IOptions {
    showError?: boolean;
    showSuccess?: boolean;
}

const useAsync = (asyncFunction?: any, options?: IOptions) => {
    if (!asyncFunction) return;
    const { showError = true, showSuccess = false } = options || {};

    const [state, setState] = useState<IState>({
        status: "ready",
        value: null,
        error: null,
    });

    const onSuccess = (response: any) => {
        setState((prevState) => ({
            ...prevState,
            status: "ready",
            value: response,
        }))
        return Promise.resolve(response);
    };

    const onError = (error: any) => {
        setState((prevState) => ({
            ...prevState,
            status: "error",
            error: error,
        }));
        return Promise.reject(error);
    };

    const execute = useCallback(
        async (...args) => {
            setState((prevState) => ({
                ...prevState,
                status: "loading",
                value: null,
                error: null,
            }));

            return await asyncFunction(...args)
                .then((response: any) => {
                    return onSuccess(response);
                })
                .catch((error: any) => {
                    return onError(error);
                });
        },
        [asyncFunction]
    );

    return { execute, ...state };
};

interface IMutipleAsync extends IState {
    execute: Function;
}

export const useAsyncs = function (
    ...params: Array<Function | [Function, IOptions?]>
) {
    let result: Array<any> = [];

    params.map((item) => {
        let prepare: any = [item];
        if (Array.isArray(item)) {
            prepare = item;
        }
        result.push(useAsync(...prepare));
    });
    return result;
};
