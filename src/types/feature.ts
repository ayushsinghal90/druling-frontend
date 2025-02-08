export interface Feature {
    id?: string;
    type: string;
    description?: string;
    limit: number;
    is_active: boolean;
  }
  

export interface ProfileFeature {
    id?: string;
    type: string;
    usage: number;
    limit: number;
    is_active: boolean;
  }
  