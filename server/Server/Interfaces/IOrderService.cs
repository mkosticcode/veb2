using Server.Dto;
using Server.Models;
using System.Collections.Generic;

namespace Server.Interfaces
{
    public interface IOrderService
    {
        int CreateOrder(string email,List<CreateOrderDto> newProduct);
        List<Order> GetAllOrders();
        List<Order> GetUserOrders(string email);
        List<Order> GetavailableOrders();
        int DeliverOrder(string email, int idOrder);
        int GetRemainingTime(int idOrder);
    }
}
