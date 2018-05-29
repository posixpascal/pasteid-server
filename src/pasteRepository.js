import { createConnection, format } from 'mysql';

/**
 * Handle storage and retrival of pastes
 */
class PasteRepository {
  constructor() {
    // Establish mySQL connection
    this.connection = createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });

    this.connection.connect();
  }

  /**
   * Get a paste by ID. This method returns a JSON payload containing
   * { id, content, created_at, updated_at }
   * @param {number} id
   * @returns {Promise}
   */
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

  /**
   * Stores a paste to the database and returns it's ID
   * @param {string} content The paste content you want to store.
   * Can be plaintext, encrypted or any other format.
   * @returns Promise which resolves to a JSON payload containing
   * the inserted ID.
   */
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
