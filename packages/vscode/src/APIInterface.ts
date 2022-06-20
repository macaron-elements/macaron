export interface IWebviewAPI {
  setContent(content: string, url: string | undefined): void;
  getContent(): string;
  updateSavePoint(): void;
  setImageAssets(assets: string[]): void;
}

export interface IExtensionAPI {
  onDirtyChange(isDirty: boolean): void;
  saveImageFiles(
    imageFiles: { name: string; dataURL: string }[]
  ): Promise<string[]>;
}
