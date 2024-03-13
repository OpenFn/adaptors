style guide and best practice notes

## Code Style

* Use `camelCase` in variable and parameter names. This helps keep adaptors consistent.
* Try to avoid exposing the underlying implementation.
* * For example, if wrapping a function and the function exposes an options object, it's usually better to define your own options object and map it.
* * This lets us provide our own documention, enforce camelCase conventions (particularly when wrapping web services), and insulates us from changes in the underlying implementation.
* * It can also simplify an API to just expose options an end-user needs. For example we'd expect than an adaptor should deal with pagination automagically, so exporting page options is probably unhelpful
* * This isn't _always_ possible or sensible, particularly for large APIs, but should be considered.

## Documentation

All operations should be well documented in JSdoc annotations.

It is usually best not to link to the underlying implementation's documentation - their context, requirements and expectations are very different to ours, and it may confuse our users. Better to keep users on our own docsite, with consistent style and navigation. 

## API Design

A successful adaptor should have a clean, re-usable and easy to understand API design.

There are two schools of thought for adaptor API design [and frankly we haven't quite settled on an answer yet].

1) An adaptor is a one-for-one wrapper around some backing web service or library. For each endpoint/function in the service, there should be an operation, with the same name, in the adaptor.
2) An adaptor is a high-level, user friendly, opinionated wrapper around a web service or library. It is not a mapping, but a high level abstraction.

The approach you take my depend on your experience, and that of your users. If you know your users are experts in a particular rest interface, it probably makes sense just to expose that interface in an openfn-y way (so, a 1:1 mapping).

On the other hand, if an API is particularly complex or heavy in boilerplate, it probably makes sense to provide some user-friendly, high level abstractions.

A good approach is probably to do a little of both. Provide low-level helper functions to  give access to the underlying implementaton (wrapping the `request` function is often the first step to a successful adaptor!), but then creating opinionated helper functions with specific tasks in mind.

Also, when creating/editing adaptors, it's often best to have a goal in mind. Don't try and wrap an entire implementation - just do the bits you need for the job you (or your users) have in mind.