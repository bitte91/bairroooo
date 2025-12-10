# Como Aplicar as Melhorias no Repositório

## Arquivos Novos a Adicionar

Copie os seguintes arquivos para o repositório:

1. `src/shared/components/ui/Skeleton.tsx`
2. `src/shared/components/ui/EmptyState.tsx`

## Arquivos a Substituir

Substitua os seguintes arquivos pelos novos:

3. `src/features/services/CommercePage.tsx`
4. `src/features/news/NewsFeed.tsx`
5. `src/features/events/EventsPage.tsx`
6. `src/features/home/components/HomeDashboard.tsx`
7. `src/shared/components/layout/BottomNav.tsx`

## Comandos Git para Aplicar

```bash
# 1. Certifique-se de estar na branch correta
git checkout main  # ou sua branch de desenvolvimento

# 2. Adicione os novos arquivos
git add src/shared/components/ui/Skeleton.tsx
git add src/shared/components/ui/EmptyState.tsx

# 3. Adicione os arquivos modificados
git add src/features/services/CommercePage.tsx
git add src/features/news/NewsFeed.tsx
git add src/features/events/EventsPage.tsx
git add src/features/home/components/HomeDashboard.tsx
git add src/shared/components/layout/BottomNav.tsx

# 4. Faça o commit
git commit -m "feat: implementa melhorias de UI/UX prioritárias

- Adiciona sistema de skeleton loaders para feedback de carregamento
- Implementa componente EmptyState para estados vazios
- Refatora layout de cards de comércio para vertical com status
- Adiciona feedback visual padronizado em elementos interativos
- Melhora micro-interações com animações suaves"

# 5. Push para o repositório
git push origin main  # ou sua branch
```

## Testar Localmente

Antes de fazer commit, teste a aplicação:

```bash
npm install
npm run dev
```

Verifique:
- ✅ Skeleton loaders aparecem ao carregar páginas
- ✅ Estados vazios funcionam ao buscar sem resultados
- ✅ Cards de comércio têm layout vertical com status
- ✅ Todos os botões têm feedback visual ao clicar
- ✅ Não há erros no console

## Observações

- Todas as mudanças são compatíveis com o código existente
- Não há breaking changes
- Os componentes novos são totalmente reutilizáveis
- O design system foi mantido consistente
