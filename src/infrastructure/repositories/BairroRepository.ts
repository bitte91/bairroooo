// src/infrastructure/repositories/BairroRepository.ts

export interface IBairroRepository {
  getBairros(): Promise<string[]>;
}

export class BairroRepository implements IBairroRepository {
  async getBairros(): Promise<string[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      'Centro',
      'Jardim das Rosas',
      'Vila Nova',
      'Bonfim',
      'Independência',
      'Gurilândia',
      'Tremembé'
    ];
  }
}

export const bairroRepository = new BairroRepository();
