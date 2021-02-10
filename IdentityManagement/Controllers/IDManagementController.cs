using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Linq;

using IdentityManagement.Models;

namespace IdentityManagement.Controllers
{
	[ApiController]
	[Route("idmgm")]
	public class IdentityManagementController : ControllerBase
	{
		private readonly ILogger<IdentityManagementController> _logger;

		private readonly UserContext _context;

		public IdentityManagementController(ILogger<IdentityManagementController> logger, UserContext context)
		{
			_logger = logger ?? throw new ArgumentNullException(nameof(logger));
			_context = context;
		}

		[HttpPost]
		public string PostUser(User user)
		{
			Random random = new Random();
			int id;
			bool taken = true;
			do {
				id = random.Next(1000000, 9999999);
				var res = _context.Users.
									   Where(u => u.id == id);

				taken = res.Count() > 0;

			} while (taken);

			var results = _context.Users.
								   Where(u => u.email == user.email);

			if (results.Count() > 0) return "Email Taken!";

			var entry = new UserEntry();

			entry.name = user.name;
			entry.surename = user.surename;
			entry.birthday = user.birthday;
			entry.passwordHash = user.passwordHash;
			entry.email = user.email;
			entry.id = id;

			var rtn = _context.Users.Add(entry).ToString();
			_context.SaveChanges();

			return rtn;		
		}

		[HttpPatch]
		public string UpdateUser(int id, User user)
		{
			var entry = _context.Users.
								   Where(u => u.id == id).
								   First();

			entry.name = user.name;
			entry.surename = user.surename;
			entry.birthday = user.birthday;
			entry.passwordHash = user.passwordHash;
			entry.email = user.email;

			var rtn = _context.Users.Update(entry).ToString();
			_context.SaveChanges();

			return rtn;		
		}

		[HttpDelete]
		public string DeleteUser(int id, string authorization){
			var entry = _context.Users.
								   Where(u => u.id == id).
								   First();
			
			if (authorization == entry.passwordHash){
				var rtn = _context.Users.Remove(entry).ToString();
				_context.SaveChanges();

				return rtn;
			}

			return "Invalid Password!";

				
		}

		[HttpGet]
		public string CheckCredentials(string email, string passwordHash){
			
			var results = _context.Users.
								   Where(u => u.email == email);

			if (results.Count() < 1 ){
				return "User not Found";
			}

			var entry = results.First();

			if (entry.passwordHash == passwordHash){
				return entry.id.ToString();
			}

			return "Invalid Password";
		}
	}
}