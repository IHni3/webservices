using System;
using IdentityManagement.Models;
using System.Text.RegularExpressions;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;


using IdentityManagement.JwtMiddleware;

namespace IdentityManagement.Services
{
    public interface IUserService
    {
        LoginResponse Login(LoginRequest request);        
		String Update(UpdateRequest request);
		String Delete(DeleteRequest request);
		String Register(RegisterRequest request);
        User GetById(int id);
    }
	
	
	public class UserService : IUserService {

        private readonly UserContext _context;
		private readonly AppSettings _appSettings;
		public UserService(UserContext context, IOptions<AppSettings> appSettings)
		{
			_context = context;
			_appSettings = appSettings.Value;
		}

        public string Register(RegisterRequest request){
            Random random = new Random();
			int id;
			bool taken = true;
			Regex emailRegex = new Regex("^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");


			//Verifying Input //////////////////////////

			// is the email an email?			
			if (!emailRegex.IsMatch(request.Email)){
				return "Email Address not valid";
			} 

			//Email taken?
			var results = _context.Users.
								   Where(u => u.Email == request.Email);

			//Generating Random UserID ////////////////

			if (results.Count() > 0) {
				return "Email already in use";
			} 
			
			do {
				id = random.Next(1000000, 9999999);
				var res = _context.Users.
									   Where(u => u.Id == id);

				taken = res.Count() > 0;

			} while (taken);

			//Creating User DB Entry /////////////////			

			var entry = new User();

			entry.Firstname = request.Firstname;
			entry.Lastname = request.Lastname;
			entry.PasswordHash = request.PasswordHash;
			entry.Email = request.Email;
			entry.Id = id;

			// Returning DB Answer ///////////////////

			_context.Users.Add(entry).ToString();
			_context.SaveChanges();

			return null;
        }

        public string Update(UpdateRequest request){
            var results = _context.Users.
								   Where(u => u.Id == request.Id);

            if (results.Count() < 1){
                return "User not Found";
            }

            var entry = results.First();

			entry.Firstname = request.Firstname;
			entry.Lastname = request.Lastname;
			entry.PasswordHash = request.PasswordHash;
			entry.Email = request.Email;

			_context.Users.Update(entry).ToString();
			_context.SaveChanges();

			return null;
        }

        public string Delete(DeleteRequest request){
            var results = _context.Users.
								   Where(u => u.Id == request.Id);
			
			if (results.Count() < 1){
                return "User not Found";
            }

			var entry = results.First();

            _context.Users.Remove(entry);
            _context.SaveChanges();

            return null;
        }

        public LoginResponse Login(LoginRequest request){
            
            var results = _context.Users.
								   Where(u => u.Email == request.email);

			if (results.Count() < 1 ){
                return null;
			}

			var entry = results.First();			

			if (entry.PasswordHash == request.passwordHash){
				var token = generateToken(entry);
				return new LoginResponse(entry, token);
			}

			return null;
        }

        public User GetById(int id){
            var results = _context.Users.
								   Where(u => u.Id == id);

			if (results.Count() < 1 ){
                return null;
            }

			return results.First();
        }

		public string generateToken(User user){
			// generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
		}


    }
}