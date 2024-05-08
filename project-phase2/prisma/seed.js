import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const customersPath = path.join(process.cwd(), 'app/data/customers.json')
const sellersPath = path.join(process.cwd(), 'app/data/sellers.json')
const artworksPath = path.join(process.cwd(), 'app/data/artworks.json')
const bankAccountsPath = path.join(process.cwd(), 'app/data/bankaccounts.json')
const purchasesPath = path.join(process.cwd(), 'app/data/purchases.json')
const shippingAddressesPath = path.join(process.cwd(), 'app/data/shippingaddresses.json')
const adminsPath = path.join(process.cwd(), 'app/data/admins.json')
const imagesPath = path.join(process.cwd(), 'app/data/images.json')




async function main() {
    try {
        const customers = await fs.readJSON(customersPath)
        const sellers = await fs.readJSON(sellersPath)
        const artworks = await fs.readJSON(artworksPath)
        const bankAccounts = await fs.readJSON(bankAccountsPath)
        const purchases = await fs.readJSON(purchasesPath)
        const shippingAddresses = await fs.readJSON(shippingAddressesPath)
        const admins = await fs.readJSON(adminsPath)
        const images = await fs.readJSON(imagesPath)

        for (const customer of customers) await prisma.customer.create({ data: customer })
        for (const seller of sellers) await prisma.seller.create({ data: seller })
        for (const artwork of artworks) await prisma.artwork.create({ data: artwork })
        for (const bankAccount of bankAccounts) await prisma.bankAccount.create({ data: bankAccount })
        for (const purchase of purchases) await prisma.purchase.create({ data: purchase })
        for (const shippingAddress of shippingAddresses) await prisma.shippingAddress.create({ data: shippingAddress })
        for (const admin of admins) await prisma.admin.create({ data: admin })
        for (const image of images) await prisma.image.create({ data: image })

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
