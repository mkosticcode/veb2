using AutoMapper;
using Microsoft.Extensions.Configuration;
using Server.Dto;
using Server.Infrastructure;
using Server.Interfaces;
using Server.Models;
using System.Collections.Generic;

namespace Server.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly DeliveryDbContext _dbContext;

        public ProductService(IMapper mapper, DeliveryDbContext dbContext, IConfiguration config)
        {
            _secretKey = config.GetSection("SecretKey");

            _mapper = mapper;
            _dbContext = dbContext;
        }
        private List<Product> products = new List<Product>()
        {
            new Product
            {
                Description = "Domestic soup",
                Name = "Soup",
                Price = 100,
                Id=1
            },
              new Product
            {
                Description = "Cooked lamb",
                Name = "Lamb",
                Price = 150,
                Id=2
            },
                new Product
            {
                Description = "Cooked pig",
                Name = "Pig",
                Price = 200,
                Id=3
            },
        };
        public List<Product> GetAllProducts()
        {
           // products=_dbContext.Products;
            return _mapper.Map<List<Product>>(_dbContext.Products);
           // return products;
        }

        public void CreateProduct(CreateProductDto newProduct)
        {
            _dbContext.Products.Add(_mapper.Map<Product>(newProduct));
            _dbContext.SaveChanges();
            //products.Add(_mapper.Map<Product>(newProduct));
        }
    }
}
