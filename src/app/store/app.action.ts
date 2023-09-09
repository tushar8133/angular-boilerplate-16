import { createActionGroup, props } from "@ngrx/store";

type Alert = {
    type: string;
    message: string;
}

/* APP */
export const app = createActionGroup({
    source: 'APP',
    events: {
        'Info': props<{ payload: object }>(),
        'Alert': props<{ payload: Alert }>(),
        'Display': props<{ payload: object }>(),
        'Routes': props<{ payload: object }>(),
    }
});

/* USER */
export const user = createActionGroup({
    source: 'USER',
    events: {
        'Info': props<{ payload: object }>(),
        'Login': props<{ payload: object }>(),
        'Register': props<{ payload: object }>(),
    }
});

/* RELOAD */
export const reload = createActionGroup({
    source: 'Local Storage',
    events: {
        'Preserve State': props,
    }
});
