import { GoogleAIFileManager } from '@google/generative-ai/server';
import AIManager from '../../application/providers/ai-manager';

export default class GoogleAIManager implements AIManager {
  async upload(path: string, mime: string): Promise<string> {
    const api_key = process.env.GEMINI_API_KEY || '';

    const file_manager = new GoogleAIFileManager(api_key);
    const upload_response = await file_manager.uploadFile(path, {
      mimeType: mime,
      displayName: 'customer_code',
    });

    return upload_response.file.uri;
  }
}
