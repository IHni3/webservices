using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Linq;
using System.Text.RegularExpressions;

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
			Regex emailRegex = new Regex("^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");


			//Verifying Input //////////////////////////

			// is the email an email?			
			if (!emailRegex.IsMatch(user.email)){
				this.HttpContext.Response.StatusCode = 400;
				return "email not email";
			} 

			//Email taken?
			var results = _context.Users.
								   Where(u => u.email == user.email);

			//Generating Random UserID ////////////////

			if (results.Count() > 0) {
				this.HttpContext.Response.StatusCode = 400;
				return "Email Taken!";
			} 
			
			do {
				id = random.Next(1000000, 9999999);
				var res = _context.Users.
									   Where(u => u.id == id);

				taken = res.Count() > 0;

			} while (taken);

			//Creating User DB Entry /////////////////			

			var entry = new UserEntry();

			entry.name = user.name;
			entry.surename = user.surename;
			entry.birthday = user.birthday;
			entry.passwordHash = user.passwordHash;
			entry.email = user.email;
			entry.id = id;

			// Returning DB Answer ///////////////////

			var rtn = _context.Users.Add(entry).ToString();
			_context.SaveChanges();

			this.HttpContext.Response.StatusCode = 200;
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
				this.HttpContext.Response.StatusCode = 400;
				return "User not Found";
			}

			var entry = results.First();

			if (entry.passwordHash == passwordHash){
				return entry.id.ToString();
			}

			this.HttpContext.Response.StatusCode = 400;
			return "Invalid Password";
		}
	}
}