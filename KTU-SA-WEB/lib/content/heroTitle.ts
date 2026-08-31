export function resolveHeroDisplayTitle(
  cmsTitle: string,
  socialHelpLabel: string,
  emotionalHelpLabel: string,
): string {
  return cmsTitle.trim().toLowerCase() === socialHelpLabel.trim().toLowerCase()
    ? emotionalHelpLabel
    : cmsTitle;
}
