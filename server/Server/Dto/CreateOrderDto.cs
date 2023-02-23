using Server.Models;
using System;
using System.Collections.Generic;

namespace Server.Dto
{
    public class CreateOrderDto
    {
        public int  Id { get; set; }
        public int Amount { get; set; }
        public string Adress { get; set; }
        public string Comment { get; set; }
        public double Price { get; set; }
    }
}
