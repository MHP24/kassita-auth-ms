export interface IdGeneratorAdapter {
  generateId(prefix?: string): string;
}
