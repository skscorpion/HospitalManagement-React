using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace HospitalManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IConfiguration _config;
        public AuthController(ILogger<AuthController> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }



        // POST api/GetToken/{email_id}
        [HttpGet]
        public async Task<IActionResult> Authenticate(string username)
        {
            if (string.IsNullOrEmpty(username))
                return BadRequest();

            if (AuthenticateUser(username))
            {
                IActionResult response = Unauthorized();

                var tokenString = new AuthRepository(_config).GenerateSecurityToken(username);

                return await Task.FromResult(Ok(new { token = tokenString }));
            }
            else
                return Unauthorized();
        }

        [HttpGet("ValidateToken")]
        public async Task<IActionResult> ValidateToken(string username)
        {
            if (string.IsNullOrEmpty(username))
                return BadRequest();

            if (AuthenticateUser(username))
            {
                IActionResult response = Unauthorized();

                var isValidToken = new AuthRepository(_config).ValidateSecurityToken(username);

                return await Task.FromResult(Ok(new { isValidToken = isValidToken }));
            }
            else
                return Unauthorized();
        }

        [HttpDelete("DeleteAuthToken")]
        public IActionResult DeleteAuthToken(string username)
        {
            if (string.IsNullOrEmpty(username))
                return BadRequest();

            new AuthRepository(_config).RemoveSecurityToken(username);
            return Ok();
        }

        public bool AuthenticateUser(string username)
        {
            return !string.IsNullOrEmpty(username);
        }


    }
}
