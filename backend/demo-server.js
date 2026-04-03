process.env.USE_DEMO_DATA = 'true';
const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Demo server is running on port ${PORT}`);
  console.log('Admin Login: admin@123 / admin@123');
  console.log('Student Login: student@123 / student@123');
});
