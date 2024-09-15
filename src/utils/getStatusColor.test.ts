import { HttpStatusCode } from '@/enums/HttpStatusCode';
import { describe, expect, it } from 'vitest';
import { getStatusColor } from './getStatusColor';

describe('getStatusColor util', () => {
  it('should return "default" when status is not provided', () => {
    expect(getStatusColor(null)).toBe('default');
  });

  it('should return "primary" when status is less than 200', () => {
    const statusCode = 150;
    expect(getStatusColor(statusCode)).toBe('primary');
  });

  it('should return "success" when status is 200', () => {
    expect(getStatusColor(HttpStatusCode.OK)).toBe('success');
  });

  it('should return "warning" when status is 300', () => {
    expect(getStatusColor(HttpStatusCode.MultipleChoices)).toBe('warning');
  });

  it('should return "danger" when status is between 400', () => {
    expect(getStatusColor(HttpStatusCode.BadRequest)).toBe('danger');
  });

  it('should return "secondary" when status is 500 or greater', () => {
    expect(getStatusColor(HttpStatusCode.InternalServerError)).toBe(
      'secondary',
    );
  });
});
