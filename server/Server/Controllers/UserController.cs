using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dto;
using Server.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Post([FromBody] UserDto dto)
        {
            return Ok(_userService.Login(dto));
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUserDto dto)
        {
            _userService.CreateUser(dto);
            return Ok();
        }
        [HttpPut("{email}")]
        public IActionResult Update(string email,[FromBody] CreateUserDto dto)
        {
            _userService.UpdateUser(email,dto);
            return Ok();
        }


        [HttpGet("all")]
        [Authorize]
        public IActionResult GetAll()
        {
            return Ok(_userService.GetAllUsers());
        }


        [HttpGet("{email}")]
        public IActionResult GetByEmail(string email)
        {
            return Ok(_userService.GetByEmail(email));
        }
        [HttpPost("verify")]
        [Authorize(Roles = "admin")]
        public IActionResult Verify([FromBody] VerifyUserDto decision)
        {
            _userService.Verify(decision.Email, decision.Decision);
            return Ok();
        }
        [HttpGet("getDelivery")]
        [Authorize(Roles = "admin")]
        public IActionResult GetDelivery()
        {
            return Ok(_userService.GetDelivery());
        }
    }
}
