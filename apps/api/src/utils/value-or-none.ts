export default function valueOrNone(value: any): any | string {
  return value !== undefined ? value : 'none';
}
