# Learning trpc patterns

Just another learning repo. Not much to see I'm afraid. A contrived and overly simplified example of
using trpc in a tiny application. [Pocketbase](https://pocketbase.io/) (built on top of SQLLite)
is used as a database for simplicity, but since we have a nodejs backend providing the trpc server
implementation, we won't be using much of the built-in pocketbase functionality.

Using the same tooling as used in the
["minimal example"](https://github.com/trpc/trpc/tree/main/examples/minimal)
of trpc example.

I'm also going to add [React Query](https://react-query-v3.tanstack.com/), to see what contribution
it can make to this trivial trpc stack.

> As usual the code is written for me, on Linux and Mac environments. For Windows users, you'll
> need to figure out parts yourselves I'm afraid or use the Linux subsystem or similar.

## Up and running

### Prerequisites

- docker
- docker-compose

### Installation of dependencies

```
pnpm install
```

### Run the database

```
pnpm run db-start // requires docker-compose
```

### Run the code

```
pnpm run dev
```

This will run the client and the server.