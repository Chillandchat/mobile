import { ActionWithParameter, ScannerResultEventType } from "./../index.d";

const scannerResult = (
  state: string | null = null,
  action: ActionWithParameter<string | null, ScannerResultEventType>
): typeof state => {
  switch (action.type) {
    case "SET_SCANNER_RESULT":
      return (state = action.payload);

    case "DELETE_SCANNER_RESULT":
      return (state = null);

    default:
      return state;
  }
};

export default scannerResult;
