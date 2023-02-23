using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Server.Dto;
using Server.Interfaces;
using Server.Models;
using Server.Infrastructure;

namespace Server.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly DeliveryDbContext _dbContext;
        public UserService(IMapper mapper, IConfiguration config, DeliveryDbContext dbContext)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _dbContext = dbContext;
        }

        public static List<User> users = new List<User>() 
        {
            new User
            {
                Email = "u",
                Name = "User",
                Type = UserType.USER,
                LastName = "Glavas",
                Password = "$2a$11$L.fb./NAUzUTNLGFJiv8quleGSjDb.30RCG2BKYjxp6GNtGIT5/ji" //1234
            },
              new User
            {
                Email = "d",
                Name = "Delivery",
                Type = UserType.DELIVERY,
                LastName = "Radojcic",
                Password = "$2a$11$L.fb./NAUzUTNLGFJiv8quleGSjDb.30RCG2BKYjxp6GNtGIT5/ji" //1234
            },
                new User
            {
                Email = "a",
                Name = "Admin",
                Type = UserType.ADMIN,
                LastName = "Glavas",
                Password = "$2a$11$L.fb./NAUzUTNLGFJiv8quleGSjDb.30RCG2BKYjxp6GNtGIT5/ji" //1234
            }
        };


        public TokenDto Login(UserDto dto)
        {
            //User user = users.First(x => x.Email == dto.Email);
            User user =_dbContext.Users.Find(dto.Email);
            if (user == null)
                return null;

            if(BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                List<Claim> claims = new List<Claim>();
                if (user.Type == UserType.DELIVERY)
                {
                    if (user.Verification != ProcessStatus.ACCEPTED) { return null; }
                    claims.Add(new Claim(ClaimTypes.Role, "delivery"));
                }         
                if (user.Type == UserType.ADMIN)
                    claims.Add(new Claim(ClaimTypes.Role, "admin")); 
                            
                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:44398", //url servera koji je izdao token
                    claims: claims, //claimovi
                    expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                    signingCredentials: signinCredentials //kredencijali za potpis
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return new TokenDto { Token = tokenString };
            }
            else
            {
                return null;
            }
        }

        public List<CreateUserDto> GetAllUsers()
        {
            return _mapper.Map<List<CreateUserDto>>(_dbContext.Users.ToList());
            // return _mapper.Map<List<CreateUserDto>>(users);
        }

        public CreateUserDto GetByEmail(string Email)
        {
            return _mapper.Map<CreateUserDto>(_dbContext.Users.Find(Email));
            // return _mapper.Map<CreateUserDto>(users.First(x => x.Email == Email));
        }

        public void CreateUser(CreateUserDto newUser)
        {
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            User u = _mapper.Map<User>(newUser);u.Id = newUser.Email; u.Verification = ProcessStatus.PROCESSING;
            if (!u.Validate()) { return; }
            _dbContext.Users.Add(u);
            _dbContext.SaveChanges();

            //return _mapper.Map<StudentDto>(newStud);
            /* newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
             users.Add(_mapper.Map<User>(newUser));*/
        }
        public void UpdateUser(string Email,CreateUserDto updatedUser)
        {
            updatedUser.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);

            User o = _dbContext.Users.Find(Email);
            User u = _mapper.Map<User>(updatedUser);
            if (!u.Validate()) { return; }
            o.Update(u);
            _dbContext.SaveChanges();
            /*
            updatedUser.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
            User o=users.First(x => x.Email == Email);
            User u = _mapper.Map<User>(updatedUser);
            o.Update(u);*/
        }

        public List<User> GetDelivery()
        {
            List<User> gd = _dbContext.Users.ToList();
            List<User> r=new List<User>( gd.Where(x => x.Type == UserType.DELIVERY));
            return r;
        }

        public void Verify(string email,int decision)
        {
            User u = _dbContext.Users.Find(email);
            if (decision != 0) { u.Verification = ProcessStatus.ACCEPTED; }
            else { u.Verification = ProcessStatus.REJECTED; }
            _dbContext.SaveChanges();
        }

        
    }
}
