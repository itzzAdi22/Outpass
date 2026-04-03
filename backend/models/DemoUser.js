const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

class DemoUser {
  constructor() {
    this.dbPath = path.join(__dirname, '../demo-db.json');
    this.loadData();
  }

  loadData() {
    try {
      const data = fs.readFileSync(this.dbPath, 'utf8');
      this.db = JSON.parse(data);
    } catch (error) {
      this.db = { users: [], outpasses: [] };
    }
  }

  saveData() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.db, null, 2));
  }

  async findOne(query) {
    this.loadData();
    if (query.email) {
      const user = this.db.users.find(u => u.email === query.email);
      return user ? { ...user, select: (field) => field === '+password' ? { ...user, password: user.password } : user } : null;
    }
    return null;
  }

  async findById(id) {
    this.loadData();
    const user = this.db.users.find(u => u._id === id);
    return user || null;
  }

  async create(userData) {
    this.loadData();
    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    this.db.users.push(newUser);
    this.saveData();
    return newUser;
  }

  async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

module.exports = new DemoUser();
