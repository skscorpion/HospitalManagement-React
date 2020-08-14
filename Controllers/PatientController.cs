using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HospitalManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly ILogger<PatientController> _logger;
        public PatientController(ILogger<PatientController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult Get()
        {
            // return BadRequest();
            return Ok(new PatientRepository().FetchAll());
        }

        [HttpPut]
        public ActionResult Put([FromBody] Patient patient)
        {
            return Created("", new PatientRepository().Update(patient));
        }

        [HttpPost]
        public ActionResult Post([FromBody] Patient patient)
        {
            return BadRequest();
            return Created("", new PatientRepository().Insert(patient));
        }
    }
}
