export interface HasStatusCode extends Error {
  status: 404 | 400
}

/**
 * Pocketbase responds with http status codes.
 */
export const hasStatusCode = (err: unknown): err is HasStatusCode =>
  typeof (err as Partial<HasStatusCode>)?.status === 'number'
