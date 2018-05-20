import { createConnection, format } from 'mysql';

class PasteRepository {
  constructor() {
    this.connection = createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });

    this.connection.connect();
  }

  async get(id) {
    return new Promise((resolve, reject) => {
      const queryStatement = format(`
            SELECT * FROM pastes WHERE pastes.id = ?
        `, [id]);

      this.connection.query(queryStatement, (err, result) => {
        if (err || result.length === 0) { reject(err); }
        resolve(result[0]);
      });
    });
  }

  async store(content) {
    return new Promise((resolve, reject) => {
      const insertStatement = format(`
            INSERT INTO pastes (content) VALUES (
                ?
            )
        `, [content]);

      this.connection.query(insertStatement, (err, result) => {
        if (err) { reject(err); }
        resolve({ id: result.insertId });
      });
    });
  }
}

export default new PasteRepository();
