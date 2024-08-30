export type UploadOutput = {
  uri: string,
  mime: string,
};

export default interface AIManager {
  upload: (path: string, mime: string) => Promise<UploadOutput>
  generate_content: (image_url: string, mime: string) => Promise<string>
}
