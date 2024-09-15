import { describe, it, expect } from 'vitest';
import { SerializerService } from '@/services/serializer';
import { RequestType } from '@/enums/RequestType';
import { RestMethod } from '@/enums/RestMethod';

const GRAPH = {
  formData: {
    url: 'https://api.example.com/graphql',
    sdl: 'type Query { hello: String }',
    query: '{ hello }',
    variables: [{ key: 'var1', value: 'value1' }],
    headers: [{ key: 'Authorization', value: 'Bearer token' }],
  },
  url: '/graphql/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vZ3JhcGhxbA==/eyJxdWVyeSI6InsgaGVsbG8gfSIsInZhcmlhYmxlcyI6eyJ2YXIxIjoidmFsdWUxIn19/dHlwZSBRdWVyeSB7IGhlbGxvOiBTdHJpbmcgfQ==?Authorization=Bearer%20token',
};

const REST = {
  formData: {
    url: 'https://api.example.com/data',
    method: RestMethod.Post,
    body: '{"key":"value"}',
    variables: [{ key: 'var1', value: 'value1' }],
    headers: [{ key: 'Authorization', value: 'Bearer token' }],
  },
  url: '/rest/POST/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vZGF0YQ==/eyJxdWVyeSI6IntcImtleVwiOlwidmFsdWVcIn0iLCJ2YXJpYWJsZXMiOnsidmFyMSI6InZhbHVlMSJ9fQ==?Authorization=Bearer%20token',
};

describe('SerializerService', () => {
  describe('serialize', () => {
    it('should serialize GraphQLFormData correctly', () => {
      const { formData } = GRAPH;
      const result = SerializerService.serialize(RequestType.GraphQL, formData);

      expect(result).toBe(GRAPH.url);
    });

    it('should serialize RestFormData correctly', () => {
      const { formData } = REST;
      const result = SerializerService.serialize(RequestType.Rest, formData);

      expect(result).toBe(REST.url);
    });
  });

  describe('deserialize', () => {
    it('should deserialize GraphQLFormData correctly', () => {
      const params = GRAPH.url.split('?')[0].split('/').slice(2);
      const headers = { Authorization: 'Bearer token' };

      const result = SerializerService.deserialize(
        RequestType.GraphQL,
        params,
        headers,
      );
      expect(result).toEqual({
        formData: GRAPH.formData,
        request: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token',
          },
          body: '{"query":"{ hello }","variables":{"var1":"value1"}}',
        },
      });
    });

    it('should deserialize RestFormData correctly', () => {
      const params = REST.url.split('?')[0].split('/').slice(2);
      const headers = { Authorization: 'Bearer token' };

      const result = SerializerService.deserialize(
        RequestType.Rest,
        params,
        headers,
      );
      expect(result).toEqual({
        formData: REST.formData,
        request: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token',
          },
          body: '{"key":"value"}',
        },
      });
    });

    it('should return null for invalid data', () => {
      const params = ['invalid', 'data'];
      const headers = { Authorization: 'Bearer token' };

      const result = SerializerService.deserialize(
        RequestType.Rest,
        params,
        headers,
      );
      expect(result).toBeNull();
    });
  });
});
