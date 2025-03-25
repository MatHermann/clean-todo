export default {
  string(key: string, defaultValue: string = ""): string {
    return process.env[key] || defaultValue
  },
  int(key: string, defaultValue: number = 0): number {
    return parseInt(this.string(key, String(defaultValue)));
  },
  float(key: string, defaultValue: number = 0): number {
    return parseFloat(this.string(key, String(defaultValue)));
  },
  bool(key: string, defaultValue: boolean = false): boolean {
    const raw = this.string(key, String(defaultValue));
    return raw === "true" || raw === "1";
  },
};
