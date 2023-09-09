import { MetaReducer, ActionReducer } from "@ngrx/store";
import { Actions, Reducers } from ".";
import { Subscription } from "rxjs";

export const StoreReducer = {
    app: Reducers.app,
    user: Reducers.user,
    reload: Reducers.reload,
}

export function getValue(obs$:any) {
    let value;
    const subscription: Subscription = obs$.subscribe( (data:any) => value = data);
    subscription.unsubscribe();
    return value;
}

export const storageMetaReducer = (reducer: ActionReducer<typeof StoreReducer>): ActionReducer<typeof StoreReducer> => {
    return function (state, action) {
        if (action.type === Actions.reload.preserveState().type && Object.keys(state?.app || {}).length > 0) {
            const filteredState = {
                app: state?.app,
                user: state?.user,
            }
            localStorage.setItem('preserveState', JSON.stringify(filteredState));
        }
        return reducer(state, action);
    }
}

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];

export const localStorageState = JSON.parse(localStorage.getItem('preserveState')!) || {};