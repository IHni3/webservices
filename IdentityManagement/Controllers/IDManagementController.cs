using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Linq;
using System.Text.RegularExpressions;

using IdentityManagement.Models;
using IdentityManagement.Services;

namespace IdentityManagement.Controllers
{
	[ApiController]
	[Route("user")]
	public class IdentityManagementController : ControllerBase
	{
		private readonly ILogger<IdentityManagementController> _logger;

		private readonly UserContext _context;

		private readonly IUserService _userService;

		public IdentityManagementController(ILogger<IdentityManagementController> logger, UserContext context, IUserService userService)
		{
			_logger = logger ?? throw new ArgumentNullException(nameof(logger));
			_context = context;
			_userService = userService;
		}

		[HttpPost("register")]
		public IActionResult Register(RegisterRequest request){
			var answer = _userService.Register(request);
			if(answer == null){
				return Ok();
			}
			return BadRequest(answer);
		}

		[Authorize]
		[HttpPatch("update")]
		public IActionResult UpdateUser(UpdateRequest request){
			var answer = _userService.Update(request);
			if(answer == null){
				return Ok();
			}
			return BadRequest(answer);
		}

		[Authorize]
		[HttpDelete("delete")]
		public IActionResult DeleteUser(DeleteRequest request){
			var answer = _userService.Delete(request);
			if(answer == null){
				return Ok();
			}
			return BadRequest(answer);
		}

		[HttpPost("login")]
		public IActionResult CheckCredentials(LoginRequest request){
			var answer = _userService.Login(request);
			if(answer != null){
				return Ok(answer);
			}
			return BadRequest();
			
		}
	}
}