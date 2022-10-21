# Microsoft SQL server in Docker

Some helpful scripts and configurations to easily get a Microsoft SQL server
instance running in a docker container on Linux.

This project uses Microsoft's docker image for SQL server and uses
docker-compose to easily manage container configurations.

## Requirements

- Linux operating system
- Docker
- Docker composer

## Usage

- Configure password in `docker-compose.yml` file.
- Start the container (`docker-compose up -d`)
- After the installation is done you can test the database in docker cli by run the command below
  `/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "yourStrong(!)Password"`

To stop the container, use the `docker-compose stop` script.

Log in on the database with your credentials:

- User: `SA`
- Password: `yourStrong(!)Password` (default)

## License

This project is released under the GNU GPL-3.0 license. Check out the [LICENSE](LICENSE) file for more information.
