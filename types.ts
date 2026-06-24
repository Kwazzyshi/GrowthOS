export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  visualType: 'grid' | 'chart' | 'captions' | 'calendar';
}

export interface MarketingMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  history: { date: string; value: number }[];
}

export interface CampaignPost {
  id: string;
  title: string;
  channel: 'Instagram' | 'LinkedIn' | 'Twitter' | 'Facebook';
  date: string;
  status: 'Published' | 'Scheduled' | 'Draft';
  caption: string;
  hashtags: string[];
  imagePrompt?: string;
  metrics?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface FestivalCampaign {
  id: string;
  name: string;
  date: string;
  description: string;
  significance: string;
  themes: string[];
  status: 'Ready' | 'Planned' | 'Draft';
  suggestedHashtags: string[];
}

export interface AISuggestionResponse {
  caption: string;
  hashtags: string[];
  campaignStrategy: string;
  imagePrompt: string;
  calendarTheme: string;
}
