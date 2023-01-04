import { HasStatusCode } from '../database/db-helper'
import { TRPCError } from '../trpc'

export const handleErrorWithStatus = (error: HasStatusCode): never => {
  switch (error.status) {
    case 404: {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Resource could not be found',
        cause: error, // optional
      })
    }

    case 400: {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: error.message || 'Unauthorized',
        cause: error, // optional
      })
    }
  }
}
