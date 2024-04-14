const config = {
  port: process.env.PORT || 8000,
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/module1',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  
};

  
  module.exports = config;