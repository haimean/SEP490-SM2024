/**
 * ! Executing this script will delete all data in your database and seed it with 10 account.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  await seed.account((x) =>
    x(10, () => ({
      user: (x) => x(1),
    }))
  );
  await seed.attributekeybranches((x) =>
    x(5, () => ({
      attributebranches: (x) => x(10),
    }))
  );
  await seed.attributekeycourt((x) => x(10));
  await seed.attributeCourt((x) => x(50));

  await seed.typecourt((x) => x(10));
  await seed.branches((x) =>
    x(10, () => ({
      addressbranch: (x) => x(1),
    }))
  );
  await seed.court((x) => x(50));
  await seed.blog((x) => x(10));
  await seed.comment((x) => x(10));
  await seed.pricetypecourt((x) => x(10));
  await seed.booking((x) => x(10));
  await seed.bookinginfo((x) => x(10));
  await seed.useravailability((x) => x(10));
  await seed.invitation((x) => x(10));
  await seed.post((x) => x(10));
  await seed.memberpost((x) => x(10));
  await seed.review((x) => x(10));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('Database seeded successfully!');

  process.exit();
};

main();
