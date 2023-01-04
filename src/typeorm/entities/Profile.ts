import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'profiles' })
export class Profile {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column()
    age: number
    @Column()
    dob: string;
}