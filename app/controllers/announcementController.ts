import { Denomination, Prisma } from "@prisma/client"
import { db } from "~/lib/db.server"



export type PaginatedNotifications = Prisma.PromiseReturnType<typeof paginatedNotifications>

export const paginatedNotifications = async (page: string | null, denomination: Denomination) => {

    const count = await db.announcement.count({
        where: {
            category : denomination
    }});
    //console.log(count)
    const data = await db.announcement.findMany({
        where: {
            category : denomination
        },
        skip: page != null ? (parseInt(page) - 1) * 5 : 0,
        take: 5,
        include: {
            creator: {
                select: {
                    name: true,
                    denomination: true,
                    avatar: true,
                   
                    
                }
            }
        },
        orderBy: {
            createdAt : 'desc'
        },
    });

    return {data, count}
}
//orderBy descending
export type PaginatedAnnouncements = Prisma.PromiseReturnType<typeof paginatedAnnouncements>
export const paginatedAnnouncements = async (page: string | null) => {
    //console.log(page)
    const count = await db.announcement.count({
        where: {
            category : 'GENERAL'
    }});
    //console.log(count)
    const data = await db.announcement.findMany({
        where: {
            category : 'GENERAL'
        },
        skip: page != null ? (parseInt(page) - 1) * 5 : 0,
        take: 5,
        include: {
            creator: {
                select: {
                    name: true,
                    denomination: true,
                    avatar: true,
                   
                    
                }
            }
        },
        orderBy: {
            createdAt : 'desc'
        },
    });

    return {data, count}
}