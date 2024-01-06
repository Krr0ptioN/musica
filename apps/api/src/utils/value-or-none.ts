export default function valueOrNone<T>(value: T): T | string {
  return value !== undefined ? value : 'none';
}
