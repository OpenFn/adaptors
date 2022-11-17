import chai from 'chai';
const { expect } = chai;

import Adaptor from '../src';
const { createEntity, query, updateEntity, deleteEntity } = Adaptor;

describe.skip('CRUD Test', () => {
  let id = '';

  let state = {
    configuration: {
      resource: 'https://openfn.crm2.dynamics.com',
      apiVersion: '8.2.0',
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjlGWERwYmZNRlQyU3ZRdVhoODQ2WVR3RUlCdyIsImtpZCI6IjlGWERwYmZNRlQyU3ZRdVhoODQ2WVR3RUlCdyJ9.eyJhdWQiOiJodHRwczovL29wZW5mbi5jcm0yLmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzdmZmIwMGIxLWE3NjQtNGJiMS05NDFkLWI5ZmQwMzczZDk4Yy8iLCJpYXQiOjE0OTc5OTM2OTAsIm5iZiI6MTQ5Nzk5MzY5MCwiZXhwIjoxNDk3OTk3NTkwLCJhY3IiOiIxIiwiYWlvIjoiWTJaZ1lCRHJPYUVoOFA1TjdjcXN6S24zRlZZV1gxM29rTDA3U055Z2RJSHd4dVpLWlRZQSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiJiMmM0ZjA3Yi1iOTk1LTQyYWItYWNlZC0yZGUyZDg0OTljYWQiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6Ikd1dGllcnJleiIsImdpdmVuX25hbWUiOiJTYW50aWFnbyIsImlwYWRkciI6IjIwMC41NC4xMDkuMTciLCJuYW1lIjoiU2FudGlhZ28gR3V0aWVycmV6Iiwib2lkIjoiYTkxZGI3OGQtYTkyYy00ODRkLTkxMTAtYTI4ODRiMGVmZjhmIiwicGxhdGYiOiIxNCIsInB1aWQiOiIxMDAzQkZGREExRjQ2QjZEIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiZ3p4WEFGSGFJTnNQWUMxWWZfTzFKcnVqTE9wdzJFVUJ6VmotRDFxeXBxZyIsInRpZCI6IjdmZmIwMGIxLWE3NjQtNGJiMS05NDFkLWI5ZmQwMzczZDk4YyIsInVuaXF1ZV9uYW1lIjoic2FudGlhZ29Ab3BlbmZuLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6InNhbnRpYWdvQG9wZW5mbi5vbm1pY3Jvc29mdC5jb20iLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCJdfQ.h5cjiVcjY4l1MdieExmOcvoXc3yniuhg9_Yg3tvpR5pKOLyyHfvwn3_IYkxbaBtALF-ZjflmQMxX2lXuQR74EoScO2JTSj_kgMtbMVp8ImlCr3olQqFuAeCWXhNvAogOA0nfl1xrVifufkWojOUFkQ6v26uMg2jv03PoXCE5uejWgc4PJMVHJczaFyhqCgMWp-7Fnzu2LQZ6oLzT_Req85Qg5q9pzkv553fRUMaFsnEW-pLjr9M7hq_IgxCHUNfVSNBdK9OmVa5BsansrhgyvOPIVzlR5sjFuzU9Rh60elmh9VPp7ILmpbLAB4EHx8GNQ94i_zp5k5WLK9KtlYyZ-A',
    },
  };

  it('creates an account entity in dynamics', done => {
    setTimeout(done, 15000);

    const params = {
      entityName: 'contacts',
      body: {
        firstname: 'Wilder',
        lastname: 'Jimenez',
        description: 'This is a test for createEntity',
        birthdate: '1989-10-11',
      },
    };

    return createEntity(params)(state)
      .then(nextState => {
        expect(nextState.response.statusCode).to.eql(204);
      })
      .then(done)
      .catch(done);
  });

  it('simple query in dynamics', done => {
    setTimeout(done, 15000);

    const params = {
      entityName: 'contacts',
      query: {
        fields: ['fullname', 'birthdate', 'contactid'],
        limit: 1,
        orderBy: {
          field: 'lastname',
          direction: 'asc',
        },
        filter: "firstname eq 'Wilder'",
      },
    };

    return query(params)(state)
      .then(nextState => {
        const resp = JSON.parse(nextState.response.body);
        id = resp.value[0].contactid;
        expect(nextState.response.statusCode).to.eql(200);
      })
      .then(done)
      .catch(done);
  });

  it('updates an entity in dynamics', done => {
    setTimeout(done, 15000);

    const params = {
      entityName: 'contacts',
      entityId: id,
      body: {
        firstname: 'Wilder David',
        lastname: 'Jimenez Silva',
        description: 'This is a test for updateEntity',
      },
    };

    return updateEntity(params)(state)
      .then(nextState => {
        expect(nextState.response.statusCode).to.eql(204);
      })
      .then(done)
      .catch(done);
  });

  it('deletes an entity in dynamics', done => {
    setTimeout(done, 15000);

    const params = {
      entityName: 'contacts',
      entityId: id,
    };

    return deleteEntity(params)(state)
      .then(nextState => {
        expect(nextState.response.statusCode).to.eql(204);
      })
      .then(done)
      .catch(done);
  });
});
