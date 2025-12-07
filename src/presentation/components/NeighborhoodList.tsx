import React, { memo } from 'react';
import * as ReactWindow from 'react-window';
import { useBairroStore } from '@/src/application/stores/useBairroStore';

// Safe import handling without 'any'
interface ReactWindowModule {
  FixedSizeList: typeof ReactWindow.FixedSizeList;
  default?: {
    FixedSizeList: typeof ReactWindow.FixedSizeList;
  };
}

const castedModule = ReactWindow as unknown as ReactWindowModule;
const FixedSizeList = castedModule.FixedSizeList || castedModule.default?.FixedSizeList;

interface NeighborhoodListProps {
  height?: number;
  width?: number | string;
}

const Row = memo(({ index, style, data }: { index: number; style: React.CSSProperties; data: string[] }) => {
  const bairro = data[index];
  // Optimize selector to avoid re-rendering on unrelated updates
  const selectBairro = useBairroStore(state => state.selectBairro);
  const selectedBairro = useBairroStore(state => state.selectedBairro);

  const isSelected = selectedBairro === bairro;

  return (
    <div
      style={style}
      className={`p-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
      onClick={() => selectBairro(bairro)}
    >
      <h3 className={`font-medium ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-gray-100'}`}>
        {bairro}
      </h3>
    </div>
  );
});

export const NeighborhoodList: React.FC<NeighborhoodListProps> = ({ height = 400, width = '100%' }) => {
  const bairros = useBairroStore(state => state.bairros);
  const loading = useBairroStore(state => state.loading);
  const error = useBairroStore(state => state.error);
  const fetchBairros = useBairroStore(state => state.fetchBairros);

  React.useEffect(() => {
    if (bairros.length === 0) {
      fetchBairros();
    }
  }, [bairros.length, fetchBairros]);

  if (loading) {
    return <div className="p-4 text-center">Carregando bairros...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!FixedSizeList) {
      return <div className="p-4 text-red-500">Error loading list component.</div>;
  }

  return (
    <FixedSizeList
      height={height}
      itemCount={bairros.length}
      itemSize={60}
      width={width}
      itemData={bairros}
    >
      {Row}
    </FixedSizeList>
  );
};
