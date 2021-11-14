import { Address } from "./address.model";
import { Topic } from "./topic.model";
import { User } from "./user.model";

export interface EventModel {
    id: number,
    name: string,
    description: string,
    image: string,
    date: Date,
    topic: Topic,
    address: Address,
    addressId: number,
    createdAt: Date,
    updatedAt: Date,
    creator: User,
    participants: Array<User>,
    limitedToTeam: boolean,
    limitedToDepartment: boolean
}
