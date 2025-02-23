using Inventory.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Reponsitories.Implements
{
    public interface IEmailRepository
    {
        Task SendEmailAsync(string toEmail, string subject, string body);
       
    }
}
