import { useState, useRef, createRef, RefObject, useEffect, useCallback } from "react";

type ValidationFn = (value: any) => boolean;

interface Validation {
  pattern: ValidationFn;
  errorMessage: string;
}

interface RegisterArgs {
  validations: Validation[];
}

type SubmitHandler<FieldValues extends any = any> = (
  data: FieldValues,
) => any | Promise<any>;

const useForm = () => {
  const elementRefs = useRef<Record<string, RefObject<HTMLInputElement>>>({});
  const validationsRef = useRef<Record<string, Validation[]>>({})
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAllValid, setIsAllValid] = useState(false);

  const _isAllValid = useCallback(() => {
    const isAllValid = Object.entries(elementRefs.current).every(([refName, elRef]) => _isValid(refName, elRef.current?.value));
    setIsAllValid(isAllValid);
  }, [])

  useEffect(() => {
    _isAllValid();
  }, [_isAllValid]);

  const _isValid = (refName: string, value: any) => validationsRef.current[refName].every(validation => validation.pattern(value));

  const register = (refName: string, { validations}: RegisterArgs) => {
    elementRefs.current[refName] = elementRefs.current[refName] || createRef();
    validationsRef.current[refName] = validations;

    return {
      ref: elementRefs.current[refName],
      onBlur(e: React.FocusEvent<HTMLInputElement>) {
        for (const validation of validationsRef.current[refName]) {
          if (!validation.pattern(e.target.value)) {
            setErrors({ ...errors, [refName]: validation.errorMessage });
          }
        }        
      },
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (errors[refName] && _isValid(refName, e.target.value)) {
          setErrors({ ...errors, [refName]: '' });
        }
        _isAllValid();
      }
    }
  }

  const setError = (refName: string, errorMessage: string) => {
    setErrors({ ...errors, [refName]: errorMessage });
  }

  const handleSubmit = (callback: SubmitHandler) => async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const params = Object.entries(elementRefs.current).reduce((acml, [key, value]) => ({ ...acml, [key]: value?.current?.value }), {});
      callback(params);
    };

  return { 
    register,
    errors,    
    handleSubmit,
    isAllValid,
    setError,
  }
}

export default useForm;