/* eslint-disable no-unused-vars */
import { FC, useEffect } from "react";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { useDispatch, useStore } from "react-redux";
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";
import { Reducer } from "@reduxjs/toolkit";


export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;

}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount,
    } = props
    const store = useStore() as ReduxStoreWithManager
    const dispatch = useDispatch()

    useEffect(()=>{
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager?.add(name as StateSchemaKey, reducer)
            dispatch({type:`INIT ${name}`})
        })
        return () => {
            if(removeAfterUnmount) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager?.remove(name as StateSchemaKey)
                    dispatch({type:`DESTROY ${name} reducer`})
                })
            }
        }
        // eslint-disable-next-line
    }, [])


    return (
        <>
            {children}
        </>
    );
};

export default DynamicModuleLoader;