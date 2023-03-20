import { resourceGroupPlugin } from './plugin';

describe('resource-group', () => {
  it('should export plugin', () => {
    expect(resourceGroupPlugin).toBeDefined();
  });
});
