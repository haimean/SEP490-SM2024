---
inject: true
to: seed.ts
before: "seedData = async"
---

import { <%= name %>Seed } from './seed/<%= name %>Seed';
