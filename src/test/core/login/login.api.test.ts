// Mock the config module synchronously
jest.mock('../../../core/config/api.config', () => ({
  API_BASE_URL: 'https://example.test',
}));

const { loginUser } = require('../../../core/login/login.api');

describe('loginUser', () => {
  it('construye la URL correcta usando API_BASE_URL', () => {
    expect(loginUser()).toBe(
      'https://example.test/api/v1/users/login-without-password'
    );
  });
});
