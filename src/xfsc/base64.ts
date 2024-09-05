export default function encodeBase64(str: string): string {
  const buffer = Buffer.from(str, 'utf-8');
  return buffer.toString('base64');
}
