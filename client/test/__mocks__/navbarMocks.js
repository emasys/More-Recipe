export const props = {
  auth: {
    isLoggedIn: false,
    authInfo: {
      isLoggedIn: false,
      userId: 1,
      username: 'admin'
    },
  },
  getProfile: jest.fn(),
  className: 'bg-dark',
};

export const propsAuth = {
  user: {
    data: {
      avatar: 'http:avatar.com'
    }
  },
  className: 'bg-dark',
  getProfile: jest.fn(),
  signOut: jest.fn(),
  auth: {
    authInfo: {
      isLoggedIn: true,
      userId: 1,
      username: 'admin'
    },
    isLoggedIn: true,
  }
};
