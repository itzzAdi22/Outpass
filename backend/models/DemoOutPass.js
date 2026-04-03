const fs = require('fs');
const path = require('path');

class DemoOutPass {
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

  async create(outPassData) {
    this.loadData();
    const newOutPass = {
      _id: Date.now().toString(),
      ...outPassData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db.outpasses.push(newOutPass);
    this.saveData();
    return newOutPass;
  }

  async find(query) {
    this.loadData();
    let results = [...this.db.outpasses];
    
    if (query.userId) {
      results = results.filter(op => op.userId === query.userId);
    }
    
    return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async findById(id) {
    this.loadData();
    return this.db.outpasses.find(op => op._id === id) || null;
  }

  async findByIdAndUpdate(id, updateData) {
    this.loadData();
    const index = this.db.outpasses.findIndex(op => op._id === id);
    if (index !== -1) {
      this.db.outpasses[index] = { ...this.db.outpasses[index], ...updateData, updatedAt: new Date().toISOString() };
      this.saveData();
      return this.db.outpasses[index];
    }
    return null;
  }

  async populate(outPass) {
    if (!outPass || !outPass.userId) return outPass;
    
    this.loadData();
    const user = this.db.users.find(u => u._id === outPass.userId);
    if (user) {
      return {
        ...outPass,
        userId: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      };
    }
    return outPass;
  }
}

module.exports = new DemoOutPass();
