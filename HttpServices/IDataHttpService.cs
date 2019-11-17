using System;
using System.Threading.Tasks;

public interface IDataHttpService
{
    Task<string> getRemoteData(int sensorId, string date, WeatherDataModel model);
}