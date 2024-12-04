import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = this.repository.create({ name, email, password });
    return this.repository.save(user);
  }

  async findOne(userId: number): Promise<User | null> {
    return this.repository.findOne({ where: { id: userId } });
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      const result = await this.repository.delete(userId);
      if (result.affected === 0) {
        //this.logger.warn(`User with ID ${userId} not found, nothing to delete.`);
        throw new Error(`User with ID ${userId} not found`);
      }
      //this.logger.log(`User with ID ${userId} deleted successfully`);
    } catch (error) {
      //this.logger.error(`Failed to delete user with ID ${userId}:`, error.message);
      throw error; // Lanzar el error si la eliminación falla
    }
  }
}
