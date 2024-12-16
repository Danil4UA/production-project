/* eslint-disable no-unused-vars */
import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { CounterSchema } from "entities/Counter"
import { ProfileSchema } from "entities/Profile";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;

    // async reducers
    loginForm? : LoginSchema;
    profile?: ProfileSchema
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}


export type StateSchemaKey = keyof StateSchema
export interface ReduxStoreWithManager extends EnhancedStore<EnhancedStore> {
    reducerManager?: ReducerManager;
}