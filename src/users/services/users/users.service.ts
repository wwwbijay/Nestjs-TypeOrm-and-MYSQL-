import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) { }

    findUsers() {
        return this.userRepository.find({ relations: ['profile'] });
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({ ...userDetails });
        return this.userRepository.save(newUser);
    }

    updateUser(id: number, userDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...userDetails });
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }

    async createUserProfile(id: number, profileDetails: CreateUserProfileParams) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user)
            throw new HttpException('User not found. Cannot create profile.', HttpStatus.BAD_REQUEST);
        const newProfile = this.profileRepository.create(profileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);

        user.profile = savedProfile;
        return this.userRepository.save(user);
    }

}
