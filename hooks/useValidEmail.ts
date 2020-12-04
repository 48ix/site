import { useCallback } from 'react';
import * as emailValidator from 'email-validator';

export function useValidEmail(...deps: any[]) {
  function validate(email: string) {
    return emailValidator.validate(email);
  }
  return useCallback(validate, deps);
}
