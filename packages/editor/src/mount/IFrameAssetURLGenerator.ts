export class IFrameAssetURLGenerator {
  get(url: string): string | undefined {
    return this.urls.get(url);
  }

  private readonly urls = new Map<string, string>();
  private readonly pending = new Map<string, Promise<string>>();

  async generate(src: string): Promise<string> {
    if (!src.startsWith("https://file%2B.vscode-resource.vscode-cdn.net/")) {
      return src;
    }

    const cached = this.urls.get(src);
    if (cached) {
      return cached;
    }
    const pending = this.pending.get(src);
    if (pending) {
      return pending;
    }

    const promise = (async () => {
      const response = await fetch(src);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      this.urls.set(src, url);
      this.pending.delete(src);
      return url;
    })();

    this.pending.set(src, promise);
    return promise;
  }
}
