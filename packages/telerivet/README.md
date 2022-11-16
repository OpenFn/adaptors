Language telerivet
==============

Language Pack for sending messages using the [telerivet API](https://telerivet.com/api/rest/curl).

Documentation
-------------

## Sample configuration

```json
{
  "projectId": "telerivet_project_id",
  "apiKey": "telerivetapikey"
}
```

## Send message

#### Current `send` expression:
```js
send(fields(
  field("to_number", dataValue("recipient_number")),
  field("content", dataValue("recipient_text")),
  // Lots of optional parameters...
  field("message_type", "sms"),
  field("route_id", dataValue("some_route"))
))
```

## sendBulk messages - WIP

#### Current `sendBulk` expression:
```js
send(fields(
  field("content", dataValue("recipient_text")),
  field("to_numbers", [
        "+14155550123",
        "+14255550234",
        "+16505550345"
    ]
  // Lots of optional parameters...
  field("message_type", "sms"),
  field("route_id", dataValue("some_route"))
))
```

Note that "recipient_text" may be a concatenation like this:
```js
field("content", function (state) {
          return (
            dataValue("salutation")(state).concat(
              ". ", dataValue("last_name")(state), ", )"
            )
          )
        })
```

Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
