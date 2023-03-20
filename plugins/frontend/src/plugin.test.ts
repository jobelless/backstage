import { frontendPlugin } from './plugin';

describe('frontend', () => {
  it('should export plugin', () => {
    expect(frontendPlugin).toBeDefined();
  });
});
