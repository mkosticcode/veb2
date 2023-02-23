using Server.Dto;
using Server.Models;
using System.Collections.Generic;

namespace Server.Interfaces
{
    public interface IProductService
    {
        List<Product> GetAllProducts();
        void CreateProduct(CreateProductDto newProduct);
    }
}
