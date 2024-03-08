export function isComponent(component: unknown) {
  return (component as any).hasOwnProperty('ɵcmp');
}
