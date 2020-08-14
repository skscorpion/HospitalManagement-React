using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HospitalManagement
{
    public class AuthRepository
    {
        private readonly string _secret;
        private readonly string _expDate;
        public AuthRepository(IConfiguration config)
        {
            _secret = config.GetSection("JwtConfig").GetSection("secret").Value;
            _expDate = config.GetSection("JwtConfig").GetSection("expirationInMinutes").Value;
        }
        public string GenerateSecurityToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("username", username)
                }),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_expDate)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jsonToken = tokenHandler.WriteToken(token);
            System.IO.File.WriteAllText("JwtToken.txt", jsonToken);
            return jsonToken;
        }

        public bool ValidateSecurityToken(string username)
        {
            try
            {
                var token = File.ReadAllText("JwtToken.txt");
                // var token = Newtonsoft.Json.JsonConvert.DeserializeObject<string>(myJsonString);
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token);
                var tokenS = handler.ReadToken(token) as JwtSecurityToken;
                var jti = tokenS.Claims.First(claim => claim.Type == "username").Value;
                return jti == username;
            }
            catch (Exception ex)
            {

            }
            return false;
        }

        public void RemoveSecurityToken(string username)
        {
            System.IO.File.WriteAllText("JwtToken.txt", "");
        }

    }
}
