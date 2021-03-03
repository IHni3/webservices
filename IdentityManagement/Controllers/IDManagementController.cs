using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Linq;
using System.Text.RegularExpressions;

using IdentityManagement.Models;
using IdentityManagement.Services;
using IdentityManagement.Models.Requests;
using IdentityManagement.Models.Responses;
using IdentityManagement.Models.Exceptions;

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
			LoginResponse answer = null;
			try {
				answer = _userService.Register(request);
			} catch (BadRequestException e){
				return BadRequest(new BadRequestResponse(e));
			}
			return Ok(answer);
		}

		[Authorize]
		[HttpPatch("update")]
		public IActionResult UpdateUser(UpdateRequest request){
			var attatchedUser = (User)HttpContext.Items["User"];
			if (attatchedUser == null || attatchedUser.Id != request.Id) return Unauthorized();
			try {
				_userService.Update(request);
			} catch (BadRequestException e){
				return BadRequest(new BadRequestResponse(e));
			}
			return Ok();
			

		}

		[Authorize]
		[HttpDelete("delete")]
		public IActionResult DeleteUser(DeleteRequest request){
			var attatchedUser = (User)HttpContext.Items["User"];
			if (attatchedUser == null || attatchedUser.Id != request.Id) return Unauthorized();
			try {
				_userService.Delete(request);
			} catch (BadRequestException e){
				return BadRequest(new BadRequestResponse(e));
			}
			return Ok();

		}

		[HttpPost("login")]
		public IActionResult CheckCredentials(LoginRequest request){
			LoginResponse answer = null;
			try {
				answer = _userService.Login(request);
			} catch (BadRequestException e){
				return BadRequest(new BadRequestResponse(e));
			}
			return Ok(answer);			
		}

		[Authorize]
		[HttpGet("checkToken")]
		public IActionResult CheckToken(){
			var attachedUser = (User)HttpContext.Items["User"];
			CheckResponse response = new CheckResponse(attachedUser);
			return Ok(response);
		}
	}
}