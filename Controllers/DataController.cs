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
    [Produces("application/json")]
    [Route("api")]
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

        [HttpGet("sensor/{sensorId}/date/{date}")]
        public IActionResult getDayDataReading(int sensorId, DateTime date) {
            var results = _sensorDataCsvEntries
                .Where(s => s.CounterID_ASTA == sensorId)
                .Where(s => s.StartTime.Year == date.Year)
                .Where(s => s.StartTime.Month == date.Month)
                .Where(s => s.StartTime.Day == date.Day)
                .Select(s => new {
                    StartTime = s.StartTime,
                    s.Visits
                })
                .ToArray();
    
            return new JsonResult(results);
        }

        [HttpGet("sensor/{sensorId}/date/{date}/weather")]
        public async Task<IActionResult> getDataWithWeather(
            int sensorId,
            DateTime date,
            [FromQuery] WeatherDataModel weatherModel
        ) {
            var result = await _dataHttpService.getRemoteData(
                sensorId,
                date,
                weatherModel
            );
    
            return Ok();
        }

        public enum Cloudiness {
            clear,
            partly_cloudy,
            cloudy
        }

        [HttpGet("sensor")]
        public IActionResult getSensorIds() {
            var results = (from x in _sensorDataCsvEntries
                    group x by x.CounterID_ASTA into g
                    select g.OrderBy(y => y.CounterID_ASTA)
                    .First())
                    .Select(s => new {
                        s.CounterID_ASTA,
                        s.ASTA_Counters.Name_ASTA,
                        s.PAVE_Counters.CoordinateNorth,
                        s.PAVE_Counters.CoordinateEast
                    })
                    .ToList();

            return Content(JsonConvert.SerializeObject(results), "application/json");
        }
    }
}
