// No parameter action type
export interface ActionNoParameter {
  type: string;
}

// Parameter action type
export interface ActionHasParameter extends ActionNoParameter {
  payload: string;
}

// Actions type
export interface Actions {
  login: () => ActionNoParameter;
  logout: () => ActionNoParameter;
  changeUsername: (username: string) => ActionHasParameter;
  manualRedirect: () => ActionNoParameter;
  outputCurrentRoute: () => ActionNoParameter;
  redirectToPage: (target: string) => ActionHasParameter;
  redirectToHome: () => ActionNoParameter;
  clearUsername: () => ActionNoParameter;
}
