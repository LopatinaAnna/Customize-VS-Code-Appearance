export interface ElementSetting {
  label: string;
  section: string;
  key: string;
  type: 'color' | 'number' | 'string';
  description?: string;
  options?: string[];
  defaultValue?: string | number;
}
