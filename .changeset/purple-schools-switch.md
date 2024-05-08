---
'@openfn/language-surveycto': minor
---

Add a `cursor()` function which adds support for the surveyCTO string format
dates.

The date option in `fetchSubmissions` can now accept a surveyCTO date, an epoch
or unix timestamp, or basically anything you can pass into new Date().

Internally, any date you pass into `cursor` will be converted into a
human-readable surveyCTO format in UTC time.
