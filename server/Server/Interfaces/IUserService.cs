using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dto;
using Server.Models;

namespace Server.Interfaces
{
    public interface IUserService
    {
        TokenDto Login(UserDto dto);
        List<CreateUserDto> GetAllUsers();
        CreateUserDto GetByEmail(string email);
        void CreateUser(CreateUserDto newUser);
        void UpdateUser(string email,CreateUserDto updatedUser);
        List<User> GetDelivery();
        void Verify(string email,int decision);
    }
}
