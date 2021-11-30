import { User } from "./user.model";

export interface Topic{
    id: number,
    name: string,
    description: string,
    image: string,
    creator: User,
    createdAt: Date,
    updatedAt: Date,
    subscribedUsers: Array<User>
}