import { PrismaClient } from '@prisma/client';
import { units } from './seeds/units.js';
import { ingredients } from './seeds/ingredients.js';
const prisma = new PrismaClient();

async function main() {
  for (const unit of units) {
    await prisma.unit.upsert({
      where: { id: unit.id },
      update: {},
      create: {
        id: unit.id,
        unit: unit.name,
      },
    });
  }

  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { id: ingredient.id },
      update: {},
      create: {
        id: ingredient.id,
        name: ingredient.name,
        category: ingredient.category,
        unitId: ingredient.unitId,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
