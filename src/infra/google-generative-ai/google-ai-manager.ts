import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import AIManager, { UploadOutput } from '../../application/providers/ai-manager';

export default class GoogleAIManager implements AIManager {
  async upload(path: string, mime: string): Promise<UploadOutput> {
    const api_key = process.env.GEMINI_API_KEY || '';

    const file_manager = new GoogleAIFileManager(api_key);
    const upload_response = await file_manager.uploadFile(path, {
      mimeType: mime,
      displayName: 'customer_code',
    });

    return {
      uri: upload_response.file.uri,
      mime: upload_response.file.mimeType,
    };
  }

  async generate_content(image_url: string, mime: string): Promise<string> {
    const api_key = process.env.GEMINI_API_KEY || '';
    const gen_AI = new GoogleGenerativeAI(api_key);

    const model = gen_AI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });
    try {
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: mime,
            fileUri: image_url,
          },
        },
        { text: 'tell me an integer between 0 and 100' },
      ]);
      return result.response.text();
    } catch (err) {
      return '0';
    }
  }
}
