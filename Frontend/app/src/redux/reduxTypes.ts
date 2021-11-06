//No parameter action type
export interface ActionNoParameter{
    type: string;
}

//Parameter action type
export interface ActionHasParameter{
    type: string;
    payload: string;
}