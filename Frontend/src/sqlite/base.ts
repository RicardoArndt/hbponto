import {Sqlite} from "./interfaces/sqlite";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

export class ConfigSQLite {
  dbname: string;
  location: string;
  table: string;
}

export abstract class BaseSQLite implements Sqlite {

  protected configs: ConfigSQLite = new ConfigSQLite();
  protected params: string[];

  constructor(protected _sqlite: SQLite) { }

  getDB() {
    return this._sqlite.create({name: this.configs.dbname, location: this.configs.location});
  }

  createDatabase(): Promise<any> {
    return this.getDB().then((db: SQLiteObject) => {
      this.createTable(db);
    }).catch(err => {
      console.log(err);
    });
  }

  createTable(db: SQLiteObject) {
    db.executeSql(`CREATE TABLE ${this.configs.table} (${this.params.toString()})`)
      .then(() => {
        console.log('Executed SQL');
        return db;
      })
      .catch(e => {
        console.log(e);
      });
  }

  drop() {
    this.getDB().then((db: SQLiteObject) => {
      db.executeSql(`DROP TABLE ${this.configs.table}`);
    });
  }

  update() {

  }

  delete() {

  }

  insert(values: string[]) {
    this.getDB().then((db: SQLiteObject) => {
      db.transaction((t) => {
          t.executeSql(`INSERT INTO ${this.configs.table} VALUES (${values.toString()})`)
        }).then(() => console.log("Populated database OK"))
          .catch((err) => console.log(err));
    }).catch(err => console.log(err));
  }

  select() {
    return this.getDB().then((db: SQLiteObject) => {
      db.transaction((t) => {
        t.executeSql(`SELECT * FROM ${this.configs.table}`)
      }).then((x) => x)
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
}
