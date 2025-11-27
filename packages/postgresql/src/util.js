import format from 'pg-format';
/**
 * Safely create dynamic SQL queries. SQL identifiers and literals are escaped to help prevent SQL injection.
 * @public
 * @function
 * @example <caption>Safely escape identifiers and literals</caption>
 * const sql = util.format('SELECT * FROM %I WHERE my_col = %L %s', 'my_table', 34, 'LIMIT 10');
 * console.log(sql); // SELECT * FROM my_table WHERE my_col = '34' LIMIT 10
 * @example <caption>Support nested arrays parameters</caption>
 * const sql = util.format('INSERT INTO t (name, age) VALUES %L', [['a', 1], ['b', 2]]);
 * console.log(sql); // INSERT INTO t (name, age) VALUES ('a', '1'), ('b', '2')
 * @example <caption>Support arrays and objects as parameters</caption>
 * const sql = util.format('SELECT * FROM t WHERE c1 IN (%L) AND c2 = %L', [1,2,3], {a:1,b:2});
 * console.log(sql); // SELECT * FROM t WHERE c1 IN ('1','2','3') AND c2 = '{"a":1,"b":2}'
 */
export { format };
