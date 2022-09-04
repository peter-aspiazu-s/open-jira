
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Esta es una descripcion de ejemplo para la aplicacion web OpenJira "pendiente"',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Esta es una descripcion de ejemplo para la aplicacion web OpenJira "en progreso"',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Esta es una descripcion de ejemplo para la aplicacion web OpenJira "finalizado"',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}