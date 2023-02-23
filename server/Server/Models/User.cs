using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public enum UserType
    {
        USER = 1,
        DELIVERY,
        ADMIN
    }
    public enum ProcessStatus
    {
        PROCESSING = 1,
        REJECTED,
        ACCEPTED
    }
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string BirthDay { get; set; }
        public string Adress { get; set; }
        public string Url { get; set; }

        public UserType Type { get; set; }
        public List<Order> Orders { get; set; }
        public ProcessStatus Verification { get; set; }
        public void Update(User updatedUser)
        {
            this.Username = updatedUser.Username;   
            this.Email=updatedUser.Email;
            this.Name = updatedUser.Name;
            this.BirthDay = updatedUser.BirthDay;
            this.Password = updatedUser.Password;
            this.Adress = updatedUser.Adress;
            this.Id = updatedUser.Email;
            this.Type=updatedUser.Type;

        }
        public bool Validate()
        {
            if (this.Username == "") { return false; }
            if (this.Name == "") { return false; }
            if (this.BirthDay == "") { return false; }
            if (this.Password == "") { return false; }
            if (this.Adress == "") { return false; }
            if (this.Type != UserType.USER && this.Type != UserType.DELIVERY && this.Type != UserType.ADMIN) { return false; }
           
            return true;
        }
    }
    
}
