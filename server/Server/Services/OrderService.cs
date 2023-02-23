using AutoMapper;
using Microsoft.Extensions.Configuration;
using Server.Dto;
using Server.Infrastructure;
using Server.Interfaces;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly DeliveryDbContext _dbContext;
        private readonly IConfigurationSection _secretKey;

        public OrderService(IMapper mapper, DeliveryDbContext dbContext, IConfiguration config)
        {
            _secretKey = config.GetSection("SecretKey");
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public List<Order> allOrders = new List<Order>()
        {
             new Order
            {
                //Products = new List<Tuple<int, int>>(){Tuple.Create(1,2),Tuple.Create(2,3)},
                Adress = "u",
                Comment = "User",
                Price = 100,
                Status =OrderStatus.MADE,
                Id = 0
            }, new Order
            {
                //Products = new List<Tuple<int, int>>(){Tuple.Create(2,2),Tuple.Create(0,3)},
                Adress = "i",
                Comment = "fdsadsd",
                Price = 200,
                Status =OrderStatus.MADE,
                Id = 1
            }
        };
        public int CreateOrder(string email,List<CreateOrderDto> newProduct)
        {
            
            Order o = new Order();
            o.Price = 0;
            o.ProductAmount = new List<ProductAmount>();
            foreach (var item in newProduct)
            {
                o.Price += item.Price * item.Amount;
                ProductAmount pa = new ProductAmount();
                pa.ProductsId = item.Id;
                pa.ProductsAmount = item.Amount;
                o.ProductAmount.Add(pa);
            }
            o.Adress = newProduct[0].Adress;
            //o.Products = newProduct.Products;
            o.Comment = newProduct[0].Comment;
            o.Status = OrderStatus.MADE;
            /* o.Id = allOrders.Count;
             allOrders.Add(o);
             //UserService.users.Find(x => x.Email == email).Orders.Add(o);
            */
            if (_dbContext.Users.Find(email).Orders == null) { _dbContext.Users.Find(email).Orders = new List<Order>(); }
            _dbContext.Users.Find(email).Orders.Add(o);
            _dbContext.SaveChanges();
            return _dbContext.Orders.Count();

        }

        public List<Order> GetAllOrders()
        {
            return _mapper.Map<List<Order>>(_dbContext.Orders);
        }

        public List<Order> GetUserOrders(string email)
        {
            List<Order> old = _mapper.Map<List<Order>>(_dbContext.Users.Find(email).Orders);
            return _mapper.Map<List<Order>>(_dbContext.Users.Find(email).Orders);
            // return UserService.users.Find(x => x.Email == email).Orders;
        }

        public List<Order> GetavailableOrders()
        {
            List<Order> gd = _mapper.Map<List<Order>>(_dbContext.Orders);
            List<Order> r = new List<Order>(gd.Where(x => x.Status ==OrderStatus.MADE));
            return r;
            //return allOrders;
        }

        public int DeliverOrder(string email, int idOrder)
        {
            Order o = _dbContext.Orders.Find(idOrder);
            o.Status = OrderStatus.ACCEPTED;
            User u = _dbContext.Users.Find(email);
            if (u.Orders == null) { u.Orders = new List<Order>(); }
            u.Orders.Add(o) ;
            Random r = new Random();
            int min=r.Next(1, 30);
            int sec=r.Next(0, 60);
            int time = DateTime.Now.Second + DateTime.Now.Minute * 60 + DateTime.Now.Hour * 60 * 60 + min*60+sec;
            Order.activeOrders.Add(idOrder, time);
            _dbContext.SaveChanges();
            return min * 60 + sec;
            //UserService.users.Find(x=>x.Email==email).Orders.Find(x=>x.Id==idOrder).Status=OrderStatus.ACCEPTED;
        }

        public int GetRemainingTime(int idOrder)
        {
            if (!Order.activeOrders.ContainsKey(idOrder)) { return 10000000; }
            int time = DateTime.Now.Second + DateTime.Now.Minute * 60 + DateTime.Now.Hour * 60 * 60;
            int deliverTime = Order.activeOrders[idOrder];
            int remainingTime = deliverTime - time;
            if (remainingTime < 0) {
                _dbContext.Orders.Find(idOrder).Status = OrderStatus.DELIVERED;
                _dbContext.SaveChanges();
            }
            return deliverTime-time;
        }
    }
}
