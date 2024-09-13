import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


async function main() {
    await prisma.user.create({
        data:{
            name: 'montaser',
            password: 'monte@24k',
            email: 'mnoo@gmail.com'
        }
    })
    console.log('seeding completed')
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})