import { useState, useCallback } from "react";

// ----------------------------------------------------------------------

export interface BooleanReturnType {
  data?: any;
  value: boolean;
  onTrue: (data?: any) => void;
  onFalse: () => void;
  onToggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useBoolean(defaultValue?: boolean): BooleanReturnType {
  const [value, setValue] = useState(!!defaultValue);
  const [data, setData] = useState<any>();

  const onTrue = useCallback((i: any) => {
    setData(i);
    setValue(true);
  }, []);

  const onFalse = useCallback(() => {
    setData(undefined);
    setValue(false);
  }, []);

  const onToggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return {
    value,
    data,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  };
}
