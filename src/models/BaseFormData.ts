export interface RequestKeyValuePairsSchema {
  key: string;
  value: string;
}

export interface BaseFormData {
  variables: RequestKeyValuePairsSchema[];
  headers: RequestKeyValuePairsSchema[];
}
