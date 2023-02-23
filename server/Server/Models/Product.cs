
namespace Server.Models
{
    public class Product
    {      
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Id { get; set; }

        public bool Validate()
        {
            if (this.Description == "") { return false; }
            if (this.Name == "") { return false; }
            if (this.Price == 0) { return false; }

            return true;
        }



    }
}
