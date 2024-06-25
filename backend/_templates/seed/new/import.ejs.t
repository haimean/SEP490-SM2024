---
inject: true
to: seed.ts
before: "  //info: update seed"
---
  await  <%= name %>Seed(10);