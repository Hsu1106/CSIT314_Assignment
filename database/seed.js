// Seed script: creates a default admin account.
// Later: extend this to generate >= 100 random records per data type.
const { createDatabase } = require('./db');
const UserAccount = require('../backend/entity/UserAccount');

const db = createDatabase();
const userAccount = new UserAccount(db);

if (!userAccount.findByUsername('admin')) {
  const adminProfile = db.prepare("SELECT id FROM user_profile WHERE name = 'User Admin'").get();
  userAccount.createUserAccount({
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    profileId: adminProfile.id,
  });
  console.log('Created default account  admin / admin123');
} else {
  console.log('Default admin account already exists');
}
db.close();
