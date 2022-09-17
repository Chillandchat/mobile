import { ActionWithParameter, ImageBaseEventType } from "./../index.d";

/**
 * This is the image base reducer, this reducer is in charge of keeping track of the image link being selected.
 *
 * @param {string} payload The link of the image to be selected.
 */

const imageBase = (
  state: string | undefined = undefined,
  action: ActionWithParameter<string, ImageBaseEventType>
): typeof state => {
  switch (action.type) {
    case "SET_IMAGE_LINK":
      return (state = action.payload);

    case "DELETE_IMAGE_LINK":
      return (state = undefined);

    default:
      return state;
  }
};

export default imageBase;
