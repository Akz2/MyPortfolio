const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.project.create({
    data: {
      title: 'E-Plant',
      description: 'A React-based plant shopping web application with a clean product browsing experience and GitHub Pages deployment.',
      techStack: ['React', 'Vite', 'JavaScript', 'CSS'],
      liveUrl: 'https://akz2.github.io/e-plantShopping/',
      githubUrl: 'https://github.com/akz2/e-plantShopping',
      isFeatured: true,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Express Book Reviews',
      description: 'A RESTful API for managing book reviews built with Express.js and Node.js, featuring JWT authentication and session management.',
      techStack: ['Node.js', 'Express', 'JavaScript', 'JWT'],
      liveUrl: null,
      githubUrl: 'https://github.com/Akz2/expressBookReviews',
      isFeatured: true,
    },
  });

  await prisma.asset.upsert({
    where: { assetName: 'resume_2026' },
    update: {
      fileUrl: 'https://drive.google.com/file/d/19jfvmPj1_XXCdJ79QppHlCGm2gwc9V8S/view?usp=drive_link',
    },
    create: {
      assetName: 'resume_2026',
      fileUrl: 'https://drive.google.com/file/d/19jfvmPj1_XXCdJ79QppHlCGm2gwc9V8S/view?usp=drive_link',
    },
  });

  console.log('Seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });