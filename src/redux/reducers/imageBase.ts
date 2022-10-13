import { ActionWithParameter, ImageBaseEventType } from "./../index.d";

/**
 * This is the image base reducer, this reducer is in charge of keeping track of the image link being selected.
 *
 * @param {string|null} action.payload The link of the image to be selected.
 */

const imageBase = (
  state: string | null = null,
  action: ActionWithParameter<string | null, ImageBaseEventType>
): typeof state => {
  switch (action.type) {
    case "SET_IMAGE_LINK":
      return (state = action.payload);

    case "DELETE_IMAGE_LINK":
      return (state = null);

    default:
      return state;
  }
};

export default imageBase;
