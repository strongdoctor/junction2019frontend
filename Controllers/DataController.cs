using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Junction2019.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private readonly IDataHttpService _dataHttpService;
        public DataController(IDataHttpService dataHttpService) {
            _dataHttpService = dataHttpService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Content(await _dataHttpService.getData(), "application/json");
        }
    }
}
