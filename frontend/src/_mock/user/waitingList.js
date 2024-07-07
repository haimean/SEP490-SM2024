import { sample } from "lodash";
import { faker } from "@faker-js/faker";

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  title: sample([
    "Software Engineerkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
    "Product Manager",
    "Marketing Specialist",
    "Sales Executive",
    "Customer Support",
    "Designer",
    "Content Writer",
    "HR Specialist",
  ]),
  level: sample(["Yếu", "Trung bình", "Khá"]),
  friendliness: faker.datatype.number({ min: 1, max: 5 }),
}));
