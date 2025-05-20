export function getConfig(configName: string): string {
  return import.meta.env[`VITE_${configName}`];
}
