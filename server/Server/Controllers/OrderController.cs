using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Interfaces;
using System.Collections.Generic;

namespace Server.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet("available")]
        public IActionResult GetAvailable()
        {
            return Ok(_orderService.GetavailableOrders());
        }
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetAllOrders());
        }
        [HttpGet("{email}")]
        public IActionResult Get(string email)
        {
            return Ok(_orderService.GetUserOrders(email));
        }
        [HttpPost("{email}")]
        public IActionResult Create(string email, [FromBody]List<CreateOrderDto> dto)
        {
            return Ok(_orderService.CreateOrder(email, dto));
        }
        [HttpPost("deliver")]
        //[Authorize(Roles = "delivery")]
        public IActionResult Deliver(VerifyUserDto dto)
        {
            _orderService.DeliverOrder(dto.Email, dto.Decision);
            return Ok();
        }
        [HttpPost("RemainingTime")]
        public IActionResult RemainingTime([FromBody] int id)
        {
            return Ok(_orderService.GetRemainingTime(id));
        }
    }
}
