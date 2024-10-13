export interface HasherAdapter {
  hash(target: string): Promise<string>;
  compareHash(target: string, hash: string): Promise<boolean>;
}
