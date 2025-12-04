import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-6">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Ops! Algo deu errado.</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Pedimos desculpas, mas encontramos um erro inesperado. Nossa equipe já foi notificada.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-colors"
                >
                    Recarregar Página
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}
