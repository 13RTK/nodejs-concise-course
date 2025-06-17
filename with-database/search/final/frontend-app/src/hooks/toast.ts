import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { ToastSeverity } from '../types/ToastSeverity';

export function useToast() {
  const toast = useRef<Toast>(null);

  function showToast(severity: ToastSeverity, summary: string = 'Summary') {
    toast.current?.clear();
    toast.current?.show({
      severity,
      summary,
    });
  }

  return {
    toast,
    showToast,
  };
}
