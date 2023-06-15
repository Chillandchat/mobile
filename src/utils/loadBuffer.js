// @ts-check
import { Buffer } from "buffer";

/**
 * This function loads the buffer to the global scope.
 * Used for environments where react native does not support buffers
 *
 * @note This function does not require any arguments or return anything.
 */

export const loadBuffer = () => (global.Buffer = Buffer);
