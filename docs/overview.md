Overview of adaptors and how they work

key concepts - explain the words job, expression, workflow etc

## Jobs

A job is a unit of work, expressed via Javascript-like

We sometimes use the word "expression" when referring to a job. Technically, the code written by end users (and executed by the OpenFn runtime) is the _expression_. A job is an expression plus a bunch of metadata about it, like which adaptor to use, what initial state to pass in, what options to use during execution.

But mostly the terms are interchangable.

An expression can be compiled or uncompiled.

## DSL

OpenFn code does not use Javascript.

It actually uses a Javascript-like DSL (Domain Specific Language). This needs to be compiled into executable Javascript.

The major differences between openfn code and Javascript are:
* The top level functions in the code are executed synchronously (in sequence), even if they contain asynchronous code
* OpenFn code does not contain import statements (although technically it can). These are compiled in.

## Operations

Users write openfn code by composing operations into a sequence of commands.

Adaptors export operations - basically helper functions - to users.

### Operations vs functions

While an operation is of course a Javascript function, there are several differences between operationns and regular javascript functions.

* An operation is a function that returns a function which in turn takes and returns a state object.
* The operations declared in an adaptor are _factories_ which return state-handling functions.
* Operations can be invoked at the top level of job code
* To call an operation within another function in job code, it has to be wrapped with state, ie `myOp(options)(state)`. We consider this to be an antipattern in job code - but it is occasionally neccessary

In short, an operation is a function designed to run in an openfn job and handle state.