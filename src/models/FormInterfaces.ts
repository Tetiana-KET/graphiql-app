export interface Header {
  key: string;
  value: string;
}
export interface GraphQLFormData {
  URL: string;
  SDL: string;
  query: string;
  variables: Header[];
}
