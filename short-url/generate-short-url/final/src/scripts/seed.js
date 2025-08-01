import URLRecord from '../models/urlRecordModel.js';
import sequelize from '../utils/dbHelper.js';

await URLRecord.sync({ force: true });
await sequelize.close();
