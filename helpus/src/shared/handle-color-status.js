export function handleColorStatus(status, styles) {
  if (status === 'Aberto') return [styles.badgeAberto]
  if (status === 'Em progresso') return [styles.badgeProgresso]
  if (status === 'Atendido') return [styles.badgeAtendido]
}
