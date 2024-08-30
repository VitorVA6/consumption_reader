export default interface AIManager {
  upload: (path: string, mime: string) => Promise<string>
}
