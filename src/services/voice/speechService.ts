import { Language } from '../../types';

export interface SpeechCallbacks {
  onStart?: () => void;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export const SAMPLE_VOICE_PROMPTS: { language: Language; prompt: string; label: string }[] = [
  { language: 'te', prompt: '2000 లోపు పట్టు చీరలు చూపించు', label: 'Telugu: "2000 లోపు పట్టు చీరలు"' },
  { language: 'hi', prompt: '1500 के अंदर कॉटन कुर्ती दिखाओ', label: 'Hindi: "1500 के अंदर कॉटन कुर्ती"' },
  { language: 'ta', prompt: 'பட்டு புடவை கல்யாணத்திற்கு 3000 கீழே', label: 'Tamil: "பட்டு புடவை கல்யாணத்திற்கு"' },
  { language: 'en', prompt: 'Pacha color silk saree for wedding under 2500', label: 'Teluglish: "Pacha color silk saree"' },
  { language: 'hi', prompt: 'Bandhani yellow kurti under 1000 for diwali', label: 'Hinglish: "Bandhani yellow kurti"' }
];

export function getLanguageSpeechCode(lang: Language): string {
  switch (lang) {
    case 'te': return 'te-IN';
    case 'hi': return 'hi-IN';
    case 'ta': return 'ta-IN';
    case 'en': default: return 'en-IN';
  }
}

export class SpeechRecognitionService {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    const SpeechRecognitionWindow =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionWindow) {
      this.recognition = new SpeechRecognitionWindow();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
    }
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }

  public startListening(language: Language, callbacks: SpeechCallbacks) {
    if (!this.recognition) {
      if (callbacks.onError) {
        callbacks.onError('Web Speech API is not supported in this browser environment. Use simulation chips below!');
      }
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.recognition.lang = getLanguageSpeechCode(language);

    this.recognition.onstart = () => {
      this.isListening = true;
      if (callbacks.onStart) callbacks.onStart();
    };

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const text = finalTranscript || interimTranscript;
      if (callbacks.onResult) {
        callbacks.onResult(text, !!finalTranscript);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      if (callbacks.onError) callbacks.onError(event.error || 'Speech recognition error');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (callbacks.onEnd) callbacks.onEnd();
    };

    try {
      this.recognition.start();
    } catch (e: any) {
      if (callbacks.onError) callbacks.onError(e.message || 'Failed to start recognition');
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechRecognitionService();
