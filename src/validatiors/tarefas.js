export const validateTaskTitle = (text) => {
  if (!text) return 'Campo obrigatório.';

  if (text.length < 1 || text.length > 1000) return 'O title precisa ter no mínimo 1 e no máximo 1000 caracteres.';

  return undefined;
};
