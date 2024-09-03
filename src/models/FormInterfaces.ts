export interface RequestKeyValuePairsSchema {
  key: string;
  value: string;
}
export interface GraphQLFormData {
  URL: string;
  SDL: string;
  query: string;
  variables: RequestKeyValuePairsSchema[];
  headers: RequestKeyValuePairsSchema[];
}

export interface GraphQLRequestHistoryRecord {
  URL: string;
  SDL: string;
  query: string;
  variables: RequestKeyValuePairsSchema[];
  headers: RequestKeyValuePairsSchema[];
  type: string;
  requestTime: string;
}
