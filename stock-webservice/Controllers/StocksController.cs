using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Linq;
using System.Text.RegularExpressions;

using Stocks.Models;
using Stocks.Services;
using Stocks.Models.Requests;
using Stocks.Models.Responses;
using Stocks.Models.Exceptions;

namespace Stocks.Controllers
{
	[ApiController]
	[Route("stocks")]
	public class StocksController : ControllerBase
	{
		private readonly ILogger<StocksController> _logger;

		private readonly UserContext _context;

		private readonly IUserService _userService;

		public StocksController(ILogger<StocksController> logger, UserContext context, IUserService userService)
		{
			_logger = logger ?? throw new ArgumentNullException(nameof(logger));
			_context = context;
			_userService = userService;
		}

		[HttpPost("add")]
		public IActionResult Add(ManipulationRequest request){
			try{
				_userService.Add(request);
				return Ok();
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
				return Ok();
			} catch(UnauthorizedException e) {
				return Unauthorized();
			} catch(BadRequestException e){
				return BadRequest();
			} catch(UserNotFoundException e) {
				return BadRequest("User not found");
			}
			
			
		}

		[HttpPost("getList")]
		public IActionResult GetList(ListRequest request){
			try{
			 	var response = _userService.GetList(request);
				return Ok(response);
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