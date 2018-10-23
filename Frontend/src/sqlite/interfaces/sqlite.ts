import {SQLiteObject} from "@ionic-native/sqlite";

export interface Sqlite {
  createDatabase();
  createTable(db: SQLiteObject);
  drop();
  insert(values: string[]);
  update();
  delete();
  select();
}
