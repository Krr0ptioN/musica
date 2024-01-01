## Development

### Development

To execute API use the following command:

```sh
nx serve api
```

You can also run frontend by:

```sh
nx serve frontend
```

### Testing

You can unit test by

```sh
nx test -p api frontend
```

And to integration test API:

```sh
nx e2e api-e2e
```

E2E test app:

```sh
nx e2e frontend-e2e
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).
