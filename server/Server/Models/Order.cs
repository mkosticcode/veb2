using System;
using System.Collections.Generic;

namespace Server.Models
{
    public enum OrderStatus
    {
        MADE = 1,
        ACCEPTED,
        DELIVERED
    }
    public class Order
    {
        public List<ProductAmount> ProductAmount { get; set; }
        public List<User> Users { get; set; }

        public string Adress { get; set; }
        public string Comment { get; set; }
        public double Price { get; set; }
        public OrderStatus Status { get; set; }
        public int Id { get; set; }
        public static Dictionary<int, int> activeOrders=new Dictionary<int, int>();

    }
    public class ProductAmount
    {
        public int Id { get; set; }
        public int ProductsId { get; set; }
        public int ProductsAmount { get; set; }
    }
}
