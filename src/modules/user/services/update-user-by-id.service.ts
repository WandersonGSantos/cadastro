import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.sto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number, data: UpdateUserDto) {
    const userExists = await this.userRepository.findOneById(id);

    if (!userExists) {
      return {
        codigo: 400,
        status: 'Falha',
        mensagem: 'Usuario não encontrado',
      };
    }

    if (data.email) {
      const emailAlreadyExists = await this.userRepository.findUserByEmail(
        data.email,
      );

      if (emailAlreadyExists) {
        return {
          codigo: 400,
          status: 'Falha',
          mensagem: 'Email já cadastrado',
        };
      }
    }

    const updatedUser = await this.userRepository.updateUserById(id, data);

    return {
      codigo: 200,
      status: 'Sucesso',
      mensagem: 'Usuario atualizado com sucesso',
      data: updatedUser,
    };
  }
}
