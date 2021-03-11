using System;
using IdentityManagement.Models;
using System.Text.RegularExpressions;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;

using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

using IdentityManagement.Models.Requests;
using IdentityManagement.Models.Responses;
using IdentityManagement.Models.Exceptions;

using System.Collections.Generic;

namespace IdentityManagement.Services
{
    public interface IUserService
    {       
		void Add(ManipulationRequest request);
		void Remove(ManipulationRequest request);
        ListResponse GetList(ListRequest request);
    }

	public class UserService : IUserService {

        private readonly UserContext _context;

        static string idmgmtURL;
		public UserService(UserContext context, IConfiguration configuration)
		{
			_context = context;
            idmgmtURL = configuration["Data:Services:idmgmt"];
		}

        public void Add(ManipulationRequest request){ 
            int id;
            
            id = GetIdFromToken(request.token);


            var results = _context.Users
                                 .Where(u => u.id == id);

            if (results.Count() == 0){
                User user = new User();
                user.id = id;
                user.isins = new List<string>();
                user.isins.Add(request.isin);

                _context.Add(user);
                _context.SaveChanges();
            } else {
                User user = results.First();
                user.isins.Add(request.isin);
                _context.Update(user);
                _context.SaveChanges();
            }            
        }

        public void Remove(ManipulationRequest request){
            int id = GetIdFromToken(request.token);


            var results = _context.Users
                                 .Where(u => u.id == id);

            if (results.Count() == 0){
                throw new UserNotFoundException();
            } else {
                User user = results.First();
                if (user.isins.Contains(request.isin)){
                    user.isins.Remove(request.isin);
                    _context.Update(user);
                    _context.SaveChanges();
                }               
            }
        }

        public ListResponse GetList(ListRequest request){
            int id = GetIdFromToken(request.token);
            
            var results = _context.Users
                                 .Where(u => u.id == id);

            if (results.Count() == 0){
                throw new UserNotFoundException();
            } else {
                var response = new ListResponse();
                response.isins = results.First().isins;
                return response;
            }
        }

        private int GetIdFromToken(string token){
            using (HttpClient client = new HttpClient()){
                client.DefaultRequestHeaders.Authorization 
                         = new AuthenticationHeaderValue("Authenticate", token);           

                var response = client.GetAsync(idmgmtURL).Result;            

                if (!response.IsSuccessStatusCode){
                    if (response.StatusCode.Equals(HttpStatusCode.Unauthorized)){
                        throw new UnauthorizedException();
                    }
                    else {
                        throw new BadRequestException();
                    }
                } else {
                    var contents = response.Content.ReadAsStringAsync().Result;
                    var loginResponse = JsonConvert.DeserializeObject<LoginResponse>(contents);
                    return loginResponse.Id;
                }
            }
        }
        
    }
}