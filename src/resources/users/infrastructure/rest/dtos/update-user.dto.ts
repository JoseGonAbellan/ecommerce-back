import { UserPropierties } from "../../../domain/entities/user.entity";

export type UserUpdateDTO = Omit<UserPropierties, 'userPassword'>;
export type UserUpdatePassDTO = Pick<UserPropierties, 'userPassword' | "userEmail">;

export type UpdatePassInput = {
    oldPassword: string;
    newPassword: string;
    email: string;
}