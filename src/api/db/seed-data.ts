interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio aspernatur',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'En progreso Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio aspernatur',
      status: 'in progress',
      createdAt: Date.now() - 100000,
    },
    {
      description:
        'Terminadas Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio aspernatur',
      status: 'finished',
      createdAt: Date.now() - 200000,
    },
  ],
};
