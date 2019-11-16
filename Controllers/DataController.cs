using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Junction2019.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private readonly IDataHttpService _dataHttpService;
        private readonly List<SensorDataCsvEntry> _sensorDataCsvEntries;
        public DataController(
            IDataHttpService dataHttpService,
            List<SensorDataCsvEntry> sensorDataCsvEntries
        ) {
            _dataHttpService = dataHttpService;
            _sensorDataCsvEntries = sensorDataCsvEntries;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Content(await _dataHttpService.getData(), "application/json");
        }

        [HttpGet("sensorcoords")]
        public IActionResult getSensorData() {
            var results =(
                    from x in _sensorDataCsvEntries
                    group x by x.CounterID_ASTA into g
                    select g.OrderBy(y => y.CounterID_ASTA)
                    .First()
                ).ToArray();
            
            var resultCoords = results.Select(s => new {
                s.PAVE_Counters.CoordinateEast,
                s.PAVE_Counters.CoordinateNorth,
                s.CounterID_ASTA
            });

            return Content(JsonConvert.SerializeObject(resultCoords), "application/json");
        }
    }
}
