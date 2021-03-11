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
	[Route("stocks")]
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

		[HttpPost("add")]
		public IActionResult Add(ManipulationRequest request){
			try{
				_userService.Add(request);
				return Accepted();
			} catch(UnauthorizedException e) {
				return Unauthorized();
			} catch(BadRequestException e){
				return BadRequest();
			}
			
			
		}

		[HttpDelete("remove")]
		public IActionResult Remove(ManipulationRequest request){
			try{
				_userService.Remove(request);
				return Accepted();
			} catch(UnauthorizedException e) {
				return Unauthorized();
			} catch(BadRequestException e){
				return BadRequest();
			} catch(UserNotFoundException e) {
				return BadRequest("User not found");
			}
			
			
		}

		[HttpGet("getList")]
		public IActionResult GetList(ListRequest request){
			try{
				_userService.GetList(request);
				return Accepted();
			} catch(UnauthorizedException e) {
				return Unauthorized();
			} catch(BadRequestException e){
				return BadRequest();
			} catch(UserNotFoundException e) {
				return BadRequest("User not found");
			}
			
			
		}
	}
}