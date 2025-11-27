import format from 'pg-format';
/**
 * Safely create dynamic SQL queries. SQL identifiers and literals are escaped to help prevent SQL injection.
 * @public
 * @function
 * @example <caption>Safely escape identifiers and literals</caption>
 * util.format('Hello %s', 'world')
 */
export { format };
