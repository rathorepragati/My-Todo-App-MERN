module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', 
    
    testEnvironment: 'jsdom', 
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy', 
    },
  };
  