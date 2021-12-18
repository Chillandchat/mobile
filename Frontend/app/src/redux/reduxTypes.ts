//No parameter action type
export interface ActionNoParameter {
  type: string;
}

//Parameter action type
export interface ActionHasParameter extends ActionNoParameter {
  payload: string;
}
